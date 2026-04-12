'use client';

import { useQuery } from '@tanstack/react-query';

import { Loader } from '@/components/atoms/loader';
import { ErrorFallback } from '@/components/molecules/error-fallback';
import { columns, DataTable } from '@/components/organisms/data-table';
import { listPatternsTB303 } from '@/dal';

import {
  PatternPreviewProvider,
  usePatternPreview,
} from './pattern-tb303-preview';

function PatternTB303ListContent() {
  const openPreview = usePatternPreview();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['/v1/patterns/tb303'],
    queryFn: () => listPatternsTB303(),
  });

  if (isLoading) return <Loader />;
  if (error) return <ErrorFallback error={error} reset={refetch} />;

  return (
    <DataTable
      columns={columns}
      data={data ?? []}
      onRowClick={row => openPreview(row.pattern_id)}
    />
  );
}

export function PatternTB303List() {
  return (
    <PatternPreviewProvider>
      <PatternTB303ListContent />
    </PatternPreviewProvider>
  );
}
