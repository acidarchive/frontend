'use client';

import type { SortingState, Updater } from '@tanstack/react-table';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { DataTablePagination } from './data-table-pagination';
import { DataTableToolbar } from './data-table-toolbar';
type SortDirection = 'ascending' | 'descending';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data?: TData[];
  totalPages?: number;
  currentPage?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  isLoading?: boolean;
  sortColumn?: string;
  sortDirection?: SortDirection;
  onSortChange?: (column: string, direction: SortDirection) => void;
  searchValue?: string;
  onSearchChange?: (search: string) => void;
  onResetFilters?: () => void;
  visibilityValue?: boolean;
  onVisibilityChange?: (visibility?: boolean) => void;
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

export function DataTable<TData, TValue>({
  columns,
  data = DEFAULT_VALUES.data,
  totalPages = DEFAULT_VALUES.totalPages,
  currentPage = DEFAULT_VALUES.currentPage,
  pageSize = DEFAULT_VALUES.pageSize,
  onPageChange,
  onPageSizeChange,
  isLoading = DEFAULT_VALUES.isLoading,
  sortColumn,
  sortDirection,
  onSortChange,
  searchValue,
  onSearchChange,
  onResetFilters,
  visibilityValue,
  onVisibilityChange,
}: DataTableProps<TData, TValue>) {
  const createSortingState = () => {
    return sortColumn
      ? [{ id: sortColumn, desc: sortDirection === 'descending' }]
      : [];
  };

  const handleSortingChange = (updater: Updater<SortingState>) => {
    if (typeof updater === 'function') {
      const currentSorting = createSortingState();
      const newSorting = updater(currentSorting);

      if (newSorting.length > 0 && onSortChange) {
        const { id, desc } = newSorting[0];
        onSortChange(id, desc ? 'descending' : 'ascending');
      }
    } else if (Array.isArray(updater) && updater.length > 0 && onSortChange) {
      const { id, desc } = updater[0];
      onSortChange(id, desc ? 'descending' : 'ascending');
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
    <div className="flex flex-col gap-4">
      <DataTableToolbar
        table={table}
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        onResetFilters={onResetFilters}
        visibilityValue={visibilityValue}
        onVisibilityChange={onVisibilityChange}
      />
      <div className="rounded-md border">
        <Table className="w-full table-fixed">
          {renderTableHeader()}
          <TableBody>{renderTableRows()}</TableBody>
        </Table>
      </div>
      <DataTablePagination
        table={table}
        totalPages={totalPages}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        isLoading={isLoading}
      />
    </div>
  );
}
