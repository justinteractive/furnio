import { collection } from '@db/collection';
import { connect } from '@db/connect';
import { InventoryDatabase } from '@db/constants';
import { Collections, ObjectId, OrganisationDocument, OrganisationOutput } from '@db/types';
import { serializeObjectIds } from '@db/utils/serializeObjectIds';

export async function getOrganisationById(id: string): Promise<OrganisationOutput | null> {
  try {
    const client = connect();
    const db = client.db(InventoryDatabase);
    const _id = new ObjectId(id);

    const organisation = await db.collection<OrganisationDocument>(Collections.Organisations).findOne({ _id });
    
    await client.close();

    if (organisation) return serializeObjectIds(organisation);
  } catch(_) {
    // TODO do something with the error if needed
  }
  return null;
}
