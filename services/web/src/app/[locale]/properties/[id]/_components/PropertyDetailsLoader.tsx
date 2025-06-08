import Link from 'next/link';

export async function PropertyDetailsLoader({ params }: { params: Promise<{ id: string; }> }) {
  const { id } = await params;

  return (
    <Link href={`/properties/${id}/items`}>items</Link>
  );
}
