import {
  Controller, Validation, HttpRequest, HttpResponse, ok,
} from './add-survey-controller-protocols';

export class AddSurveyController implements Controller {
  private readonly validations: Validation;

  constructor(validations: Validation) {
    this.validations = validations;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validations.validate(httpRequest.body);
    return ok({});
  }
}
