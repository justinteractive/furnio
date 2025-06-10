import { Collection, MongoClient } from 'mongodb';

import { connect } from './connect';
import { InventoryDatabase } from './constants';
import { Document, Collections } from './types';

export function collection<T extends Document>(
  name: Collections,
  client: MongoClient = connect(),
): Collection<T> {
  return client.db(InventoryDatabase).collection<T>(name);
}
