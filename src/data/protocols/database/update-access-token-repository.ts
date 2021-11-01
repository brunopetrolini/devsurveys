/* eslint-disable no-unused-vars */
export interface UpdateAccessTokenRepository {
  update(id: string, value: string): Promise<boolean>;
}
