/* eslint-disable no-unused-vars */
import { AccountModel } from '../../../../domain/models/account';
import { AddAccountModel } from '../../../../domain/usecases/add-account';

export interface AddAccountRepository {
  add (account: AddAccountModel): Promise<AccountModel>;
}
