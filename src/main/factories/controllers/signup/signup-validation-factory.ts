import { CompareFieldsValidation } from '../../../../validation/validators/compare-fields-validation';
import { EmailValidation } from '../../../../validation/validators/email-validation';
import { RequiredFieldValidation } from '../../../../validation/validators/required-field-validation';
import { Validation } from '../../../../presentation/protocols';
import { ValidationComposite } from '../../../../validation/validators/validation-composite';
import { EmailValidatorAdapter } from '../../../../infra/validators/email-validator-adapter';

export const makeSignupValidation = (): Validation => {
  const validations: Validation[] = [];
  const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];
  requiredFields.forEach(field => validations.push(new RequiredFieldValidation(field)));
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'));
  validations.push(new EmailValidation(new EmailValidatorAdapter(), 'email'));
  return new ValidationComposite(validations);
};
