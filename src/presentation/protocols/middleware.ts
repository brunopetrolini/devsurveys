/* eslint-disable no-unused-vars */
import { HttpRequest, HttpResponse } from './http';

export interface Middleware {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>;
}
