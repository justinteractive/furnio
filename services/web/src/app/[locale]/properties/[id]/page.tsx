import { Suspense } from 'react';

import { PropertyDetailsLoader } from './_components/PropertyDetailsLoader';

type PropertyDetailsPageProps = Readonly<{
  params: Promise<{ id: string; }>;
}>;

export default function PropertyDetailsPage({ params }: PropertyDetailsPageProps) {
  return (
    <main className="p-8">
      <p>PropertyDetailsPage</p>
      <Suspense fallback="Loading details...">
        <PropertyDetailsLoader params={params} />
      </Suspense>
    </main>
  );
}
