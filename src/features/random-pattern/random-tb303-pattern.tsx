'use client';

import { clsx } from 'clsx';
import { useRouter } from 'next/navigation';
import { useEffect, useTransition } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { TB303Pattern } from '@/api/generated/model';
import { Icons } from '@/components/atoms/icons';
import { TB303PatternGrid } from '@/components/organisms/tb303-pattern-grid';
import { Button } from '@/components/ui/button';
import { MidiPlayer } from '@/features/midi-player';

interface RandomTB303PatternProps {
  pattern: TB303Pattern;
}

export const RandomTB303Pattern = ({ pattern }: RandomTB303PatternProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    defaultValues: pattern,
  });

  useEffect(() => {
    form.reset(pattern);
  }, [pattern, form]);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div className="flex flex-col">
      <div className="mt-4 mb-4 flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold">TB-303 pattern</h1>
        <div className="w-24">
          <Button
            onClick={handleRefresh}
            variant="outline"
            disabled={isPending}
          >
            Refresh
            <Icons.refreshCw
              className={clsx({
                'animate-spin': isPending,
              })}
            />
          </Button>
        </div>
      </div>
      <div>
        <div className="mb-4">
          <FormProvider {...form}>
            <TB303PatternGrid readonly />
          </FormProvider>
          <MidiPlayer pattern={pattern} />
        </div>
      </div>
    </div>
  );
};
