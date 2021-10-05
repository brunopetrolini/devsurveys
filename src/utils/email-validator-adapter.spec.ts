import validator from 'validator';
import { EmailValidatorAdapter } from './email-validator-adapter';

describe('EmailValidator Adapter', () => {
  it('Should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter();
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false);
    const isValid = sut.isValid('invalid_email@mail.com');
    expect(isValid).toBe(false);
  });

  it('Should return true if validator returns true', () => {
    const sut = new EmailValidatorAdapter();
    const isValid = sut.isValid('any_email@mail.com');
    expect(isValid).toBe(true);
  });
});
