/* eslint-disable no-unused-vars */
import { AccountModel } from '../models/account';

export interface LoadAccountByToken {
  load (accessToken: string, role?: string): Promise<AccountModel>;
}
