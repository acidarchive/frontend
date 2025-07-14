'use client';

import { Pencil } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { PageContainer } from '@/components/layouts/page-container';
import { PatternTB303View } from '@/components/organisms/pattern-tb303-view';
import { Button } from '@/components/ui/button';

export default function ViewTB303PatternPage() {
  const params = useParams();
  const uuid = params.uuid as string;

  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col gap-8 max-w-8xl mx-auto">
        <div className="flex items-start justify-between gap-2 max-w-7xl">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              View TB-303 Pattern
            </h2>
            <p className="text-muted-foreground">
              You can view your TB-303 pattern here .
            </p>
          </div>
          <Link href={`/dashboard/tb303/${uuid}/edit`}>
            <Button>
              <Pencil className="h-4 w-4" />
              Edit
            </Button>
          </Link>
        </div>
        <PatternTB303View patternId={uuid} />
      </div>
    </PageContainer>
  );
}
