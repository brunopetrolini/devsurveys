import bcrypt from 'bcrypt';
import { HashComparer } from '../../data/protocols/cryptography/hash-comparer';
import { Hasher } from '../../data/protocols/cryptography/hasher';

export class BcryptAdapter implements Hasher, HashComparer {
  private salt: number;

  constructor(salt: number) {
    this.salt = salt;
  }

  async hash(value: string): Promise<string> {
    const hashedValue = await bcrypt.hash(value, this.salt);
    return hashedValue;
  }

  async compare(value: string, hash: string): Promise<boolean> {
    const isHashValid = await bcrypt.compare(value, hash);
    return isHashValid;
  }
}
