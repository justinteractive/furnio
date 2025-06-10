import { connect, collection, Collections, InventoryDatabase } from '../lib';

import { organisations, properties, rooms } from './data';

async function main(): Promise<void> {
  const client = connect();
  const session = client.startSession();
  const options = { session };

  try {
    session.startTransaction();
    
    await client.db(InventoryDatabase).collection(Collections.Organisations)
      .insertMany(organisations, options);
    await client.db(InventoryDatabase).collection(Collections.Properties)
      .insertMany(properties, options);
    await client.db(InventoryDatabase).collection(Collections.Rooms)
      .insertMany(rooms, options);

    await session.commitTransaction();

    console.log('Seed data loaded successfully!');
  } catch(_) {
    await session.abortTransaction();
  } finally {
    await session.endSession();
    await client.close();
  }
}

main();
