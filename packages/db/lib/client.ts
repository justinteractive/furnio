import { MongoClient } from 'mongodb';

import { MongoDBUri } from './constants';

export const client = new MongoClient(MongoDBUri);
