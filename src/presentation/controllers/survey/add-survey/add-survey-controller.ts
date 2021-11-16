import { badRequest, ok } from '../../../helpers/http/http-helper';
import {
  Controller, Validation, HttpRequest, HttpResponse, AddSurvey,
} from './add-survey-controller-protocols';

export class AddSurveyController implements Controller {
  private readonly validations: Validation;
  private readonly addSurvey: AddSurvey;

  constructor(validations: Validation, addSurvey: AddSurvey) {
    this.validations = validations;
    this.addSurvey = addSurvey;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validations.validate(httpRequest.body);
    if (error) {
      return badRequest(error);
    }
    await this.addSurvey.add(httpRequest.body);
    return ok({});
  }
}
