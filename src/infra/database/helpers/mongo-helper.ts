import { Collection, MongoClient } from 'mongodb';

export const MongoHelper = {
  client: null as unknown as MongoClient,
  uri: null as unknown as string,

  async connect(uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri);
    this.uri = uri;
  },

  async disconnect(): Promise<void> {
    await this.client.close();
    this.client = null as unknown as MongoClient;
  },

  async getCollection(name: string): Promise<Collection> {
    if (!this.client) {
      this.client = await MongoClient.connect(this.uri);
    }
    return this.client.db().collection(name);
  },

  map(data: any): any {
    const { _id, ...rest } = data;
    return { id: String(_id), ...rest };
  },
};
