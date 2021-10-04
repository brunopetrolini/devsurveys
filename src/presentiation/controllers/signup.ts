export class SignUpController {
  handle(httpRequest: any): any {
    const { body } = httpRequest;
    return {
      statusCode: 400,
      body,
    };
  }
}
