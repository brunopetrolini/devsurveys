/* eslint-disable no-unused-vars */
import { InvalidParamError } from '../../presentation/errors';
import { EmailValidator } from '../protocols/email-validator';
import { EmailValidation } from './email-validation';

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

type SutTypes = {
  sut: EmailValidation;
  emailValidatorStub: EmailValidator;
}
const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator();
  const sut = new EmailValidation(emailValidatorStub, 'email');
  return { sut, emailValidatorStub };
};

describe('Email Validation', () => {
  it('Should return InvalidParamError if an invalid email is provided', () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);
    const isEmailValid = sut.validate('invalid_email@mail.com');
    expect(isEmailValid).toEqual(new InvalidParamError('email'));
  });

  it('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');
    sut.validate({ email: 'any_email@mail.com' });
    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com');
  });

  it('Should throws if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });
    expect(sut.validate).toThrow();
  });
});
