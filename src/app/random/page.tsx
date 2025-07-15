'use client';

import { clsx } from 'clsx';
import { RefreshCwIcon } from 'lucide-react';

import { useGetRandomTb303Pattern } from '@/api/generated/acid';
import { Loader } from '@/components/atoms/loader';
import { MainLayout } from '@/components/layouts/main-layout';
import { ReadonlyTB303PatternGrid } from '@/components/organisms/readonly-tb303-pattern-grid';
import { Button } from '@/components/ui/button';

export default function PatternPage() {
  const { data, isError, isLoading, isFetching, refetch } =
    useGetRandomTb303Pattern();

  if (isLoading) {
    return (
      <MainLayout>
        <Loader />
      </MainLayout>
    );
  }

  if (isError) {
    return <MainLayout>Something went wrong</MainLayout>;
  }
  return (
    <MainLayout>
      <div className="w-full max-w-3xl px-4">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold">TB-303 pattern</h1>
          <div className="w-24">
            <Button
              onClick={() => refetch()}
              disabled={isFetching}
              aria-disabled={isFetching}
            >
              Refresh
              <RefreshCwIcon className={clsx({ 'animate-spin': isFetching })} />
            </Button>
          </div>
        </div>
        {data ? (
          <ReadonlyTB303PatternGrid pattern={data} />
        ) : (
          <div>No pattern found</div>
        )}
      </div>
    </MainLayout>
  );
}
