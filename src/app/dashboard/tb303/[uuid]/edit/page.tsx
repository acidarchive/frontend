'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { Icons } from '@/components/atoms/icons';
import { PageContainer } from '@/components/layouts/page-container';
import { PatternTB303Form } from '@/components/organisms/pattern-tb303-form';
import { Button } from '@/components/ui/button';
const ErrorState = ({ message }: { message: string }) => (
  <div className="px-4 sm:px-6 lg:px-8 py-8">
    <div className="flex items-center justify-center h-64">
      <div className="text-red-500">{message}</div>
    </div>
  </div>
);

export default function TB303EditPage() {
  const params = useParams();
  const uuid = params.uuid as string;

  if (!uuid) {
    return <ErrorState message="Pattern UUID is required" />;
  }

  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col gap-8 max-w-8xl mx-auto">
        <div className="flex items-start justify-between gap-2 max-w-7xl">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              Edit TB-303 Pattern
            </h2>
            <p className="text-muted-foreground">
              You can edit your TB-303 pattern here.
            </p>
          </div>
          <Link href={`/dashboard/tb303`} passHref>
            <Button>
              <Icons.chevronLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
        </div>
        <PatternTB303Form editPatternId={uuid} />
      </div>
    </PageContainer>
  );
}
