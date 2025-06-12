'use client';

import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';

import { useGetRandomTb303Pattern } from '@/api/generated/acid';
import { Button } from '@/app/components/atoms/button';
import { Loader } from '@/app/components/atoms/loader';
import { MainLayout } from '@/app/components/layouts/main-layout';
import { ReadonlyTB303PatternGrid } from '@/app/components/organisms/readonly-tb303-pattern-grid';

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
          <h1 className="text-2xl font-bold text-gray-950">TB-303 pattern</h1>
          <div className="w-24">
            <Button
              onClick={() => refetch()}
              disabled={isFetching}
              aria-disabled={isFetching}
            >
              <ArrowPathIcon
                className={clsx('h-6 w-6', { 'animate-spin': isFetching })}
              />
            </Button>
          </div>
        </div>
        {data ? (
          <ReadonlyTB303PatternGrid pattern={data} />
        ) : (
          <div className="text-gray-500">No pattern found</div>
        )}
      </div>
    </MainLayout>
  );
}
