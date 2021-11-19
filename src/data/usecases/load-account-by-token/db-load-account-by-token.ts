import { LoadAccountByToken } from '../../../domain/usecases/load-account-by-token';
import { Decrypter } from '../../protocols/cryptography/decrypter';
import { LoadAccountByTokenRepository } from '../../protocols/database/account/load-account-by-token-repository';
import { AccountModel } from '../add-account/db-add-account-protocols';

export class DbLoadAccountByToken implements LoadAccountByToken {
  private readonly decrypter: Decrypter;
  private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository;

  constructor(decrypter: Decrypter, loadAccountByTokenRepository: LoadAccountByTokenRepository) {
    this.decrypter = decrypter;
    this.loadAccountByTokenRepository = loadAccountByTokenRepository;
  }

  async load(accessToken: string, role?: string): Promise<AccountModel | null> {
    const decryptedToken = await this.decrypter.decrypt(accessToken);
    if (decryptedToken) {
      await this.loadAccountByTokenRepository.loadByToken(decryptedToken, role);
    }
    return null;
  }
}
