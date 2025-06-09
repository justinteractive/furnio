import { Collection } from 'mongodb';

import { mongoClient } from './client';
import { InventoryDatabase } from './constants';
import { Document, MongoCollections } from './types';

export function collection<T extends Document>(name: MongoCollections): Collection<T> {
  return mongoClient.db(InventoryDatabase).collection<T>(name);
}
