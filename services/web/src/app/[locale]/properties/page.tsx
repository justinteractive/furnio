import { listProperties } from '@web/services/items/listItems';
import Link from 'next/link';

export default async function PropertyListPage() {
  const properties = await listProperties();

  return (
    <main className="p-8">
      <p>Properties:</p>
      <ul>
        {properties.map(property => (
          <li key={property._id}>
            <Link href={`/properties/${property._id}`} className="underline block p-2">{property.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
