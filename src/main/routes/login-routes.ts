import { Router } from 'express';
import { expressRouteAdapter } from '../adapters/express/express-route-adapter';
import { makeLoginController } from '../factories/login/login-factory';
import { makeSignupController } from '../factories/signup/signup-factory';

export default (router: Router) => {
  router.post('/signup', expressRouteAdapter(makeSignupController()));
  router.post('/login', expressRouteAdapter(makeLoginController()));
};
