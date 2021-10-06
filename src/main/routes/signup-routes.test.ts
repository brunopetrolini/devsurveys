import supertest from 'supertest';
import { app } from '../config/app';

describe('SignUp Routes', () => {
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
