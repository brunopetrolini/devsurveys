/* eslint-disable no-unused-vars */
export interface LogErrorRepository {
  log(stack: string): Promise<void>;
}
