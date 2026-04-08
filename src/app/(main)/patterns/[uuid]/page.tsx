import Link from 'next/link';

import { fetchPatternTB303Server } from '@/dal';
import { ViewPublicPattern } from '@/features/view-public-pattern';
import { fetchOrNotFound } from '@/lib/errors/not-found';

interface PublicPatternPageProps {
  params: Promise<{ uuid: string }>;
}
export default async function PublicPatternPage({
  params,
}: PublicPatternPageProps) {
  const { uuid } = await params;
  const pattern = await fetchOrNotFound(() => fetchPatternTB303Server(uuid));

  return (
    <div>
      <div className="p-4 mb-8 border-b">
        <Link href="/">&lt; Back</Link>
      </div>
      <div className="flex flex-row justify-center">
        <div className="w-3xl">
          <ViewPublicPattern pattern={pattern} />
        </div>
      </div>
    </div>
  );
}
