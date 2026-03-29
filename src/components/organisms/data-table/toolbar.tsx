'use client';

import { Table } from '@tanstack/react-table';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { useDebounce } from 'react-use';

import { Icons } from '@/components/atoms/icons';
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
  const visibilityColumn = table.getColumn('is_public');
  const nameColumn = table.getColumn('name');

  const [searchInput, setSearchInput] = useState(
    (nameColumn?.getFilterValue() as string) ?? '',
  );

  const visibilityFilter = visibilityColumn?.getFilterValue() as
    | boolean
    | undefined;
  const isFiltered = table.getState().columnFilters.length > 0;

  useDebounce(
    () => {
      nameColumn?.setFilterValue(searchInput || undefined);
    },
    SEARCH_DEBOUNCE_DELAY,
    [searchInput, nameColumn],
  );

  const handleReset = () => {
    setSearchInput('');
    table.resetColumnFilters();
  };

  const handleVisibilityChange = (value?: boolean) => {
    visibilityColumn?.setFilterValue(value);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder="Search by pattern name..."
          value={searchInput}
          onChange={handleSearchChange}
          className="h-8 w-37.5 lg:w-62.5"
          disabled={isLoading}
        />

        {visibilityColumn && (
          <Filter
            title="Visibility"
            options={visibilities}
            value={visibilityFilter}
            onValueChange={handleVisibilityChange}
            disabled={isLoading}
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            disabled={isLoading}
          >
            Reset <Icons.XIcon />
          </Button>
        )}
      </div>
    </div>
  );
}
