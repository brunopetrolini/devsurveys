import {
  Authentication,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
  HashComparer,
  Encrypter,
  AuthenticationModel,
} from './db-authentication-protocols';

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository;
  private readonly updateAccessTokenRepository: UpdateAccessTokenRepository;
  private readonly hashComparer: HashComparer;
  private readonly encrypter: Encrypter;

  constructor(
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    updateAccessTokenRepository: UpdateAccessTokenRepository,
    hashComparer: HashComparer,
    encrypter: Encrypter,
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.updateAccessTokenRepository = updateAccessTokenRepository;
    this.hashComparer = hashComparer;
    this.encrypter = encrypter;
  }

  async auth(authentication: AuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email);
    if (account) {
      const isValid = await this.hashComparer.compare(authentication.password, account.password);
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id);
        await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken);
        return accessToken;
      }
    }
    return null;
  }
}