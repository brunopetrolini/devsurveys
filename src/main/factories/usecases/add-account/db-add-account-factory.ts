import { DbAddAccount } from '../../../../data/usecases/add-account/db-add-account';
import { AddAccount } from '../../../../domain/usecases/add-account';
import { BcryptAdapter } from '../../../../infra/cryptography/bcrypt/bcrypt-adapter';
import { MongoAccountRepository } from '../../../../infra/database/mongodb/account/mongo-account-repository';

export const makeAddAccount = (): AddAccount => {
  const salt = 12;
  const encrypter = new BcryptAdapter(salt);
  const mongoAccountRepository = new MongoAccountRepository();
  return new DbAddAccount(encrypter, mongoAccountRepository, mongoAccountRepository);
};
