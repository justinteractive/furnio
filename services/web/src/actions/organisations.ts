'use server';

import { getClient, InventoryDB } from '@furnio/db';
import { revalidatePath } from 'next/cache';

export async function createOrganisation(prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;

  try {

    if (!name) {
      return { message: 'Name is required' };
    }

    const client = await getClient();
    const db = client.db(InventoryDB);
    
    await db.collection('properties').insertOne({
      name,
      description,
      createdAt: new Date(),
    });

    await client.close();
    revalidatePath('/[locale]/items');
    
    return { message: 'Item created successfully' };
  } catch (error) {
    console.error('Error creating item:', error);
    return { message: 'Failed to create item' };
  }
}
