import { Router } from 'express';
import { expressRouteAdapter } from '../adapters/express/express-route-adapter';
import { makeSignupController } from '../factories/signup/signup-factory';

export default (router: Router) => {
  router.post('/signup', expressRouteAdapter(makeSignupController()));
};
