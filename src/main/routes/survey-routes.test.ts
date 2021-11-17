import { Collection } from 'mongodb';
import supertest from 'supertest';
import { MongoHelper } from '../../infra/database/helpers/mongo-helper';
import app from '../config/app';

let surveysCollection: Collection;

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(String(process.env.MONGO_URL));
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveysCollection = await MongoHelper.getCollection('surveys');
    await surveysCollection.deleteMany({});
  });

  describe('POST /surveys', () => {
    it('Should return 204 on add survey success', async () => {
      await supertest(app)
        .post('/api/surveys')
        .send({
          question: 'Any Question',
          answers: [
            {
              image: 'http://image_url.com',
              answer: 'Any Answer',
            },
            {
              answer: 'Other Answer',
            },
          ],
        })
        .expect(204);
    });
  });
});
