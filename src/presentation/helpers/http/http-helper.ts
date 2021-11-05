import { UnauthorizedError, ServerError } from '../../errors';
import { HttpResponse } from '../../protocols';

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError(),
});

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(String(error.stack)),
});

export const ok = (content: any): HttpResponse => ({
  statusCode: 200,
  body: content,
});
