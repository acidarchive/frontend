'use client';

import { keepPreviousData } from '@tanstack/react-query';
import { Suspense } from 'react';

import { useListTb303Patterns } from '@/api/generated/acid';
import { PageContainer } from '@/components/layouts/page-container';
import { columns } from '@/components/organisms/data-table';
import { DataTable } from '@/components/organisms/data-table/data-table';
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
      <DataTable
        columns={columns}
        data={data?.records}
        totalPages={data?.total_pages || 0}
        isLoading={isLoading}
        {...handlers}
        {...filters}
      />
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
