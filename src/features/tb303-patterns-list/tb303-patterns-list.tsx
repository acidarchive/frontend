'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import type { TB303PatternSummary } from '@/api/generated/model';
import { columns, DataTable } from '@/components/organisms/data-table';

interface TB303PatternsListProps {
  data?: TB303PatternSummary[];
  totalPages: number;
}

export function TB303PatternsList({
  data,
  totalPages,
}: TB303PatternsListProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDataChange = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <DataTable
      columns={columns}
      data={data}
      totalPages={totalPages}
      isLoading={isPending}
      onDataChange={handleDataChange}
    />
  );
}
