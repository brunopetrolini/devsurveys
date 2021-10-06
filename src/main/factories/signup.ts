import { DbAddAccount } from '../../data/use-cases/add-account/db-add-account';
import { BcryptAdapter } from '../../infra/cryptography/bcrypt-adapter';
import { MongoAccountRepository } from '../../infra/database/mongodb/account-repository';
import { SignUpController } from '../../presentation/controllers/signup/signup';
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter';

export const makeSignupController = (): SignUpController => {
  const salt = 12;
  const encrypter = new BcryptAdapter(salt);
  const mongoAccountRepository = new MongoAccountRepository();
  const addAccount = new DbAddAccount(encrypter, mongoAccountRepository);
  const emailValidator = new EmailValidatorAdapter();
  return new SignUpController(emailValidator, addAccount);
};
