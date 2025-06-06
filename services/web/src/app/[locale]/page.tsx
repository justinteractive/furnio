import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function App() {
  const t = useTranslations('HomePage');

  return (
    <main className="p-8">
      <ul className="ml-[auto] mr-[auto] w-[max-content]">
        <li>
          <Link href="/items" className="underline">{t('items')}</Link>
        </li>
      </ul>
    </main>
  );
}
