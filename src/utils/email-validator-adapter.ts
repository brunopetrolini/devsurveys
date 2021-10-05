import { EmailValidator } from '../presentation/protocols/email-validator';

export class EmailValidatorAdapter implements EmailValidator {
  // eslint-disable-next-line no-unused-vars
  isValid(email: string): boolean {
    return false;
  }
}
