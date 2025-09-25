import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { formatRelativeTime } from '@/lib/date';
import { TB303PatternSummary } from '@/types/api';

import { ColumnHeader } from './column-header';
import { RowActions } from './row-actions';

export const columns: ColumnDef<TB303PatternSummary>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
    size: 45,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <ColumnHeader column={column} title="Name" justify="start" />
    ),
    cell: ({ row }) => (
      <Link
        className="hover:underline underline-offset-4 font-medium truncate min-w-0"
        href={`/dashboard/tb303/view/${row.original.pattern_id}`}
      >
        {row.getValue('name')}
      </Link>
    ),
    size: 0,
    minSize: 0,
  },
  {
    accessorKey: 'is_public',
    header: ({}) => <div className="flex justify-center">Visibility</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {row.getValue('is_public') ? (
          <Badge>Public</Badge>
        ) : (
          <Badge variant="outline">Private</Badge>
        )}
      </div>
    ),
    size: 80,
  },
  {
    accessorKey: 'updated_at',
    header: ({ column }) => (
      <ColumnHeader column={column} title="Updated" justify="end" />
    ),
    cell: ({ row }) => (
      <div className="text-right text-muted-foreground whitespace-nowrap pr-4">
        {formatRelativeTime(row.getValue('updated_at'))}
      </div>
    ),
    size: 160,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const id = row.original.pattern_id;
      const name = row.original.name;
      return (
        <div className="text-center">
          <RowActions
            editLink={`/dashboard/tb303/edit/${id}`}
            patternId={id}
            patternName={name}
          />
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
    size: 70,
  },
];
