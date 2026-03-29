'use client';

import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { GridInput } from '@/components/atoms/grid-input';
import { Icons } from '@/components/atoms/icons';
import { TB303PatternGrid } from '@/components/organisms/tb303-pattern-grid';
import { Button } from '@/components/ui/button';
import { fetchPatternTB303Random } from '@/dal';
import { MidiPlayer } from '@/features/midi-player';
import { cn } from '@/lib/utils';

export function RandomTB303Pattern() {
  const queryClient = useQueryClient();
  const [isSpinning, setIsSpinning] = useState(false);
  const { data, error, isFetching } = useSuspenseQuery({
    queryKey: ['/v1/patterns/tb303/random'],
    queryFn: () => fetchPatternTB303Random(),
    refetchOnWindowFocus: false,
    retry: false,
  });

  const form = useForm();

  const handleRefresh = async () => {
    setIsSpinning(true);
    await queryClient.invalidateQueries({
      queryKey: ['/v1/patterns/tb303/random'],
    });
    setTimeout(() => setIsSpinning(false), 400);
  };

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data, form]);

  if (error && !isFetching) {
    throw error;
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      <div>
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold">TB-303 pattern</h1>
          <div className="w-24">
            <Button
              onClick={handleRefresh}
              variant="outline"
              disabled={isSpinning}
              className="cursor-pointer"
            >
              Refresh
              <Icons.RefreshCw className={cn(isSpinning && 'animate-spin')} />
            </Button>
          </div>
        </div>
        <div className="mb-4">
          <FormProvider {...form}>
            <div className="grid grid-cols-18 items-center py-2 border">
              <span className="col-span-2 font-medium px-4 text-sm">Name</span>
              <div className="col-span-16 pr-4">
                <GridInput id="name" name="name" type="text" disabled={true} />
              </div>
            </div>
            <TB303PatternGrid readonly={true} />
          </FormProvider>
          <MidiPlayer pattern={data!} />
        </div>
      </div>
    </div>
  );
}
