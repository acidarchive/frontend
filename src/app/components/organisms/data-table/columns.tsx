'use client';

import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { PaginatedResponseTB303PatternSummaryRecordsItem } from '@/api/generated/model';

dayjs.extend(relativeTime);
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';

export const columns: ColumnDef<PaginatedResponseTB303PatternSummaryRecordsItem>[] =
  [
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
      size: 40,
    },
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" justify="start" />
      ),
      cell: ({ row }) => (
        <div className="font-medium truncate min-w-0">
          {row.getValue('name')}
        </div>
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
        <DataTableColumnHeader column={column} title="Updated" justify="end" />
      ),
      cell: ({ row }) => (
        <div className="text-right text-muted-foreground whitespace-nowrap pr-4">
          {dayjs(row.getValue('updated_at')).fromNow()}
        </div>
      ),
      size: 160,
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <div className="text-center">
          <DataTableRowActions id={row.original.pattern_id} />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
      size: 70,
    },
  ];
