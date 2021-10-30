/* eslint-disable no-unused-vars */
import { EmailValidation } from '../../../presentation/helpers/validators/email-validation';
import { RequiredFieldValidation } from '../../../presentation/helpers/validators/required-field-validation';
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite';
import { EmailValidator } from '../../../presentation/protocols/email-validator';
import { makeLoginValidation } from './login-validation';

jest.mock('../../../presentation/helpers/validators/validation-composite');

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

describe('LoginValidation Factory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeLoginValidation();
    expect(ValidationComposite).toHaveBeenCalledWith([
      new RequiredFieldValidation('email'),
      new RequiredFieldValidation('password'),
      new EmailValidation(makeEmailValidator(), 'email'),
    ]);
  });
});
