'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Icons } from '@/components/atoms/icons';
import { PatternTB303Form } from '@/components/organisms/pattern-tb303-form';
import { Button } from '@/components/ui/button';
import { fetchPatternTB303Random } from '@/dal';
import { MidiPlayer } from '@/features/midi-player';

export function RandomTB303Pattern() {
  const { data, isFetching, refetch, isLoading, error } = useQuery({
    queryKey: ['randomTB303Pattern'],
    queryFn: () => fetchPatternTB303Random(),
    refetchOnWindowFocus: false,
  });

  const form = useForm();

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data, form]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="mt-4 mb-4 flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold">TB-303 pattern</h1>
        <div className="w-24">
          <Button
            onClick={() => refetch()}
            variant="outline"
            disabled={isFetching}
          >
            Refresh
            <Icons.refreshCw className={isFetching ? 'animate-spin' : ''} />
          </Button>
        </div>
      </div>
      <div>
        <div className="mb-4">
          <FormProvider {...form}>
            <PatternTB303Form readonly />
          </FormProvider>
          <MidiPlayer pattern={data!} />
        </div>
      </div>
    </div>
  );
}
