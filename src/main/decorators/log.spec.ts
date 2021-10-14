/* eslint-disable no-unused-vars */
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
      return Promise.resolve({ statusCode: 200, body: {} });
    }
  }
  return new ControllerStub();
};

describe('LogControllerDecorator', () => {
  it('Should call controller handle', async () => {
    const controllerStub = makeController();
    const handleSpy = jest.spyOn(controllerStub, 'handle');
    const sut = new LogControllerDecorator(controllerStub);
    await sut.handle(makeFakeRequest());
    expect(handleSpy).toHaveBeenCalledWith({
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    });
  });
});
