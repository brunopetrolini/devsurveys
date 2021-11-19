/* eslint-disable max-classes-per-file */
/* eslint-disable no-unused-vars */
import { Decrypter } from '../../protocols/cryptography/decrypter';
import { LoadAccountByTokenRepository } from '../../protocols/database/account/load-account-by-token-repository';
import { AccountModel } from '../add-account/db-add-account-protocols';
import { DbLoadAccountByToken } from './db-load-account-by-token';

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt(value: string): Promise<string | null> {
      return 'decrypted_value';
    }
  }
  return new DecrypterStub();
};

const makeLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
    async loadByToken(accessToken: string, role?: string): Promise<AccountModel | null> {
      return Promise.resolve({
        id: 'any_id',
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
      });
    }
  }
  return new LoadAccountByTokenRepositoryStub();
};

type SutTypes = {
  sut: DbLoadAccountByToken;
  decrypterStub: Decrypter;
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository;
}
const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypter();
  const loadAccountByTokenRepositoryStub = makeLoadAccountByTokenRepository();
  const sut = new DbLoadAccountByToken(decrypterStub, loadAccountByTokenRepositoryStub);
  return { sut, decrypterStub, loadAccountByTokenRepositoryStub };
};

describe('DbLoadAccountByToken Usecase', () => {
  it('Should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut();
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt');
    await sut.load('any_token', 'any_role');
    expect(decryptSpy).toHaveBeenCalledWith('any_token');
  });

  it('Should return null if Decrypter returns null', async () => {
    const { sut, decrypterStub } = makeSut();
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(Promise.resolve(null));
    const account = await sut.load('any_token', 'any_role');
    expect(account).toBeNull();
  });

  it('Should throw if Decrypter throws', async () => {
    const { sut, decrypterStub } = makeSut();
    jest.spyOn(decrypterStub, 'decrypt').mockImplementationOnce(() => Promise.reject(new Error()));
    const promise = sut.load('any_token', 'any_role');
    await expect(promise).rejects.toThrow();
  });

  it('Should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut();
    const loadByTokenSpy = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken');
    await sut.load('any_token', 'any_role');
    expect(loadByTokenSpy).toHaveBeenCalledWith('decrypted_value', 'any_role');
  });

  it('Should return null if LoadAccountByTokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut();
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(Promise.resolve(null));
    const account = await sut.load('any_token', 'any_role');
    expect(account).toBeNull();
  });

  it('Should throw if LoadAccountByTokenRepository throws', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut();
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockImplementationOnce(() => Promise.reject(new Error()));
    const promise = sut.load('any_token', 'any_role');
    await expect(promise).rejects.toThrow();
  });

  it('Should return an account on success', async () => {
    const { sut } = makeSut();
    const account = await sut.load('any_token', 'any_role');
    expect(account).toEqual({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });
  });
});
