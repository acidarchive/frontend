'use client';

import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from 'react-use';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onResetFilters?: () => void;
  visibilityValue?: boolean;
  onVisibilityChange?: (visibility?: boolean) => void;
}

function useSearchInput(
  initialValue: string,
  onSearchChange?: (value: string) => void,
) {
  const [searchInput, setSearchInput] = useState(initialValue);

  useDebounce(
    () => {
      if (onSearchChange && searchInput !== initialValue) {
        const shouldSearch =
          searchInput.length >= MIN_SEARCH_LENGTH || searchInput.length === 0;

        if (shouldSearch) {
          onSearchChange(searchInput);
        }
      }
    },
    SEARCH_DEBOUNCE_DELAY,
    [searchInput],
  );

  useEffect(() => {
    setSearchInput(initialValue);
  }, [initialValue]);

  return {
    searchInput,
    setSearchInput,
  };
}

export function DataTableToolbar<TData>({
  table,
  searchValue = '',
  onSearchChange,
  onResetFilters,
  visibilityValue,
  onVisibilityChange,
}: DataTableToolbarProps<TData>) {
  const { searchInput, setSearchInput } = useSearchInput(
    searchValue,
    onSearchChange,
  );

  const tableState = table.getState();
  const visibilityColumn = table.getColumn('is_public');

  const hasColumnFilters = tableState.columnFilters.length > 0;
  const hasSearchFilter = Boolean(searchValue);
  const hasVisibilityFilter = visibilityValue !== undefined;
  const isFiltered = hasColumnFilters || hasSearchFilter || hasVisibilityFilter;

  const handleReset = useCallback(() => {
    setSearchInput('');
    table.resetColumnFilters();
    onResetFilters?.();
  }, [setSearchInput, table, onResetFilters]);

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
        />

        {visibilityColumn && (
          <DataTableFilter
            title="Visibility"
            options={visibilities}
            value={visibilityValue}
            onValueChange={onVisibilityChange}
          />
        )}

        {isFiltered && (
          <Button variant="ghost" size="sm" onClick={handleReset}>
            Reset
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Link href="/dashboard/tb303/add">
          <Button size="sm">Add Pattern</Button>
        </Link>
      </div>
    </div>
  );
}
