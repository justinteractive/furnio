import { listItems } from '@web/services/items/listItems';

export async function ItemsList() {
  const items = await listItems();
  return (
    <ul className="ml-[auto] mr-[auto] w-[max-content]">
      {items.map((item: any) => <ul key={item.type}>{item.type}</ul>)}
    </ul>
  );
}
