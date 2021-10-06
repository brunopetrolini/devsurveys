import supertest from 'supertest';
import { MongoHelper } from '../../infra/database/helpers/mongo-helper';
import app from '../config/app';

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(String(process.env.MONGO_URL));
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  afterEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  it('Should return an account on success', async () => {
    await supertest(app)
      .post('/api/signup')
      .send({
        name: 'Bruno Petrolini',
        email: 'bruno@mail.com',
        password: '123456',
        passwordConfirmation: '123456',
      })
      .expect(200);
  });
});
