/* eslint-disable no-unused-vars */
export interface UpdateAccessTokenRepository {
  updateAccessToken(id: string, value: string): Promise<boolean>;
}
