import { CompareFieldsValidation } from '../../../presentation/helpers/validators/compare-fields-validation';
import { EmailValidation } from '../../../presentation/helpers/validators/email-validation';
import { RequiredFieldValidation } from '../../../presentation/helpers/validators/required-field-validation';
import { Validation } from '../../../presentation/helpers/validators/validation';
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite';
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter';

export const makeSignupValidation = (): Validation => {
  const validations: Validation[] = [];
  const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];
  requiredFields.forEach(field => validations.push(new RequiredFieldValidation(field)));
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'));
  validations.push(new EmailValidation(new EmailValidatorAdapter(), 'email'));
  return new ValidationComposite(validations);
};