/* eslint-disable max-classes-per-file */
/* eslint-disable no-unused-vars */
import { LogErrorRepository } from '../../data/protocols/log-error-repository';
import { serverError } from '../../presentation/helpers/http-helper';
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols';
import { LogControllerDecorator } from './log';

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password',
  },
});

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      return Promise.resolve({
        statusCode: 200,
        body: {
          name: 'Bruno Petrolini',
        },
      });
    }
  }
  return new ControllerStub();
};

const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async log(stack: string): Promise<void> {
      Promise.resolve(null);
    }
  }
  return new LogErrorRepositoryStub();
};

type SutTypes = {
  controllerStub: Controller,
  logErrorRepositoryStub: LogErrorRepository,
  sut: LogControllerDecorator,
}
const makeSut = (): SutTypes => {
  const controllerStub = makeController();
  const logErrorRepositoryStub = makeLogErrorRepository();
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub);
  return { controllerStub, logErrorRepositoryStub, sut };
};

describe('LogControllerDecorator', () => {
  it('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut();
    const handleSpy = jest.spyOn(controllerStub, 'handle');
    const httpRequest = makeFakeRequest();
    await sut.handle(httpRequest);
    expect(handleSpy).toHaveBeenCalledWith(httpRequest);
  });

  it('Should return the same result of the controller', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {
        name: 'Bruno Petrolini',
      },
    });
  });

  it('Should call LogErrorRepository with correct error if controller return a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut();
    const fakeError = new Error();
    fakeError.stack = 'any_stack';
    const error = serverError(fakeError);
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(Promise.resolve(error));
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'log');
    await sut.handle(makeFakeRequest());
    expect(logSpy).toHaveBeenCalledWith(fakeError.stack);
  });
});
