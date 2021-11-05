import { ObjectId } from 'mongodb';
import { AddAccountRepository } from '../../../../data/protocols/database/account/add-account-repository';
import { LoadAccountByEmailRepository } from '../../../../data/protocols/database/account/load-account-by-email-repository';
import { UpdateAccessTokenRepository } from '../../../../data/protocols/database/account/update-access-token-repository';
import { AccountModel } from '../../../../domain/models/account';
import { AddAccountModel } from '../../../../domain/use-cases/add-account';
import { MongoHelper } from '../../helpers/mongo-helper';

export class MongoAccountRepository implements AddAccountRepository,
LoadAccountByEmailRepository, UpdateAccessTokenRepository {
  async add(account: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const insertResult = await accountCollection.insertOne(account);
    return {
      id: String(insertResult?.insertedId),
      ...account,
    };
  }

  async loadByEmail(email: string): Promise<AccountModel | null> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const account = await accountCollection.findOne({ email });
    return account && MongoHelper.map(account);
  }

  async updateAccessToken(id: string, value: string): Promise<boolean> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const updateResult = await accountCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { accessToken: value } },
    );
    return updateResult.modifiedCount > 0;
  }
}
