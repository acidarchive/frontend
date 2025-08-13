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

export const filterParsers = {
  page: parseAsInteger.withDefault(1),
  page_size: parseAsInteger.withDefault(10),
  sort_column: parseAsString,
  sort_direction: parseAsStringEnum([...SORT_DIRECTIONS]),
  search: parseAsString,
  is_public: parseAsBoolean,
};

interface UseDataTableFiltersOptions {
  onDataChange?: () => void;
}

export function useDataTableFilters(options: UseDataTableFiltersOptions = {}) {
  const { onDataChange } = options;
  const [filters, setFilters] = useQueryStates(filterParsers, {
    history: 'replace',
    shallow: true,
    scroll: false,
  });

  const handlePageChange = useCallback(
    async (page: number) => {
      await setFilters({ page });
      onDataChange?.();
    },
    [setFilters, onDataChange],
  );

  const handlePageSizeChange = useCallback(
    async (page_size: number) => {
      await setFilters({ page: 1, page_size });
      onDataChange?.();
    },
    [setFilters, onDataChange],
  );

  const handleSortChange = useCallback(
    async (sort_column: string, sort_direction: SortDirection) => {
      await setFilters({ page: 1, sort_column, sort_direction });
      onDataChange?.();
    },
    [setFilters, onDataChange],
  );

  const handleSearchChange = useCallback(
    async (search: string) => {
      await setFilters({ page: 1, search: search.trim() || null });
      onDataChange?.();
    },
    [setFilters, onDataChange],
  );

  const handleVisibilityChange = useCallback(
    async (is_public?: boolean) => {
      await setFilters({
        page: 1,
        is_public: is_public === undefined ? undefined : is_public,
      });
      onDataChange?.();
    },
    [setFilters, onDataChange],
  );

  const handleResetFilters = useCallback(async () => {
    await setFilters({
      page: 1,
      page_size: 10,
      sort_column: null,
      sort_direction: null,
      search: null,
      is_public: null,
    });
    onDataChange?.();
  }, [setFilters, onDataChange]);

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
