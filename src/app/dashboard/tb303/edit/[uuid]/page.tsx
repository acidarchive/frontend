'use client';

import { useRouter } from 'next/navigation';
import { use } from 'react';

import { EditPattern } from '@/features/pattern-tb303-editor';

interface EditPatternPageProps {
  params: Promise<{ uuid: string }>;
}

export default function EditPatternPage({ params }: EditPatternPageProps) {
  const router = useRouter();
  const { uuid } = use(params);

  const handleSuccess = () => {
    router.push('/dashboard/tb303');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <EditPattern patternId={uuid} onSuccess={handleSuccess} />
    </div>
  );
}
