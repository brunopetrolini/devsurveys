import { AddAccountRepository } from '../../../data/protocols/add-account-repository';
import { AccountModel } from '../../../domain/models/account';
import { AddAccountModel } from '../../../domain/use-cases/add-account';
import { MongoHelper } from '../helpers/mongo-helper';

export class MongoAccountRepository implements AddAccountRepository {
  async add(account: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts');
    const insertResult = await accountCollection.insertOne(account);
    return {
      id: String(insertResult?.insertedId),
      ...account,
    };
  }
}
