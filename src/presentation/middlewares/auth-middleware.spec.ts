/* eslint-disable no-unused-vars */
import { AccessDeniedError } from '../errors';
import { forbidden, serverError, ok } from '../helpers/http/http-helper';
import { HttpRequest } from '../protocols';
import { AuthMiddleware } from './auth-middleware';
import { LoadAccountByToken, AccountModel } from './auth-middleware-protocols';

const makeFakeRequest = (): HttpRequest => ({
  headers: {
    'x-access-token': 'any_token',
  },
});

const makeLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load(accessToken: string, role?: string): Promise<AccountModel | null> {
      return Promise.resolve({
        id: 'any_id',
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
      });
    }
  }
  return new LoadAccountByTokenStub();
};

type SutTypes = {
  sut: AuthMiddleware;
  loadAccountByTokenStub: LoadAccountByToken;
}
const makeSut = (role?: string): SutTypes => {
  const loadAccountByTokenStub = makeLoadAccountByToken();
  const sut = new AuthMiddleware(loadAccountByTokenStub, role);
  return { sut, loadAccountByTokenStub };
};

describe('Auth Middleware', () => {
  it('Should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });

  it('Should call LoadAccountByToken with correct accessToken', async () => {
    const role = 'any_role';
    const { sut, loadAccountByTokenStub } = makeSut(role);
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load');
    await sut.handle(makeFakeRequest());
    expect(loadSpy).toHaveBeenCalledWith('any_token', role);
  });

  it('Should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenStub } = makeSut();
    jest.spyOn(loadAccountByTokenStub, 'load').mockReturnValueOnce(Promise.resolve(null));
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });

  it('Should return 200 if LoadAccountByToken returns an account', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok({ accountId: 'any_id' }));
  });

  it('Should return 500 if LoadAccountByToken throws', async () => {
    const { sut, loadAccountByTokenStub } = makeSut();
    jest.spyOn(loadAccountByTokenStub, 'load').mockImplementationOnce(() => Promise.reject(new Error()));
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
