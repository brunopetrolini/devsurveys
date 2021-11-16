import { DbAuthentication } from '../../../../data/usecases/authentication/db-authentication';
import { Authentication } from '../../../../domain/usecases/authentication';
import { BcryptAdapter } from '../../../../infra/cryptography/bcrypt/bcrypt-adapter';
import { JwtAdapter } from '../../../../infra/cryptography/jwt/jwt-adapter';
import { MongoAccountRepository } from '../../../../infra/database/mongodb/account/mongo-account-repository';

export const makeAuthentication = (): Authentication => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdapter = new JwtAdapter(String(process.env.JWT_SECRET));
  const accountRepository = new MongoAccountRepository();
  return new DbAuthentication(accountRepository, accountRepository, bcryptAdapter, jwtAdapter);
};
