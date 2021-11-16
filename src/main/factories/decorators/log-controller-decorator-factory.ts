import { MongoLogErrorRepository } from '../../../infra/database/mongodb/log/mongo-log-error-repository';
import { Controller } from '../../../presentation/protocols';
import { LogControllerDecorator } from '../../decorators/log-controller-decorator';

export const makeLogControllerDecorator = (controller: Controller): LogControllerDecorator => {
  const mongoLogErrorRepository = new MongoLogErrorRepository();
  return new LogControllerDecorator(controller, mongoLogErrorRepository);
};
