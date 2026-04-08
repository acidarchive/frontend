'use client';

import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { GridInput } from '@/components/atoms/grid-input';
import { TB303PatternGrid } from '@/components/organisms/tb303-pattern-grid';
import { TB303Pattern } from '@/types/api';

interface PatternTB303ViewerProps {
  data: TB303Pattern;
}

export function PatternTB303Viewer({ data }: PatternTB303ViewerProps) {
  const form = useForm();

  useEffect(() => {
    form.reset(data);
  }, [data, form]);

  return (
    <FormProvider {...form}>
      <div className="grid grid-cols-18 items-center py-2 border">
        <span className="col-span-2 font-medium px-4 text-sm">Name</span>
        <div className="col-span-16 pr-4">
          <GridInput id="name" name="name" type="text" disabled={true} />
        </div>
      </div>
      <TB303PatternGrid readonly={true} />
    </FormProvider>
  );
}
