import jwt from 'jsonwebtoken';
import { Decrypter } from '../../../data/protocols/cryptography/decrypter';
import { Encrypter } from '../../../data/protocols/cryptography/encrypter';

export class JwtAdapter implements Encrypter, Decrypter {
  private readonly secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  async encrypt(value: string): Promise<string> {
    const accessToken = jwt.sign({ id: value }, this.secretKey);
    return Promise.resolve(accessToken);
  }

  async decrypt(value: string): Promise<string | null> {
    const payload = jwt.verify(value, this.secretKey);
    return Promise.resolve(payload as string);
  }
}
