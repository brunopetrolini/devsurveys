/* eslint-disable no-unused-vars */

import {
  ValidationComposite, RequiredFieldValidation, CompareFieldsValidation, EmailValidation,
} from '../../../../validation/validators';
import { EmailValidator } from '../../../../validation/protocols/email-validator';
import { makeSignupValidation } from './signup-validation-factory';

jest.mock('../../../../validation/validators/validation-composite');

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

describe('SingUpValidation Factory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeSignupValidation();
    expect(ValidationComposite).toHaveBeenCalledWith([
      new RequiredFieldValidation('name'),
      new RequiredFieldValidation('email'),
      new RequiredFieldValidation('password'),
      new RequiredFieldValidation('passwordConfirmation'),
      new CompareFieldsValidation('password', 'passwordConfirmation'),
      new EmailValidation(makeEmailValidator(), 'email'),
    ]);
  });
});
