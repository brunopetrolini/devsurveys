import { AddAccountRepository } from '../../protocols/database/account/add-account-repository';
import {
  AddAccount, Hasher, AddAccountModel, AccountModel, LoadAccountByEmailRepository,
} from './db-add-account-protocols';

export class DbAddAccount implements AddAccount {
  private readonly hasher: Hasher;
  private readonly addAccountRepository: AddAccountRepository;
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository;

  constructor(hasher: Hasher, addAccountRepository: AddAccountRepository,
    loadAccountByEmailRepository: LoadAccountByEmailRepository) {
    this.hasher = hasher;
    this.addAccountRepository = addAccountRepository;
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
  }

  async add(account: AddAccountModel): Promise<AccountModel | null> {
    await this.loadAccountByEmailRepository.loadByEmail(account.email);
    const hashedPassword = await this.hasher.hash(account.password);
    const createdAccount = await this.addAccountRepository.add({
      ...account,
      password: hashedPassword,
    });
    return createdAccount;
  }
}
