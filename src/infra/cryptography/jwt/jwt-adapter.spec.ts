/* eslint-disable no-unused-vars */
import jwt from 'jsonwebtoken';
import { JwtAdapter } from './jwt-adapter';

jest.mock('jsonwebtoken', () => ({
  sign(): string {
    return 'hashed_value';
  },

  verify(token: string): string {
    return 'any_value';
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
  describe('sign()', () => {
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

    it('Should throw if sign throws', async () => {
      const { sut } = makeSut();
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error();
      });
      const promise = sut.encrypt('any_id');
      await expect(promise).rejects.toThrow();
    });
  });

  describe('verify()', () => {
    it('Should call verify with correct values', async () => {
      const { sut, secretKey } = makeSut();
      const verifySpy = jest.spyOn(jwt, 'verify');
      await sut.decrypt('any_token');
      expect(verifySpy).toHaveBeenCalledWith('any_token', secretKey);
    });

    it('Should return a value on verify success', async () => {
      const { sut } = makeSut();
      const value = await sut.decrypt('any_token');
      expect(value).toBe('any_value');
    });

    it('Should throw if verify throws', async () => {
      const { sut } = makeSut();
      jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
        throw new Error();
      });
      const promise = sut.decrypt('any_token');
      await expect(promise).rejects.toThrow();
    });
  });
});
