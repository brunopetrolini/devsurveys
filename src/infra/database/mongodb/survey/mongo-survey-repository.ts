import { AddSurveyRepository } from '../../../../data/protocols/database/survey/add-survey-repository';
import { AddSurveyModel } from '../../../../domain/usecases/add-survey';
import { MongoHelper } from '../../helpers/mongo-helper';

export class MongoSurveyRepository implements AddSurveyRepository {
  async add(survey: AddSurveyModel): Promise<void> {
    const surveysCollection = await MongoHelper.getCollection('surveys');
    await surveysCollection.insertOne(survey);
  }
}
