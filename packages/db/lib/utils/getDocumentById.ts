import { connect } from '../connect';
import { InventoryDatabase } from '../constants';
import { Collections, ObjectId } from '../types';
import { serializeObjectIds } from '../utils/serializeObjectIds';

export async function getDocumentById<Output>(collection: Collections, id: string): Promise<Output | null> {
  try {
    const client = connect();
    const db = client.db(InventoryDatabase);
    const _id = new ObjectId(id);
    const organisation = await db.collection(collection).findOne({ _id });

    await client.close();

    if (organisation) return serializeObjectIds(organisation) as Output;
  } catch(_) {
    // TODO do something with the error if needed
  }
  return null;
}
