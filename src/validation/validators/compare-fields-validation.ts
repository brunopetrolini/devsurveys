import { InvalidParamError } from '../../presentation/errors';
import { Validation } from '../../presentation/protocols';

export class CompareFieldsValidation implements Validation {
  private readonly fieldName: string;
  private readonly fieldToCompareName: string;

  constructor(fieldName: string, fieldToCompareName: string) {
    this.fieldName = fieldName;
    this.fieldToCompareName = fieldToCompareName;
  }

  validate(data: any): Error | null {
    if (data[this.fieldName] !== data[this.fieldToCompareName]) {
      return new InvalidParamError(this.fieldToCompareName);
    }
    return null;
  }
}
