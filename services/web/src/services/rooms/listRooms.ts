import { connect } from '@db/connect';
import { InventoryDatabase } from '@db/constants';
import { Collections, RoomDocument, RoomOutput } from '@db/types';
import { serializeObjectIds } from '@db/utils/serializeObjectIds';

export async function listRooms(): Promise<Array<RoomOutput>> {
  const client = connect();
  const db = client.db(InventoryDatabase);

  const items = await db.collection<RoomDocument>(Collections.Rooms).find({})
    .sort({ name: 1 })
    .toArray();

  await client.close();

  return serializeObjectIds(items);
}
