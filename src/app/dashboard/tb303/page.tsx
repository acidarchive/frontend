import type { Metadata } from 'next';
import Link from 'next/link';

import { Icons } from '@/components/atoms/icons';
import { Button } from '@/components/ui/button';
import { PatternTB303List } from '@/features/pattern-tb303-list';

export const metadata: Metadata = {
  title: 'TB-303 Patterns',
  description: 'A list of all your TB-303 patterns.',
};

export default function TB303ListPage() {
  return (
    <div className="flex flex-1 flex-col gap-8 p-4 md:px-6">
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            TB-303 Patterns
          </h1>
          <p className="text-muted-foreground">
            A list of all your TB-303 patterns.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/tb303/create">
            <Icons.Plus className="size-4" aria-hidden="true" />
            Create Pattern
          </Link>
        </Button>
      </div>

      <PatternTB303List />
    </div>
  );
}
