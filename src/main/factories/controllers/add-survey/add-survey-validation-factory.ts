import { RequiredFieldValidation, ValidationComposite } from '../../../../validation/validators';
import { Validation } from '../../../../presentation/protocols';

export const makeAddSurveyValidation = (): Validation => {
  const validations: Validation[] = [];
  const requiredFields = ['question', 'answers'];
  requiredFields.forEach(field => validations.push(new RequiredFieldValidation(field)));
  return new ValidationComposite(validations);
};
