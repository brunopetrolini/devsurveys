import { Validation } from '../../presentation/protocols';

export class ValidationComposite implements Validation {
  private readonly validations: Validation[];

  constructor(validations: Validation[]) {
    this.validations = validations;
  }

  validate(data: any): Error | null {
    for (const validation of this.validations) {
      const error = validation.validate(data);
      if (error) {
        return error;
      }
    }
    return null;
  }
}
