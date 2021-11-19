/* eslint-disable no-unused-vars */
export interface Decrypter {
  decrypt(value: string): Promise<string | null>;
}
