import jwt from 'jsonwebtoken';
import { Encrypter } from '../../../data/protocols/cryptography/encrypter';

export class JwtAdapter implements Encrypter {
  private readonly secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  async encrypt(value: string): Promise<string> {
    const accessToken = jwt.sign({ id: value }, this.secretKey);
    return Promise.resolve(accessToken);
  }
}
