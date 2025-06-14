import { connect } from '@db/connect';
import { InventoryDatabase } from '@db/constants';
import { Collections, PropertyDocument, PropertyOutput } from '@db/types';
import { serializeObjectIds } from '@db/utils/serializeObjectIds';

export async function listProperties(): Promise<Array<PropertyOutput>> {
  const client = connect();
  const db = client.db(InventoryDatabase);

  const items = await db.collection<PropertyDocument>(Collections.Properties).find({})
    .sort({ name: 1 })
    .toArray();

  await client.close();

  return serializeObjectIds(items);
}
