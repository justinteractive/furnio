import { Collections, RoomOutput } from '@db/types';
import { getDocumentById } from '@db/utils/getDocumentById';

export function getRoomById(id: string): Promise<RoomOutput | null> {
  return getDocumentById<RoomOutput>(Collections.Rooms, id);
}
