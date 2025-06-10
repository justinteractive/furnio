import { notFound } from 'next/navigation';

import { getOrganisationById } from '@web/services/organisations/getOrganisationById';

export type OrganisationDetailsPageProps = Readonly<{
  params: Promise<{
    id: string;
  }>;
}>;
export default async function OrganisationDetailsPage({ params }: OrganisationDetailsPageProps) {
  const { id } = await params;
  const organisation = await getOrganisationById(id);

  if (!organisation) {
    notFound();
  }

  return (
    <main className="p-8">
      <p>Ze Organisation Details page: {organisation.name}</p>
    </main>
  );
}
