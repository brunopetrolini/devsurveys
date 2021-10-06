import supertest from 'supertest';
import { app } from '../config/app';

describe('Content-Type Middleware', () => {
  it('Should return default content type as json', async () => {
    app.get('/test-content-type', (request, response) => {
      response.send();
    });
    await supertest(app)
      .get('/test-content-type')
      .expect('content-type', /json/);
  });
});
