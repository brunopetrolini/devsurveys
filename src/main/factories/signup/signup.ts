import { DbAddAccount } from '../../../data/use-cases/add-account/db-add-account';
import { BcryptAdapter } from '../../../infra/cryptography/bcrypt-adapter';
import { MongoAccountRepository } from '../../../infra/database/mongodb/account/account-repository';
import { MongoLogErrorRepository } from '../../../infra/database/mongodb/log/log-error-repository';
import { SignUpController } from '../../../presentation/controllers/signup/signup';
import { Controller } from '../../../presentation/protocols';
import { LogControllerDecorator } from '../../decorators/log';
import { makeSignupValidation } from './signup-validation';

export const makeSignupController = (): Controller => {
  const salt = 12;
  const encrypter = new BcryptAdapter(salt);
  const mongoAccountRepository = new MongoAccountRepository();
  const addAccount = new DbAddAccount(encrypter, mongoAccountRepository);
  const signUpController = new SignUpController(addAccount, makeSignupValidation());
  const mongoLogErrorRepository = new MongoLogErrorRepository();
  return new LogControllerDecorator(signUpController, mongoLogErrorRepository);
};