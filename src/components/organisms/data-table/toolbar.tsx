'use client';

import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useDebounce } from 'react-use';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Filter } from './filter';

const SEARCH_DEBOUNCE_DELAY = 300;

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

interface ToolbarProps<TData> {
  table: Table<TData>;
  isLoading?: boolean;
}

export function Toolbar<TData>({ table, isLoading }: ToolbarProps<TData>) {
  const isDisabled = isLoading;
  const tableState = table.getState();
  const visibilityColumn = table.getColumn('is_public');
  const nameColumn = table.getColumn('name');

  const [searchInput, setSearchInput] = useState(
    (nameColumn?.getFilterValue() as string) ?? '',
  );

  const visibilityFilter = visibilityColumn?.getFilterValue() as
    | boolean
    | undefined;
  const hasColumnFilters = tableState.columnFilters.length > 0;
  const isFiltered = hasColumnFilters;

  useDebounce(
    () => {
      nameColumn?.setFilterValue(searchInput || undefined);
    },
    SEARCH_DEBOUNCE_DELAY,
    [searchInput, nameColumn],
  );

  const handleReset = useCallback(() => {
    setSearchInput('');
    table.resetColumnFilters();
  }, [table]);

  const handleVisibilityChange = useCallback(
    (value?: boolean) => {
      visibilityColumn?.setFilterValue(value);
    },
    [visibilityColumn],
  );

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(event.target.value);
    },
    [],
  );

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder="Search by pattern name..."
          value={searchInput}
          onChange={handleSearchChange}
          className="h-8 w-[150px] lg:w-[250px]"
          disabled={isDisabled}
        />

        {visibilityColumn && (
          <Filter
            title="Visibility"
            options={visibilities}
            value={visibilityFilter}
            onValueChange={handleVisibilityChange}
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
