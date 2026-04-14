'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use } from 'react';

import { Icons } from '@/components/atoms/icons';
import { Button } from '@/components/ui/button';
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
    <div>
      <div className="p-4 mb-8 border-b">
        <div className="container mx-auto px-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/tb303">
              <Icons.ChevronLeft /> Back
            </Link>
          </Button>
        </div>
      </div>
      <div className="flex flex-row justify-center">
        <div className="w-3xl">
          <EditPattern patternId={uuid} onSuccess={handleSuccess} />
        </div>
      </div>
    </div>
  );
}
