import { MongoClient } from 'mongodb';

import { MongoDBUri } from './constants';

export function connect(): MongoClient {
  return new MongoClient(MongoDBUri);
}
