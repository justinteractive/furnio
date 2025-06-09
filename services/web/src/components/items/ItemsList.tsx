import { getClient, InventoryDB } from '@db';

export async function ItemsList() {
  const client = await getClient();
  const items = await client.db(InventoryDB).collection('items').find({}).toArray();
  return (
    <ul className="ml-[auto] mr-[auto] w-[max-content]">
      {items.map((item: any) => <ul key={item.type}>{item.type}</ul>)}
    </ul>
  );
}
