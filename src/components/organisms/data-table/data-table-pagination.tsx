import { Table } from '@tanstack/react-table';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useDataTableFilters } from '@/hooks/use-data-table-filters';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  totalPages: number;
  isLoading?: boolean;
}

export function DataTablePagination<TData>({
  table,
  totalPages,
  isLoading = false,
}: DataTablePaginationProps<TData>) {
  const { filters, handlers } = useDataTableFilters();
  const { page: currentPage, pageSize } = filters;
  const { onPageChange, onPageSizeChange } = handlers;
  const selectedRowsCount = table.getFilteredSelectedRowModel().rows.length;
  const filteredRowsCount = table.getFilteredRowModel().rows.length;
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage >= totalPages;
  const isDisabled = isLoading;

  const handlePageChange = (page: number) => {
    if (!isDisabled && page >= 1 && page <= totalPages) {
      onPageChange?.(page);
    }
  };

  const handlePageSizeChange = (newPageSize: string) => {
    if (!isDisabled) {
      onPageSizeChange?.(Number(newPageSize));
    }
  };

  const handleFirstPage = () => handlePageChange(1);
  const handlePreviousPage = () => handlePageChange(currentPage - 1);
  const handleNextPage = () => handlePageChange(currentPage + 1);
  const handleLastPage = () => handlePageChange(totalPages);

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {selectedRowsCount} of {filteredRowsCount} row(s) selected.
      </div>

      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={String(pageSize)}
            onValueChange={handlePageSizeChange}
            disabled={isDisabled}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={String(pageSize)} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30].map(pageSizeOption => (
                <SelectItem key={pageSizeOption} value={String(pageSizeOption)}>
                  {pageSizeOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {currentPage} of {totalPages}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={handleFirstPage}
            disabled={isFirstPage || isDisabled}
            aria-label="Go to first page"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={handlePreviousPage}
            disabled={isFirstPage || isDisabled}
            aria-label="Go to previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={handleNextPage}
            disabled={isLastPage || isDisabled}
            aria-label="Go to next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={handleLastPage}
            disabled={isLastPage || isDisabled}
            aria-label="Go to last page"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
