/* eslint-disable no-unused-vars */
export interface TokenGenerator {
  generate(id: string): Promise<string>;
}
