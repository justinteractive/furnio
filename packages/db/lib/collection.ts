import { Collection } from 'mongodb';

import { client } from './client';
import { InventoryDatabase } from './constants';
import { Document, MongoCollections } from './types';

export function collection<T extends Document>(name: MongoCollections): Collection<T> {
  return client.db(InventoryDatabase).collection<T>(name);
}
