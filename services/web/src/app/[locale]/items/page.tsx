import { Suspense } from 'react';

import { ItemsList } from '@web/components/items/ItemsList';

export default function ItemsPage() {
  return (
    <main className="p-8">
      <Suspense fallback={<div>Loading items...</div>}>
        <ItemsList />
      </Suspense>
    </main>
  );
}
