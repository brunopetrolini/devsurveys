import { MongoHelper } from '../helpers/mongo-helper';
import { MongoAccountRepository } from './account-repository';

const makeSut = (): MongoAccountRepository => new MongoAccountRepository();

describe('MongoAccountRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(String(process.env.MONGO_URL));
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  it('Should return an account on success', async () => {
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
