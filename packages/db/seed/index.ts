import { collection, connect, MongoCollections } from '../lib';

import { organisations, properties, rooms } from './data';

async function main(): Promise<void> {
  await connect();
  await Promise.all([
    collection(MongoCollections.Organisations).insertMany(organisations),
    collection(MongoCollections.Properties).insertMany(properties),
    collection(MongoCollections.Rooms).insertMany(rooms),
  ]);
  console.log('Seed data loaded successfully!');
  process.exit();
}

main();
