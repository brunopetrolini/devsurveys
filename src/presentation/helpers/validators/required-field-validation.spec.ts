import { MissingParamError } from '../../errors';
import { RequiredFieldValidation } from './required-field-validation';

describe('Required Field Validation', () => {
  it('Should return MissingParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('any_field');
    const error = sut.validate({});
    expect(error).toEqual(new MissingParamError('any_field'));
  });
});
