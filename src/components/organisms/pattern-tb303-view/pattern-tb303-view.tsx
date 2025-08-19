'use client';

import { FormProvider, useForm } from 'react-hook-form';

import { TB303Pattern } from '@/api/generated/model';
import { TB303PatternDetails } from '@/components/organisms/tb303-pattern-details';
import { TB303PatternGrid } from '@/components/organisms/tb303-pattern-grid';

interface PatternTB303ViewProps {
  pattern: TB303Pattern;
}

export function PatternTB303View({ pattern }: PatternTB303ViewProps) {
  const form = useForm({
    defaultValues: pattern,
  });

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
