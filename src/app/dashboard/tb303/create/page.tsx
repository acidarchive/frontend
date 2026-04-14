'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Icons } from '@/components/atoms/icons';
import { Button } from '@/components/ui/button';
import { CreatePattern } from '@/features/pattern-tb303-editor';

export default function CreatePatternPage() {
  const router = useRouter();

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
          <CreatePattern onSuccess={handleSuccess} />
        </div>
      </div>
    </div>
  );
}
