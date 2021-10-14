import { Collection } from 'mongodb';
import { LogErrorRepository } from '../../../../data/protocols/log-error-repository';
import { MongoHelper } from '../../helpers/mongo-helper';
import { MongoLogErrorRepository } from './log-error-repository';

const makeSut = (): LogErrorRepository => new MongoLogErrorRepository();

describe('LogError Repository', () => {
  let errorCollection: Collection;

  beforeAll(async () => {
    await MongoHelper.connect(String(process.env.MONGO_URL));
  });

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors');
    await errorCollection.deleteMany({});
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  it('Should save an error log', async () => {
    const sut = makeSut();
    await sut.log('any_stack');
    const documentsCount = await errorCollection.countDocuments();
    expect(documentsCount).toBe(1);
  });
});
