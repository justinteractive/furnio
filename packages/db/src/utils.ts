import { ObjectId } from 'mongodb';

import { MongoDocument, Item } from './types';

export function createMongoDocument<T extends MongoDocument>(props: Partial<T>): T {
  return {
    ...props,
    _id: props._id ?? new ObjectId(),
    createdAt: props.createdAt ?? new Date(),
    updatedAt: props.updatedAt ?? new Date(),
  } as T;
}
