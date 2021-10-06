import supertest from 'supertest';
import app from '../config/app';

describe('Body Parser Middleware', () => {
  it('Should parse body as json', async () => {
    app.post('/test-body-parser', (request, response) => {
      response.send(request.body);
    });
    await supertest(app)
      .post('/test-body-parser')
      .send({ name: 'Bruno' })
      .expect({ name: 'Bruno' });
  });
});
