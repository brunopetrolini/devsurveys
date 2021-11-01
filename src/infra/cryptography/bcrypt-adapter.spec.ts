import bcrypt from 'bcrypt';
import { Encrypter } from '../../data/protocols/cryptography/encrypter';
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

  it('Should return a hash on success', async () => {
    const { sut } = makeSut();
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => Promise.resolve('hashed_value'));
    const hashedValue = await sut.encrypt('any_value');
    expect(hashedValue).toBe('hashed_value');
  });

  it('Should throw if bcrypt throws', async () => {
    const { sut } = makeSut();
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => Promise.reject(new Error()));
    const promise = sut.encrypt('any_value');
    await expect(promise).rejects.toThrow();
  });
});
