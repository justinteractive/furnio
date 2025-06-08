import { getClient } from './client';
import { InventoryDatabase } from './constants';
import { Document, MongoCollections } from './types';

export async function collection<T extends Document>(name: MongoCollections) {
  const client = await getClient();
  return client.db(InventoryDatabase).collection<T>(name);
}
