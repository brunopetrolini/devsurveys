import { AddSurveyController } from '../../../../presentation/controllers/survey/add-survey/add-survey-controller';
import { Controller } from '../../../../presentation/protocols';
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory';
import { makeAddSurvey } from '../../usecases/add-survey/db-add-survey-factory';
import { makeAddSurveyValidation } from './add-survey-validation-factory';

export const makeAddSurveyController = (): Controller => {
  const addSurveyController = new AddSurveyController(makeAddSurveyValidation(), makeAddSurvey());
  return makeLogControllerDecorator(addSurveyController);
};
