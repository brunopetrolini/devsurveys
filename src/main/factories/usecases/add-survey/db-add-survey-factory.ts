import { DbAddSurvey } from '../../../../data/usecases/add-survey/db-add-survey';
import { AddSurvey } from '../../../../domain/usecases/add-survey';
import { MongoSurveyRepository } from '../../../../infra/database/mongodb/survey/mongo-survey-repository';

export const makeAddSurvey = (): AddSurvey => {
  const surveyRepository = new MongoSurveyRepository();
  return new DbAddSurvey(surveyRepository);
};
