import { Suspense } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

type PropertyDetailsPageProps = Readonly<{
  params: Promise<{ id: string; }>;
}>;

export default function PropertyDetailsPage({ params }: PropertyDetailsPageProps) {
  const t = useTranslations('PropertyDetailsPage');

  return (
    <main className="p-8">
      <p>PropertyDetailsPage</p>
      <Suspense fallback="Loading details...">
        <PropertyDetailsLoader params={params} />
      </Suspense>
    </main>
  );
}

async function PropertyDetailsLoader({ params }: { params: Promise<{ id: string; }> }) {
  const { id } = await params;

  return (
    <Link href={`/properties/${id}/items`}>items</Link>
  );
}
