/* eslint-disable no-unused-vars */
export interface Hasher {
  hash(value: string): Promise<string>;
}
