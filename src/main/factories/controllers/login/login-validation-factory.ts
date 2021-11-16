import { RequiredFieldValidation, EmailValidation, ValidationComposite } from '../../../../validation/validators';
import { Validation } from '../../../../presentation/protocols';
import { EmailValidatorAdapter } from '../../../../infra/validators/email-validator-adapter';

export const makeLoginValidation = (): Validation => {
  const validations: Validation[] = [];
  const requiredFields = ['email', 'password'];
  requiredFields.forEach(field => validations.push(new RequiredFieldValidation(field)));
  validations.push(new EmailValidation(new EmailValidatorAdapter(), 'email'));
  return new ValidationComposite(validations);
};
