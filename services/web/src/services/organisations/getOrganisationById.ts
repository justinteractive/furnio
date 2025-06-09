import { collection } from '@db/collection';
import { MongoCollections, ObjectId, OrganisationDocument, OrganisationOutput } from '@db/types';
import { serializeObjectIds } from '@db/utils/serializeObjectIds';

export async function getOrganisationById(id: string): Promise<OrganisationOutput | null> {
  try {
    const _id = new ObjectId(id);
    const organisation = await collection<OrganisationDocument>(MongoCollections.Organisations).findOne({ _id });
    if (organisation) return serializeObjectIds(organisation);
  } catch(_) {
    // TODO do something with the error if needed
  }
  return null;
}
