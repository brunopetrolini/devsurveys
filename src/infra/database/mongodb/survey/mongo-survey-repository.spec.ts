import { Collection } from 'mongodb';
import { MongoHelper } from '../../helpers/mongo-helper';
import { MongoSurveyRepository } from './mongo-survey-repository';

const makeSut = (): MongoSurveyRepository => new MongoSurveyRepository();

let surveysCollection: Collection;

describe('MongoSurveyRepository', () => {
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

  it('Should create an survey on success', async () => {
    const sut = makeSut();
    await sut.add({
      question: 'any_question',
      answers: [
        {
          image: 'any_image',
          answer: 'any_answer',
        },
        {
          answer: 'other_answer',
        },
      ],
    });
    const survey = await surveysCollection.findOne({ question: 'any_question' });
    expect(survey).toBeTruthy();
  });
});
