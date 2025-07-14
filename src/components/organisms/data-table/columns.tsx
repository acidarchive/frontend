'use client';
import { useQueryClient } from '@tanstack/react-query';
import { ColumnDef, Row } from '@tanstack/react-table';
import Link from 'next/link';

import {
  getListTb303PatternsQueryKey,
  useDeleteTb303Pattern,
} from '@/api/generated/acid';
import { PaginatedResponseTB303PatternSummaryRecordsItem } from '@/api/generated/model';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { formatRelativeTime } from '@/lib/date';

import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';

const TB303ActionsCell = ({
  row,
}: {
  row: Row<PaginatedResponseTB303PatternSummaryRecordsItem>;
}) => {
  const queryClient = useQueryClient();
  const id = row.original.pattern_id;

  const { mutate: deletePattern, isPending: isDeleting } =
    useDeleteTb303Pattern({
      mutation: {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: getListTb303PatternsQueryKey(),
          });
        },
        onError: error => {
          console.error('Error deleting pattern:', error);
        },
      },
    });

  const handleDelete = () => {
    deletePattern({ patternId: id });
  };

  return (
    <div className="text-center">
      <DataTableRowActions
        editUrl={`/dashboard/tb303/${id}/edit`}
        onDelete={handleDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};

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
        <Link
          className="hover:underline underline-offset-4 font-medium truncate min-w-0"
          href={`/dashboard/tb303/${row.original.pattern_id}`}
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
        <DataTableColumnHeader column={column} title="Updated" justify="end" />
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
      cell: ({ row }) => <TB303ActionsCell row={row} />,
      enableSorting: false,
      enableHiding: false,
      size: 70,
    },
  ];
