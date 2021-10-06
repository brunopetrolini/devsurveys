import { Router } from 'express';
import { expressRouteAdapter } from '../adapters/express-route-adapter';
import { makeSignupController } from '../factories/signup';

export default (router: Router) => {
  router.post('/signup', expressRouteAdapter(makeSignupController()));
};
