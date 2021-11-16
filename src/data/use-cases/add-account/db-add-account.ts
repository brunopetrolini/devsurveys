import { AddAccountRepository } from '../../protocols/database/account/add-account-repository';
import {
  AddAccount, Hasher, AddAccountModel, AccountModel,
} from './db-add-account-protocols';

export class DbAddAccount implements AddAccount {
  private readonly hasher: Hasher;
  private readonly addAccountRepository: AddAccountRepository;

  constructor(hasher: Hasher, addAccountRepository: AddAccountRepository) {
    this.hasher = hasher;
    this.addAccountRepository = addAccountRepository;
  }

  async add(account: AddAccountModel): Promise<AccountModel | null> {
    const hashedPassword = await this.hasher.hash(account.password);
    const createdAccount = await this.addAccountRepository.add({
      ...account,
      password: hashedPassword,
    });
    return createdAccount;
  }
}
