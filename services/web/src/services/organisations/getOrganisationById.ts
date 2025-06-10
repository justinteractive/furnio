import { Collections, OrganisationOutput } from '@db/types';
import { getDocumentById } from '@db/utils/getDocumentById';

export function getOrganisationById(id: string): Promise<OrganisationOutput | null> {
  return getDocumentById<OrganisationOutput>(Collections.Organisations, id);
}
