import { Suspense } from 'react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { listOrganisations } from '@web/services/organisations/listOrganisations';

import { OrganisationSelect } from './OrganisationSelect';

export async function MainMenu() {
  const organisations = await listOrganisations();
  const t = await getTranslations('MainMenu');

  return (
    <aside className="w-2xs h-full flex flex-col justify-between p-4 border-r-[1px]">
      <header>
        <OrganisationSelect organisations={organisations} />
        <nav>
          <ul className="px-8 pt-8">
            <li className="p-2">
              <Link href="/" className="hover:underline">{t('items.dashboard')}</Link>
            </li>
            <li className="p-2">
              <Link href="/properties" className="hover:underline">{t('items.properties')}</Link>
            </li>
            <li className="p-2">
              <Link href="/items" className="hover:underline">{t('items.items')}</Link>
            </li>
            {/* <li className="p-2">{t('items.lists')}</li>
            <li className="p-2">{t('items.people')}</li>
            <li className="p-2">{t('items.search')}</li> */}
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