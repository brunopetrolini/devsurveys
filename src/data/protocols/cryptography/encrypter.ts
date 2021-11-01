/* eslint-disable no-unused-vars */
export interface Encrypter {
  encrypt(value: string): Promise<string>;
}
