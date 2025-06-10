import { notFound } from 'next/navigation';

import { getPropertyById } from '@web/services/properties/getPropertyById';

export type PropertyDetailsPageProps = Readonly<{
  params: Promise<{
    id: string;
  }>;
}>;
export default async function PropertyDetailsPage({ params }: PropertyDetailsPageProps) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    notFound();
  }

  return (
    <main className="p-8">
      <p>Ze Property Details page: {property.name}</p>
    </main>
  );
}
