import { useTranslations } from 'next-intl';

import { ItemsList } from '@web/components/items/ItemsList';

export default function PropertyItemsPage() {
  const t = useTranslations('PropertyItemsPage');

  return (
    <main className="p-8">
      <p>PropertyItemsPage</p>
      <ItemsList />
    </main>
  );
}
