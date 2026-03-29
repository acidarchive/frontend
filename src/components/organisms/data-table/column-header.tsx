import { Column } from '@tanstack/react-table';

import { Icons } from '@/components/atoms/icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const justifyClasses = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
} as const;

type Justify = keyof typeof justifyClasses;

interface DataTableColumnHeaderProps<
  TData,
  TValue,
> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  justify?: Justify;
}

export function ColumnHeader<TData, TValue>({
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
    if (isDescending) return <Icons.ChevronDown className="size-4" />;
    if (isAscending) return <Icons.ChevronUp className="size-4" />;
    return <Icons.ChevronsVertical className="size-4" />;
  };

  if (!canSort) {
    return (
      <div
        className={cn('flex items-center', justifyClasses[justify], className)}
      >
        {title}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex items-center gap-2',
        justifyClasses[justify],
        className,
      )}
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
            <Icons.ChevronUp className="size-4" />
            <span>Asc</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleSortDescending}
            className="flex items-center gap-2"
          >
            <Icons.ChevronDown className="size-4" />
            <span>Desc</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
