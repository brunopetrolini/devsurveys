import jwt from 'jsonwebtoken';
import { JwtAdapter } from './jwt-adapter';

jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return Promise.resolve('hashed_value');
  },
}));

type SutTypes = {
  secretKey: string;
  sut: JwtAdapter;
}
const makeSut = (): SutTypes => {
  const secretKey = 'secret';
  const sut = new JwtAdapter(secretKey);
  return { sut, secretKey };
};

describe('Jwt Adapter', () => {
  it('Should call sign with correct values', async () => {
    const { sut, secretKey } = makeSut();
    const signSpy = jest.spyOn(jwt, 'sign');
    await sut.encrypt('any_id');
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, secretKey);
  });

  it('Should return a token on sign success', async () => {
    const { sut } = makeSut();
    const accessToken = await sut.encrypt('any_id');
    expect(accessToken).toBe('hashed_value');
  });
});
