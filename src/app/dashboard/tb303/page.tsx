import { Plus } from 'lucide-react';
import Link from 'next/link';

import { PageContainer } from '@/components/layouts/page-container';
import { Button } from '@/components/ui/button';
import { PatternTB303List } from '@/features/pattern-tb303-list';

export default function TB303ListPage() {
  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col gap-8">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              TB-303 Patterns
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of the tb-303 patterns you have created.
            </p>
          </div>
          <Link href="/dashboard/tb303/create">
            <Button>
              <Plus className="h-4 w-4" />
              Create Pattern
            </Button>
          </Link>
        </div>

        <PatternTB303List />
      </div>
    </PageContainer>
  );
}
