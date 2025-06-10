import { connect } from '@db/connect';
import { InventoryDatabase } from '@db/constants';
import { Collections, ItemDocument, ItemOutput } from '@db/types';
import { serializeObjectIds } from '@db/utils/serializeObjectIds';

export async function listItems(): Promise<Array<ItemOutput>> {
  const client = connect();
  const db = client.db(InventoryDatabase);

  const items = await db.collection<ItemDocument>(Collections.Items).find({})
    .sort({ createdAt: -1 })
    .toArray();

  await client.close();

  return serializeObjectIds(items);
}
