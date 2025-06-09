import { MongoClient } from 'mongodb';

import { MongoDBUri } from './constants';
console.log('MongoDBUri', MongoDBUri);
export const mongoClient = new MongoClient(MongoDBUri);

export async function connect(): Promise<MongoClient> {
  await mongoClient.connect();
  return mongoClient;
}
