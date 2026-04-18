'use client';

import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { Icons } from '@/components/atoms/icons';
import { PatternTB303Viewer } from '@/components/organisms/pattern-tb303-viewer';
import { Button } from '@/components/ui/button';
import { fetchPatternTB303Random } from '@/dal';
// import { MidiPlayer } from '@/features/midi-player';
import { cn } from '@/lib/utils';

export function RandomTB303Pattern() {
  const queryClient = useQueryClient();
  const [isSpinning, setIsSpinning] = useState(false);
  const { data } = useSuspenseQuery({
    queryKey: ['/v1/patterns/tb303/random'],
    queryFn: () => fetchPatternTB303Random(),
    refetchOnWindowFocus: false,
    retry: false,
  });

  const handleRefresh = async () => {
    setIsSpinning(true);
    await queryClient.invalidateQueries({
      queryKey: ['/v1/patterns/tb303/random'],
    });
    setTimeout(() => setIsSpinning(false), 400);
  };

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
          <PatternTB303Viewer data={data} />
          {/*<MidiPlayer pattern={data!} />*/}
        </div>
      </div>
    </div>
  );
}
