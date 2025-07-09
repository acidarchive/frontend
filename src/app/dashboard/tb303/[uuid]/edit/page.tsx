'use client';

import { useParams } from 'next/navigation';

import { PageContainer } from '@/components/layouts/page-container';
import { PatternTB303Form } from '@/components/organisms/pattern-tb303-form';

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
    <PageContainer>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Edit TB303 Pattern</h1>
          <p className="text-gray-600">Pattern ID: {uuid}</p>
        </div>

        <PatternTB303Form editPatternId={uuid} />
      </div>
    </PageContainer>
  );
}
