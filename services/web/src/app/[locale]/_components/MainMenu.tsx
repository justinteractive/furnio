'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Select from 'react-select';

type Option = {
  value: string;
  label: string;
};

export function MainMenu() {
  const t = useTranslations('MainMenu');
  const options: Option[] = [
    { value: 'organisation', label: 'My Organisation' }
  ];

  return (
    <aside className="w-2xs h-full flex flex-col justify-between p-4 border-r-[1px]">
      <header>
        <form className="text-center">
          <Select<Option>
                  placeholder="Organisations..."
                  options={options}
                  defaultValue={options[0]}
                  isSearchable={false}
                  name="organisation" />
        </form>
        <nav>
          <ul className="px-8 pt-8">
            <li className="p-2">
              <Link href="/" className="hover:underline">{t('items.dashboard')}</Link>
            </li>
            <li className="p-2">{t('items.properties')}</li>
            <li className="p-2">{t('items.items')}</li>
            <li className="p-2">{t('items.lists')}</li>
            <li className="p-2">{t('items.people')}</li>
            <li className="p-2">{t('items.search')}</li>
          </ul>
        </nav>
      </header>
      <footer>
        <nav>
          <ul className="px-8">
            <li className="p-2">{t('items.profile')}</li>
            <li className="p-2">{t('items.settings')}</li>
            <li className="p-2">
              <Link href="/auth/logout" className="hover:underline">{t('items.logout')}</Link>
            </li>
          </ul>
        </nav>
      </footer>
    </aside>
  );
}