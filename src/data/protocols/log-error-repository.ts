/* eslint-disable no-unused-vars */
export interface LogErrorRepository {
  logError(stack: string): Promise<void>;
}
