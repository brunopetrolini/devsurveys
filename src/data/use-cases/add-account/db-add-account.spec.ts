import { AddAccount, AddAccountModel } from '../../../domain/use-cases/add-account';
import { Encrypter } from '../../protocols/encrypter';
import { DbAddAccount } from './db-add-account';

const makeFakeAccount = (): AddAccountModel => ({
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password',
});

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    // eslint-disable-next-line no-unused-vars
    async encrypt(value: string): Promise<string> {
      return Promise.resolve('hashed_value');
    }
  }
  return new EncrypterStub();
};

type SutTypes = {
  sut: AddAccount;
  encrypterStub: Encrypter;
}
const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter();
  const sut = new DbAddAccount(encrypterStub);
  return { sut, encrypterStub };
};

describe('DbAddAccount Use Case', () => {
  it('Should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut();
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');
    await sut.add(makeFakeAccount());
    expect(encryptSpy).toHaveBeenCalledWith('valid_password');
  });

  it('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut();
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(Promise.reject(new Error()));
    const promise = sut.add(makeFakeAccount());
    await expect(promise).rejects.toThrow();
  });
});
