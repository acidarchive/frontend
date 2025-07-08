import { Column } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ChevronsUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  justify?: 'start' | 'center' | 'end';
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
  justify = 'center',
}: DataTableColumnHeaderProps<TData, TValue>) {
  const canSort = column.getCanSort();
  const sortDirection = column.getIsSorted();
  const isAscending = sortDirection === 'asc';
  const isDescending = sortDirection === 'desc';

  const handleSortAscending = () => column.toggleSorting(false);
  const handleSortDescending = () => column.toggleSorting(true);

  const getSortIcon = () => {
    if (isDescending) return <ArrowDown className="h-4 w-4" />;
    if (isAscending) return <ArrowUp className="h-4 w-4" />;
    return <ChevronsUpDown className="h-4 w-4" />;
  };

  if (!canSort) {
    return (
      <div className={cn(`flex items-center justify-${justify}`, className)}>
        {title}
      </div>
    );
  }

  return (
    <div
      className={cn(`flex items-center gap-2 justify-${justify}`, className)}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
            aria-label={`Sort by ${title}`}
          >
            <span>{title}</span>
            {getSortIcon()}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start">
          <DropdownMenuItem
            onClick={handleSortAscending}
            className="flex items-center gap-2"
          >
            <ArrowUp className="h-4 w-4" />
            <span>Asc</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleSortDescending}
            className="flex items-center gap-2"
          >
            <ArrowDown className="h-4 w-4" />
            <span>Desc</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
