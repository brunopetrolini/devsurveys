import { DbAddAccount } from '../../data/use-cases/add-account/db-add-account';
import { BcryptAdapter } from '../../infra/cryptography/bcrypt-adapter';
import { MongoAccountRepository } from '../../infra/database/mongodb/account-repository';
import { SignUpController } from '../../presentation/controllers/signup/signup';
import { Controller } from '../../presentation/protocols';
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter';
import { LogControllerDecorator } from '../decorators/log';

export const makeSignupController = (): Controller => {
  const salt = 12;
  const encrypter = new BcryptAdapter(salt);
  const mongoAccountRepository = new MongoAccountRepository();
  const addAccount = new DbAddAccount(encrypter, mongoAccountRepository);
  const emailValidator = new EmailValidatorAdapter();
  const signUpController = new SignUpController(emailValidator, addAccount);
  return new LogControllerDecorator(signUpController);
};
