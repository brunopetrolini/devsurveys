import { Router } from 'express';
import { expressRouteAdapter } from '../adapters/express/express-route-adapter';
import { makeLoginController } from '../factories/controllers/login/login-controller-factory';
import { makeSignupController } from '../factories/controllers/signup/signup-controller-factory';

export default (router: Router) => {
  router.post('/signup', expressRouteAdapter(makeSignupController()));
  router.post('/login', expressRouteAdapter(makeLoginController()));
};
