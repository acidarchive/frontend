'use client';

import { useQuery } from '@tanstack/react-query';

import { columns, DataTable } from '@/components/organisms/data-table';
import { listPatternsTB303 } from '@/dal';
import { getErrorMessage } from '@/lib/errors';

export function PatternTB303List() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['/v1/patterns/tb303'],
    queryFn: () => listPatternsTB303(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{getErrorMessage(error)}</div>;

  return <DataTable columns={columns} data={data ?? []} />;
}
