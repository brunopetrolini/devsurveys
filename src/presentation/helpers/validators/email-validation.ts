import { InvalidParamError } from '../../errors';
import { EmailValidator } from '../../protocols/email-validator';
import { Validation } from './validation';

export class EmailValidation implements Validation {
  private readonly emailValidator: EmailValidator;
  private readonly fieldName: string;

  constructor(emailValidator: EmailValidator, fieldName: string) {
    this.emailValidator = emailValidator;
    this.fieldName = fieldName;
  }

  validate(data: any): Error | null {
    const isEmailValid = this.emailValidator.isValid(data[this.fieldName]);
    if (!isEmailValid) {
      return new InvalidParamError(this.fieldName);
    }
    return null;
  }
}