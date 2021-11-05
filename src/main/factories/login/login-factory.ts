import { DbAuthentication } from '../../../data/use-cases/authentication/db-authentication';
import { BcryptAdapter } from '../../../infra/cryptography/bcrypt/bcrypt-adapter';
import { JwtAdapter } from '../../../infra/cryptography/jwt/jwt-adapter';
import { MongoAccountRepository } from '../../../infra/database/mongodb/account/mongo-account-repository';
import { MongoLogErrorRepository } from '../../../infra/database/mongodb/log/mongo-log-error-repository';
import { LoginController } from '../../../presentation/controllers/login/login-controller';
import { Controller } from '../../../presentation/protocols';
import { LogControllerDecorator } from '../../decorators/log-controller-decorator';
import { makeLoginValidation } from './login-validation-factory';

export const makeLoginController = (): Controller => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdapter = new JwtAdapter(String(process.env.JWT_SECRET));
  const accountRepository = new MongoAccountRepository();
  const authentication = new DbAuthentication(
    accountRepository, accountRepository, bcryptAdapter, jwtAdapter,
  );
  const loginController = new LoginController(authentication, makeLoginValidation());
  const mongoLogErrorRepository = new MongoLogErrorRepository();
  return new LogControllerDecorator(loginController, mongoLogErrorRepository);
};
