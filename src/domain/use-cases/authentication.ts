/* eslint-disable no-unused-vars */
export interface Authentication {
  auth(email: string, password: string): Promise<string | null>;
}
