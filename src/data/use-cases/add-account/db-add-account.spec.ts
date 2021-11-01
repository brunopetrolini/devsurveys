/* eslint-disable no-unused-vars */
/* eslint-disable max-classes-per-file */
import {
  AccountModel, AddAccount, AddAccountModel, Hasher,
} from './db-add-account-protocols';
import { DbAddAccount } from './db-add-account';
import { AddAccountRepository } from '../../protocols/database/add-account-repository';

const makeFakeAccount = (): AddAccountModel => ({
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password',
});

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash(value: string): Promise<string> {
      return Promise.resolve('hashed_value');
    }
  }
  return new HasherStub();
};

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(account: AddAccountModel): Promise<AccountModel> {
      return Promise.resolve({
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'hashed_value',
      });
    }
  }
  return new AddAccountRepositoryStub();
};

type SutTypes = {
  sut: AddAccount;
  hasherStub: Hasher;
  addAccountRepositoryStub: AddAccountRepository;
}
const makeSut = (): SutTypes => {
  const hasherStub = makeHasher();
  const addAccountRepositoryStub = makeAddAccountRepository();
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub);
  return { sut, hasherStub, addAccountRepositoryStub };
};

describe('DbAddAccount Use Case', () => {
  it('Should call Encrypter with correct password', async () => {
    const { sut, hasherStub } = makeSut();
    const encryptSpy = jest.spyOn(hasherStub, 'hash');
    await sut.add(makeFakeAccount());
    expect(encryptSpy).toHaveBeenCalledWith('valid_password');
  });

  it('Should throw if Encrypter throws', async () => {
    const { sut, hasherStub } = makeSut();
    jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(Promise.reject(new Error()));
    const promise = sut.add(makeFakeAccount());
    await expect(promise).rejects.toThrow();
  });

  it('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add');
    await sut.add(makeFakeAccount());
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'hashed_value',
    });
  });

  it('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(Promise.reject(new Error()));
    const promise = sut.add(makeFakeAccount());
    await expect(promise).rejects.toThrow();
  });

  it('Should return an account on success', async () => {
    const { sut } = makeSut();
    const account = await sut.add(makeFakeAccount());
    expect(account).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'hashed_value',
    });
  });
});
