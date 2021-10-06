import { MongoHelper } from '../helpers/mongo-helper';
import { MongoAccountRepository } from './account-repository';

describe('MongoAccountRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(String(process.env.MONGO_URL));
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  it('Should return an account on success', async () => {
    const sut = new MongoAccountRepository();
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });
    expect(account).toBeTruthy();
    expect(account).toHaveProperty('id');
  });
});
