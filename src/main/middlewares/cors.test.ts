import supertest from 'supertest';
import app from '../config/app';

describe('CORS Middleware', () => {
  it('Should enable CORS', async () => {
    app.get('/test-cors', (request, response) => {
      response.send();
    });
    await supertest(app)
      .get('/test-cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*');
  });
});
