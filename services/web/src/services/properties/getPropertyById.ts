import { Collections, PropertyOutput } from '@db/types';
import { getDocumentById } from '@db/utils/getDocumentById';

export function getPropertyById(id: string): Promise<PropertyOutput | null> {
  return getDocumentById<PropertyOutput>(Collections.Properties, id);
}
