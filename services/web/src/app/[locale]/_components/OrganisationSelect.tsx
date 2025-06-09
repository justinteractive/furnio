'use client';

import { useRouter } from 'next/navigation';
import Select from 'react-select';

import type { OrganisationOutput } from '@db/types';

export type OrganisationSelectProps = Readonly<{
  organisations: Array<OrganisationOutput>;
}>;

export function OrganisationSelect({
  organisations,
}: OrganisationSelectProps) {
  const router = useRouter();
  
  return (
    <article>
      <Select placeholder="My organisations..."
              options={organisations}
              isSearchable={false}
              getOptionLabel={(({ name }) => name)}
              getOptionValue={(({ _id }) => _id)}
              onChange={(organisation) => {
                router.push(`/organisations/${organisation!._id}`);
              }}
              formatOptionLabel={(organisation) => (
                <p className="px-4 py-2">
                  <span className="block font-bold">{organisation.name}</span>
                  <span className="block text-xs">{organisation.domain}</span>
                </p>
              )}
              name="organisation" />
    </article>
  )
}