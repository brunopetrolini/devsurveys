import { MissingParamError } from '../../errors';
import { RequiredFieldValidation } from './required-field-validation';

const makeSut = (): RequiredFieldValidation => new RequiredFieldValidation('field');

describe('Required Field Validation', () => {
  it('Should return MissingParamError if validation fails', () => {
    const sut = makeSut();
    const error = sut.validate({});
    expect(error).toEqual(new MissingParamError('field'));
  });

  it('Should not returns if validation succeeds', () => {
    const sut = makeSut();
    const error = sut.validate({ field: 'any_value' });
    expect(error).toBeFalsy();
  });
});
