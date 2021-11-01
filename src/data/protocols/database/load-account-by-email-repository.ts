/* eslint-disable no-unused-vars */
import { AccountModel } from '../../use-cases/add-account/db-add-account-protocols';

export interface LoadAccountByEmailRepository {
  load(email: string): Promise<AccountModel | null>;
}
