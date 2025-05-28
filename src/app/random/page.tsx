'use client';
import { useQuery } from '@tanstack/react-query';

import { Loader } from '@/app/components/atoms/loader';
import { MainLayout } from '@/app/components/layouts/main-layout';
import {
  PatternTB303,
  PatternTB303Type,
} from '@/app/components/organisms/pattern';
type FetchRandomPatternResponse = {
  data: PatternTB303Type;
  status: string;
};

import { Button } from '@/app/components/atoms/button';

async function fetchPattern(): Promise<FetchRandomPatternResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}/v1/patterns/tb303/random`,
  );

  return response.json();
}
export default function PatternPage() {
  const { data, error, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ['random-pattern'],
    queryFn: fetchPattern,
  });

  if (isLoading) {
    return (
      <MainLayout>
        <Loader />
      </MainLayout>
    );
  }

  if (isError) {
    console.error('Error fetching pattern:', error);
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
              Refresh
            </Button>
          </div>
        </div>
        <PatternTB303 pattern={data?.data} isLoading={isFetching} />
      </div>
    </MainLayout>
  );
}
