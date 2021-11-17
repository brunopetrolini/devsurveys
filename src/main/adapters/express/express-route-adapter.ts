import { Request, Response } from 'express';
import { Controller, HttpRequest } from '../../../presentation/protocols';

export function expressRouteAdapter(controller: Controller) {
  return async (request: Request, response: Response) => {
    const httpRequest: HttpRequest = {
      body: request.body,
    };
    const { statusCode, body } = await controller.handle(httpRequest);
    if (statusCode >= 200 || statusCode <= 299) {
      response.status(statusCode).json(body);
    } else {
      response.status(statusCode).json({
        error: body.message,
      });
    }
  };
}
