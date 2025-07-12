'use client';

import type { ColumnDef, SortingState, Updater } from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Key } from 'react';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useDataTableFilters } from '@/hooks/use-data-table-filters';

import { DataTablePagination } from './data-table-pagination';
import { DataTableToolbar } from './data-table-toolbar';

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data?: TData[];
  totalPages?: number;
  isLoading?: boolean;
}

const DEFAULT_VALUES = {
  data: [],
  totalPages: 1,
  currentPage: 1,
  pageSize: 10,
  isLoading: false,
};

const getCellStyle = (size: number) => ({
  width: size === 0 ? 'auto' : `${size}px`,
});

const getColumnKey = <TData, TValue>(
  column: ColumnDef<TData, TValue>,
  index: number,
): Key => {
  if ('id' in column && column.id) {
    return column.id;
  }
  if ('accessorKey' in column && column.accessorKey) {
    return String(column.accessorKey);
  }
  return index;
};

export function DataTable<TData, TValue>({
  columns,
  data = DEFAULT_VALUES.data,
  totalPages = DEFAULT_VALUES.totalPages,
  isLoading = DEFAULT_VALUES.isLoading,
}: DataTableProps<TData, TValue>) {
  const { filters, handlers } = useDataTableFilters();

  const createSortingState = () => {
    return filters.sortColumn
      ? [
          {
            id: filters.sortColumn,
            desc: filters.sortDirection === 'descending',
          },
        ]
      : [];
  };

  const handleSortingChange = (updater: Updater<SortingState>) => {
    if (typeof updater === 'function') {
      const currentSorting = createSortingState();
      const newSorting = updater(currentSorting);

      if (newSorting.length > 0 && handlers.onSortChange) {
        const { id, desc } = newSorting[0];
        handlers.onSortChange(id, desc ? 'descending' : 'ascending');
      }
    } else if (
      Array.isArray(updater) &&
      updater.length > 0 &&
      handlers.onSortChange
    ) {
      const { id, desc } = updater[0];
      handlers.onSortChange(id, desc ? 'descending' : 'ascending');
    }
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    pageCount: totalPages,
    state: {
      sorting: createSortingState(),
    },
    onSortingChange: handleSortingChange,
  });

  const renderTableHeader = () => (
    <TableHeader>
      {table.getHeaderGroups().map(headerGroup => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map(header => {
            const size = header.column.getSize();
            return (
              <TableHead key={header.id} style={getCellStyle(size)}>
                {header.isPlaceholder
                  ? undefined
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );

  const renderTableRows = () => {
    if (isLoading) {
      return Array.from({ length: filters.pageSize }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {columns.map((column, colIndex) => (
            <TableCell
              key={getColumnKey(column, colIndex)}
              style={getCellStyle(column.size ?? 0)}
            >
              <Skeleton className="h-5 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ));
    }
    const rows = table.getRowModel().rows;

    if (!rows?.length) {
      return (
        <TableRow>
          <TableCell colSpan={columns.length} className="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>
      );
    }

    return rows.map(row => (
      <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
        {row.getVisibleCells().map(cell => {
          const size = cell.column.getSize();
          return (
            <TableCell key={cell.id} style={getCellStyle(size)}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          );
        })}
      </TableRow>
    ));
  };

  return (
    <div className="flex flex-1 flex-col space-y-4">
      <DataTableToolbar table={table} isLoading={isLoading} />
      <div className="relative flex flex-1">
        <div className="absolute inset-0 flex overflow-hidden rounded-lg border">
          <ScrollArea className="h-full w-full">
            <Table>
              {renderTableHeader()}
              <TableBody>{renderTableRows()}</TableBody>
            </Table>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
      <DataTablePagination
        table={table}
        totalPages={totalPages}
        isLoading={isLoading}
      />
    </div>
  );
}
