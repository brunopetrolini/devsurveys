import bcrypt from 'bcrypt';
import { Encrypter } from '../../data/protocols/encrypter';
import { BcryptAdapter } from './bcrypt-adapter';

type SutTypes = {
  salt: number;
  sut: Encrypter;
}
const makeSut = (): SutTypes => {
  const salt = 12;
  const sut = new BcryptAdapter(salt);
  return { sut, salt };
};

describe('Bcrypt Adapter', () => {
  it('Should call bcrypt with correct values', async () => {
    const { sut, salt } = makeSut();
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.encrypt('any_value');
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
  });
});
