import { Collection } from 'mongodb';
import { MongoHelper } from '../../helpers/mongo-helper';
import { MongoAccountRepository } from './mongo-account-repository';

const makeSut = (): MongoAccountRepository => new MongoAccountRepository();

let accountCollection: Collection;

describe('MongoAccountRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(String(process.env.MONGO_URL));
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  describe('add()', () => {
    it('Should return an account on add success', async () => {
      const sut = makeSut();
      const account = await sut.add({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
      });
      expect(account).toBeTruthy();
      expect(account).toHaveProperty('id');
    });
  });

  describe('loadByEmail()', () => {
    it('Should return an account on loadByEmail success', async () => {
      const sut = makeSut();
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
      });
      const account = await sut.loadByEmail('any_email@mail.com');
      expect(account?.id).toBeTruthy();
    });

    it('Should return null if loadByEmail fails', async () => {
      const sut = makeSut();
      const account = await sut.loadByEmail('any_email@mail.com');
      expect(account?.id).toBeFalsy();
    });
  });

  describe('updateAccessToken()', () => {
    it('Should update the account accessToken on updateAccessToken success', async () => {
      const sut = makeSut();
      const insertedResult = await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
      });
      await sut.updateAccessToken(String(insertedResult.insertedId), 'any_token');
      const account = await accountCollection.findOne({ _id: insertedResult.insertedId });
      expect(account?.accessToken).toBe('any_token');
    });
  });
});
