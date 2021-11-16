import {
  Controller, Validation, HttpRequest, HttpResponse, ok, badRequest,
} from './add-survey-controller-protocols';

export class AddSurveyController implements Controller {
  private readonly validations: Validation;

  constructor(validations: Validation) {
    this.validations = validations;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validations.validate(httpRequest.body);
    if (error) {
      return badRequest(error);
    }
    return ok({});
  }
}
