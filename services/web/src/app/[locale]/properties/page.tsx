import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function PropertyListPage() {
  const t = useTranslations('PropertyListPage');

  return (
    <main className="p-8">
      <p>PropertyListPage</p>
      <ul>
        <li>
          <Link href="/properties/my_property">my_property</Link>
        </li>
      </ul>
    </main>
  );
}
