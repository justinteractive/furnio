import { Collections, ItemOutput } from '@db/types';
import { getDocumentById } from '@db/utils/getDocumentById';

export function getItemById(id: string): Promise<ItemOutput | null> {
  return getDocumentById<ItemOutput>(Collections.Items, id);
}
