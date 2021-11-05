import { hash } from 'bcrypt';
import { Collection } from 'mongodb';
import supertest from 'supertest';
import { MongoHelper } from '../../infra/database/helpers/mongo-helper';
import app from '../config/app';

let accountCollection: Collection;

describe('Login Routes', () => {
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

  describe('POST /signup', () => {
    it('Should return 200 on signup', async () => {
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

  describe('POST /login', () => {
    it('Should return 200 on login', async () => {
      const password = await hash('123456', 12);
      await accountCollection.insertOne({
        name: 'Bruno Petrolini',
        email: 'bruno@mail.com',
        password,
      });
      await supertest(app)
        .post('/api/login')
        .send({
          email: 'bruno@mail.com',
          password: '123456',
        })
        .expect(200);
    });

    it('Should return 401 on login', async () => {
      await accountCollection.insertOne({
        name: 'Bruno Petrolini',
        email: 'bruno@mail.com',
        password: '123456',
      });
      await supertest(app)
        .post('/api/login')
        .send({
          email: 'bruno@mail.com',
          password: 'invalid_password',
        })
        .expect(401);
    });
  });
});
