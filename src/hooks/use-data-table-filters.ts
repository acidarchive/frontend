/* eslint-disable unicorn/no-null */
import {
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from 'nuqs';
import { useCallback } from 'react';

const SORT_DIRECTIONS = ['ascending', 'descending'] as const;
export type SortDirection = (typeof SORT_DIRECTIONS)[number];

const filterParsers = {
  page: parseAsInteger.withDefault(1),
  page_size: parseAsInteger.withDefault(10),
  sort_column: parseAsString,
  sort_direction: parseAsStringEnum([...SORT_DIRECTIONS]),
  search: parseAsString,
  is_public: parseAsBoolean,
};

export function useDataTableFilters() {
  const [filters, setFilters] = useQueryStates(filterParsers, {
    history: 'replace',
    shallow: true,
    scroll: false,
  });

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
      setFilters({
        page: 1,
        is_public: is_public === undefined ? undefined : is_public,
      });
    },
    [setFilters],
  );

  const handleResetFilters = useCallback(() => {
    setFilters({
      page: 1,
      page_size: 10,
      sort_column: null,
      sort_direction: null,
      search: null,
      is_public: null,
    });
  }, [setFilters]);

  return {
    filters: {
      page: filters.page,
      pageSize: filters.page_size,
      sortColumn: filters.sort_column ?? undefined,
      sortDirection: filters.sort_direction ?? undefined,
      search: filters.search ?? undefined,
      isPublic: filters.is_public ?? undefined,
    },
    handlers: {
      onPageChange: handlePageChange,
      onPageSizeChange: handlePageSizeChange,
      onSortChange: handleSortChange,
      onSearchChange: handleSearchChange,
      onVisibilityChange: handleVisibilityChange,
      onResetFilters: handleResetFilters,
    },
  };
}
