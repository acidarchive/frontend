'use client';

import { clsx } from 'clsx';

import { useGetRandomTb303Pattern } from '@/api/generated/acid';
import { Icons } from '@/components/atoms/icons';
import { ReadonlyTB303PatternGrid } from '@/components/organisms/readonly-tb303-pattern-grid';
import { Button } from '@/components/ui/button';
import { MidiPlayer } from '@/features/midi-player';

export const RandomTB303Pattern = () => {
  const { data, isError, isLoading, isFetching, refetch } =
    useGetRandomTb303Pattern();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 min-h-[450px]">
        <Icons.refreshCw className="h-12 w-12 animate-spin text-muted-foreground mb-4" />
        <p className="text-muted-foreground">
          The backend may take a moment to wake up.
        </p>
        <p className="text-muted-foreground">Thanks for your patience!</p>
      </div>
    );
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="mt-4 mb-4 flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold">TB-303 pattern</h1>
        <div className="w-24">
          <Button
            onClick={() => refetch()}
            disabled={isFetching}
            aria-disabled={isFetching}
            variant="outline"
          >
            Refresh
            <Icons.refreshCw className={clsx({ 'animate-spin': isFetching })} />
          </Button>
        </div>
      </div>
      <div>
        {data ? (
          <div className="mb-4">
            <ReadonlyTB303PatternGrid pattern={data} />
            <MidiPlayer pattern={data} />
          </div>
        ) : (
          <div>No pattern found</div>
        )}
      </div>
    </div>
  );
};
