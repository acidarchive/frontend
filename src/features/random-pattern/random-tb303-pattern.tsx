'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Icons } from '@/components/atoms/icons';
import { Loader } from '@/components/atoms/loader';
import { PatternTB303Form } from '@/components/organisms/pattern-tb303-form';
import { Button } from '@/components/ui/button';
import { fetchPatternTB303Random } from '@/dal';
import { MidiPlayer } from '@/features/midi-player';
import { cn } from '@/lib/utils';

export function RandomTB303Pattern() {
  const queryClient = useQueryClient();
  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['/v1/patterns/tb303/random'],
    queryFn: () => fetchPatternTB303Random(),
    refetchOnWindowFocus: false,
    throwOnError: true,
    retry: false,
  });

  const form = useForm();

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data, form]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col">
      <div className="mt-4 mb-4 flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold">TB-303 pattern</h1>
        <div className="w-24">
          <Button
            onClick={() =>
              queryClient.invalidateQueries({
                queryKey: ['/v1/patterns/tb303/random'],
              })
            }
            variant="outline"
            disabled={isFetching}
          >
            Refresh
            <Icons.refreshCw className={cn(isFetching && 'animate-spin')} />
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
