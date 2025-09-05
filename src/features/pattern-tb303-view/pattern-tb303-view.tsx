'use client';

import { useQuery } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';

import { TB303PatternDetails } from '@/components/organisms/tb303-pattern-details';
import { TB303PatternGrid } from '@/components/organisms/tb303-pattern-grid';
import { fetchPatternTB303 } from '@/dal';

interface PatternTB303ViewProps {
  patternId: string;
}

export function PatternTB303View({ patternId }: PatternTB303ViewProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['patternsTB303', patternId],
    queryFn: () => fetchPatternTB303(patternId),
    throwOnError: true,
  });

  const form = useForm({
    defaultValues: data,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="max-w-7xl">
      <FormProvider {...form}>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:flex-1">
            <TB303PatternGrid readonly />
          </div>
          <div className="lg:w-100 lg:flex-shrink-0">
            <TB303PatternDetails readonly />
          </div>
        </div>
      </FormProvider>
    </div>
  );
}
