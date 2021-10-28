import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validation';
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite';
import { makeSignupValidation } from './signup-validation';

jest.mock('../../presentation/helpers/validators/validation-composite');

describe('SingUpValidation Factory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeSignupValidation();
    expect(ValidationComposite).toHaveBeenCalledWith([
      new RequiredFieldValidation('name'),
      new RequiredFieldValidation('email'),
      new RequiredFieldValidation('password'),
      new RequiredFieldValidation('passwordConfirmation'),
    ]);
  });
});
