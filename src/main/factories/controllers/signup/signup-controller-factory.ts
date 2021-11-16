import { SignUpController } from '../../../../presentation/controllers/login/signup/signup-controller';
import { Controller } from '../../../../presentation/protocols';
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory';
import { makeAddAccount } from '../../usecases/add-account/db-add-account-factory';
import { makeAuthentication } from '../../usecases/authentication/db-authentication-factory';
import { makeSignupValidation } from './signup-validation-factory';

export const makeSignupController = (): Controller => {
  const signUpController = new SignUpController(
    makeAddAccount(),
    makeSignupValidation(),
    makeAuthentication(),
  );
  return makeLogControllerDecorator(signUpController);
};
