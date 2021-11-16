import { badRequest, ok, serverError } from '../../helpers/http/http-helper';
import {
  AddAccount, Controller, HttpRequest, HttpResponse, Validation, Authentication,
} from './signup-protocols';

export class SignUpController implements Controller {
  private readonly validation: Validation;
  private readonly addAccount: AddAccount;
  private readonly authentication: Authentication;

  constructor(addAccount: AddAccount, validation: Validation, authentication: Authentication) {
    this.validation = validation;
    this.addAccount = addAccount;
    this.authentication = authentication;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }
      const { name, email, password } = httpRequest.body;
      const account = await this.addAccount.add({ name, email, password });
      const accessToken = await this.authentication.auth({
        email: account.email,
        password: account.password,
      });
      return ok({ accessToken });
    } catch (error) {
      return serverError(error as Error);
    }
  }
}
