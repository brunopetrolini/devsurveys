import { EmailValidation } from '../../../presentation/helpers/validators/email-validation';
import { RequiredFieldValidation } from '../../../presentation/helpers/validators/required-field-validation';
import { Validation } from '../../../presentation/helpers/validators/validation';
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite';
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter';

export const makeLoginValidation = (): Validation => {
  const validations: Validation[] = [];
  const requiredFields = ['email', 'password'];
  requiredFields.forEach(field => validations.push(new RequiredFieldValidation(field)));
  validations.push(new EmailValidation(new EmailValidatorAdapter(), 'email'));
  return new ValidationComposite(validations);
};
