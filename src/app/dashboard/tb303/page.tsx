'use client';

import { keepPreviousData } from '@tanstack/react-query';
import {
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from 'nuqs';
import { useCallback } from 'react';

import { useListTb303Patterns } from '@/api/generated/acid';
import { columns, DataTable } from '@/app/components/organisms/data-table';

const SORT_DIRECTIONS = ['ascending', 'descending'] as const;
type SortDirection = (typeof SORT_DIRECTIONS)[number];

const filterParsers = {
  page: parseAsInteger.withDefault(1),
  page_size: parseAsInteger.withDefault(10),
  sort_column: parseAsString,
  sort_direction: parseAsStringEnum([...SORT_DIRECTIONS]),
  search: parseAsString,
  is_public: parseAsBoolean,
};

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

export default function TB303ListPage() {
  const [filters, setFilters] = useQueryStates(filterParsers, {
    history: 'replace',
    shallow: true,
    scroll: false,
  });

  const { data, isLoading, error } = useListTb303Patterns(
    {
      page: filters.page,
      page_size: filters.page_size,
      sort_column: filters.sort_column ?? undefined,
      sort_direction: filters.sort_direction ?? undefined,
      search: filters.search ?? undefined,
      is_public: filters.is_public ?? undefined,
    },
    {
      query: {
        placeholderData: keepPreviousData,
      },
    },
  );

  const handlePageChange = useCallback(
    (page: number) => {
      setFilters({ page });
    },
    [setFilters],
  );

  const handlePageSizeChange = useCallback(
    (page_size: number) => {
      setFilters({ page: 1, page_size });
    },
    [setFilters],
  );

  const handleSortChange = useCallback(
    (sort_column: string, sort_direction: SortDirection) => {
      setFilters({ page: 1, sort_column, sort_direction });
    },
    [setFilters],
  );

  const handleSearchChange = useCallback(
    (search: string) => {
      setFilters({ page: 1, search: search || undefined });
    },
    [setFilters],
  );

  const handleVisibilityChange = useCallback(
    (is_public?: boolean) => {
      setFilters({ page: 1, is_public: is_public ?? undefined });
    },
    [setFilters],
  );

  const handleResetFilters = useCallback(() => {
    setFilters({
      page: 1,
      page_size: 10,
      // eslint-disable-next-line unicorn/no-null
      sort_column: null,
      // eslint-disable-next-line unicorn/no-null
      sort_direction: null,
      // eslint-disable-next-line unicorn/no-null
      search: null,
      // eslint-disable-next-line unicorn/no-null
      is_public: null,
    });
  }, [setFilters]);

  if (isLoading && !data) {
    return <LoadingState message="Loading patterns..." />;
  }

  if (error) {
    return <ErrorState message="Error loading patterns" />;
  }

  return (
    <div className="flow-root">
      <div className="h-full flex-1 flex-col gap-8 p-8 md:flex">
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold tracking-tight">
                TB-303 Patterns
              </h2>
              {isLoading && (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></div>
              )}
            </div>
            <p className="text-muted-foreground">
              Here&apos;s a list of all the TB-303 patterns you have created.
            </p>
          </div>
          <div className="flex items-center gap-2"></div>
        </div>
        <div
          className={`relative ${isLoading ? 'opacity-75 pointer-events-none' : ''}`}
        >
          <DataTable
            columns={columns}
            data={data?.records}
            totalPages={data?.total_pages || 0}
            currentPage={filters.page}
            pageSize={filters.page_size}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            isLoading={isLoading}
            sortColumn={filters.sort_column ?? undefined}
            sortDirection={filters.sort_direction ?? undefined}
            onSortChange={handleSortChange}
            searchValue={filters.search ?? undefined}
            onSearchChange={handleSearchChange}
            onResetFilters={handleResetFilters}
            visibilityValue={filters.is_public ?? undefined}
            onVisibilityChange={handleVisibilityChange}
          />
        </div>
      </div>
    </div>
  );
}
