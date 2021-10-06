import supertest from 'supertest';
import app from '../config/app';

describe('Content-Type Middleware', () => {
  it('Should return default content type as json', async () => {
    app.get('/test-content-type-json', (request, response) => {
      response.send();
    });
    await supertest(app)
      .get('/test-content-type-json')
      .expect('content-type', /json/);
  });

  it('Should return xml content type when forced', async () => {
    app.get('/test-content-type-xml', (request, response) => {
      response.type('xml');
      response.send();
    });
    await supertest(app)
      .get('/test-content-type-xml')
      .expect('content-type', /xml/);
  });
});
