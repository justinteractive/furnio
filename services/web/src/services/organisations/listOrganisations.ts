import { collection } from '@db/collection';
import { MongoCollections, OrganisationDocument, OrganisationOutput } from '@db/types';
import { serializeObjectIds } from '@db/utils/serializeObjectIds';

export async function listOrganisations(): Promise<Array<OrganisationOutput>> {
  const organisations = await collection<OrganisationDocument>(MongoCollections.Organisations).find({})
    .sort({ name: 1 })
    .toArray();
  return serializeObjectIds(organisations);
}
