import { MongoClient } from 'mongodb';

import { MongoDBUri } from './constants';

let mongoClient: MongoClient;

export async function getClient(): Promise<MongoClient> {
  if (mongoClient) return mongoClient;
  mongoClient = new MongoClient(MongoDBUri);
  await mongoClient.connect();
  return mongoClient;
}
