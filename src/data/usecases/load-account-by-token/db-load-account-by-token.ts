import { LoadAccountByToken } from '../../../domain/usecases/load-account-by-token';
import { Decrypter } from '../../protocols/cryptography/decrypter';
import { AccountModel } from '../add-account/db-add-account-protocols';

export class DbLoadAccountByToken implements LoadAccountByToken {
  private readonly decrypter: Decrypter;

  constructor(decrypter: Decrypter) {
    this.decrypter = decrypter;
  }

  // eslint-disable-next-line no-unused-vars
  async load(accessToken: string, role?: string): Promise<AccountModel | null> {
    await this.decrypter.decrypt(accessToken);
    return null;
  }
}
