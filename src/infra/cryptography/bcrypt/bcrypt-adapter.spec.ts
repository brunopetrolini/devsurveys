import bcrypt from 'bcrypt';
import { BcryptAdapter } from './bcrypt-adapter';

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return Promise.resolve('hashed_value');
  },

  async compare(): Promise<boolean> {
    return Promise.resolve(true);
  },
}));

type SutTypes = {
  salt: number;
  sut: BcryptAdapter;
}
const makeSut = (): SutTypes => {
  const salt = 12;
  const sut = new BcryptAdapter(salt);
  return { sut, salt };
};

describe('Bcrypt Adapter', () => {
  it('Should call hash with correct values', async () => {
    const { sut, salt } = makeSut();
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.hash('any_value');
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
  });

  it('Should return a hash when hash succeeds', async () => {
    const { sut } = makeSut();
    const hashedValue = await sut.hash('any_value');
    expect(hashedValue).toBe('hashed_value');
  });

  it('Should throw if hash throws', async () => {
    const { sut } = makeSut();
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => Promise.reject(new Error()));
    const promise = sut.hash('any_value');
    await expect(promise).rejects.toThrow();
  });

  it('Should call compare with correct values', async () => {
    const { sut } = makeSut();
    const compareSpy = jest.spyOn(bcrypt, 'compare');
    await sut.compare('any_value', 'any_hash');
    expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash');
  });

  it('Should return true when compare succeeds', async () => {
    const { sut } = makeSut();
    const isValid = await sut.compare('any_value', 'hashed_value');
    expect(isValid).toBe(true);
  });

  it('Should return false when compare fails', async () => {
    const { sut } = makeSut();
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => Promise.resolve(false));
    const isValid = await sut.compare('any_value', 'hashed_value');
    expect(isValid).toBe(false);
  });

  it('Should throw if compare throws', async () => {
    const { sut } = makeSut();
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => Promise.reject(new Error()));
    const promise = sut.compare('any_value', 'hashed_value');
    await expect(promise).rejects.toThrow();
  });
});
