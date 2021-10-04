import { HttpRequest, HttpResponse } from '../protocols/http';
import { InvalidParamError, MissingParamError } from '../errors';
import { badRequest, ok, serverError } from '../helpers/http-helper';
import { Controller, EmailValidator } from '../protocols';
import { AddAccount } from '../../domain/use-cases/add-account';

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;
  private readonly addAccount: AddAccount;

  constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator;
    this.addAccount = addAccount;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }
      const {
        name, email, password, passwordConfirmation,
      } = httpRequest.body;
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }
      const isEmailValid = this.emailValidator.isValid(email);
      if (!isEmailValid) {
        return badRequest(new InvalidParamError('email'));
      }
      await this.addAccount.add({ name, email, password });
      return ok({});
    } catch (error) {
      return serverError();
    }
  }
}
