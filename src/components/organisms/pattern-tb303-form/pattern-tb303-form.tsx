'use client';

import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';

import { useCreateTb303Pattern } from '@/api/generated/acid';
import { CreateTB303Pattern } from '@/api/generated/model';
import { EditableTB303PatternDetails } from '@/components/organisms/editable-tb303-pattern-details';
import { EditableTB303PatternGrid } from '@/components/organisms/editable-tb303-pattern-grid';

import { cleanPattern } from './utils';

export function PatternTB303Form() {
  const router = useRouter();
  const methods = useForm<CreateTB303Pattern>({
    defaultValues: {},
  });
  const { handleSubmit } = methods;

  const createPatternMutation = useCreateTb303Pattern({
    mutation: {
      onSuccess: () => {
        router.push('/dashboard/tb303');
      },
      onError: error => {
        console.error('Error creating pattern:', error);
      },
    },
  });

  const onSubmit = async (data: CreateTB303Pattern) => {
    try {
      const validatedData = cleanPattern(data);
      await createPatternMutation.mutateAsync({ data: validatedData });
    } catch (error) {
      console.error('Submission failed:', error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 xl:mx-0 xl:max-w-none xl:grid-cols-3">
          <div className="-mx-4 shadow-xs sm:mx-0  xl:col-span-2 xl:row-span-2 xl:row-end-2">
            <EditableTB303PatternGrid />
          </div>

          <div className="xl:col-start-3">
            <EditableTB303PatternDetails />
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
