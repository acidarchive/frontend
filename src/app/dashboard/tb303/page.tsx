'use client';

import { keepPreviousData } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

import { useListTb303Patterns } from '@/api/generated/acid';
import { PageContainer } from '@/components/layouts/page-container';
import { columns } from '@/components/organisms/data-table';
import { DataTable } from '@/components/organisms/data-table/data-table';
import { Button } from '@/components/ui/button';
import { useDataTableFilters } from '@/hooks/use-data-table-filters';

const LoadingState = ({ message }: { message: string }) => (
  <div className="px-4 sm:px-6 lg:px-8 py-8">
    <div className="flex items-center justify-center h-64">
      <div className="text-gray-500">{message}</div>
    </div>
  </div>
);

const ErrorState = ({ message }: { message: string }) => (
  <div className="px-4 sm:px-6 lg:px-8 py-8">
    <div className="flex items-center justify-center h-64">
      <div className="text-red-500">{message}</div>
    </div>
  </div>
);

function TB303ListPageContent() {
  const { filters, handlers } = useDataTableFilters();
  const { data, isLoading, error } = useListTb303Patterns(
    {
      page_size: filters.pageSize,
      sort_column: filters.sortColumn ?? undefined,
      sort_direction: filters.sortDirection ?? undefined,
      search: filters.search ?? undefined,
      is_public: filters.isPublic ?? undefined,
    },
    {
      query: {
        placeholderData: keepPreviousData,
      },
    },
  );

  if (isLoading && !data) {
    return <LoadingState message="Loading patterns..." />;
  }

  if (error) {
    return <ErrorState message="Error loading patterns" />;
  }

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
          <Link href="/dashboard/tb303/add">
            <Button>
              <Plus className="h-4 w-4" />
              Add Pattern
            </Button>
          </Link>
        </div>
        <DataTable
          columns={columns}
          data={data?.records}
          totalPages={data?.total_pages || 0}
          isLoading={isLoading}
          {...handlers}
          {...filters}
        />
      </div>
    </PageContainer>
  );
}

export default function TB303ListPage() {
  return (
    <Suspense fallback={<LoadingState message="Loading patterns..." />}>
      <TB303ListPageContent />
    </Suspense>
  );
}
