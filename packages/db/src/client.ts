import { MongoClient } from 'mongodb';

import { InventoryDB, MongoDBUri } from './constants';
import { MongoCollections, MongoDocument } from './types';

let mongoClient: MongoClient;

export async function getClient(): Promise<MongoClient> {
  if (mongoClient) return mongoClient;
  mongoClient = new MongoClient(MongoDBUri);
  await mongoClient.connect();
  return mongoClient;
}

export async function collection<T extends MongoDocument>(name: MongoCollections) {
  const client = await getClient();
  return client.db(InventoryDB).collection<T>(name);
}
