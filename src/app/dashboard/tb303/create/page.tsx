'use client';

import { useRouter } from 'next/navigation';

import { CreatePattern } from '@/features/pattern-tb303-editor';

export default function CreatePatternPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/dashboard/tb303');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <CreatePattern onSuccess={handleSuccess} />
    </div>
  );
}
