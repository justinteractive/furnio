import { connect } from '@db/connect';
import { InventoryDatabase } from '@db/constants';
import { Collections, OrganisationDocument, OrganisationOutput } from '@db/types';
import { serializeObjectIds } from '@db/utils/serializeObjectIds';

export async function listOrganisations(): Promise<Array<OrganisationOutput>> {
  const client = connect();
  const db = client.db(InventoryDatabase);

  const organisations = await db.collection<OrganisationDocument>(Collections.Organisations).find({})
    .sort({ name: 1 })
    .toArray();

  await client.close();

  return serializeObjectIds(organisations);
}
