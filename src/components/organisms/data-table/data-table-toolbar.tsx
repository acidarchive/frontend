'use client';

import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'react-use';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDataTableFilters } from '@/hooks/use-data-table-filters';

import { DataTableFilter } from './data-table-filter';

const SEARCH_DEBOUNCE_DELAY = 500;
const MIN_SEARCH_LENGTH = 3;

export const visibilities = [
  {
    value: true,
    label: 'Public',
  },
  {
    value: false,
    label: 'Private',
  },
];

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  isLoading?: boolean;
  onDataChange?: () => void;
}

export function DataTableToolbar<TData>({
  table,
  isLoading,
  onDataChange,
}: DataTableToolbarProps<TData>) {
  const { filters, handlers } = useDataTableFilters({ onDataChange });
  const isDisabled = isLoading;
  const [searchInput, setSearchInput] = useState(filters.search || '');

  useDebounce(
    () => {
      if (searchInput.length >= MIN_SEARCH_LENGTH || searchInput.length === 0) {
        handlers.onSearchChange(searchInput);
      }
    },
    SEARCH_DEBOUNCE_DELAY,
    [searchInput],
  );

  useEffect(() => {
    setSearchInput(filters.search || '');
  }, [filters.search]);

  const tableState = table.getState();
  const visibilityColumn = table.getColumn('is_public');

  const hasColumnFilters = tableState.columnFilters.length > 0;
  const hasSearchFilter = Boolean(filters.search);
  const hasVisibilityFilter = filters.isPublic !== undefined;
  const isFiltered = hasColumnFilters || hasSearchFilter || hasVisibilityFilter;

  const handleReset = useCallback(() => {
    setSearchInput('');
    table.resetColumnFilters();
    handlers.onResetFilters();
  }, [setSearchInput, table, handlers]);

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(event.target.value);
    },
    [setSearchInput],
  );

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder="Search patterns (min 3 chars)..."
          value={searchInput}
          onChange={handleSearchChange}
          className="h-8 w-[150px] lg:w-[250px]"
          disabled={isDisabled}
        />

        {visibilityColumn && (
          <DataTableFilter
            title="Visibility"
            options={visibilities}
            value={filters.isPublic}
            onValueChange={handlers.onVisibilityChange}
            disabled={isDisabled}
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            disabled={isDisabled}
          >
            Reset
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
