/* eslint-disable no-unused-vars */
import { MissingParamError } from '../../errors';
import { Validation } from './validation';
import { ValidationComposite } from './validation-composite';

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(data: any): Error | null {
      return new MissingParamError('field');
    }
  }
  return new ValidationStub();
};

describe('Validation Composite', () => {
  it('Should return an erro if any validation fails', () => {
    const validationStub = makeValidation();
    const sut = new ValidationComposite([validationStub]);
    const error = sut.validate({ field: 'any_value' });
    expect(error).toEqual(new MissingParamError('field'));
  });
});
