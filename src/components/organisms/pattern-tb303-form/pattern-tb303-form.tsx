'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  getGetTb303PatternQueryKey,
  getListTb303PatternsQueryKey,
  useCreateTb303Pattern,
  useGetTb303Pattern,
  useUpdateTb303Pattern,
} from '@/api/generated/acid';
import { CreateTB303Pattern } from '@/api/generated/model';
import { EditableTB303PatternDetails } from '@/components/organisms/editable-tb303-pattern-details';
import { EditableTB303PatternGrid } from '@/components/organisms/editable-tb303-pattern-grid';

import { cleanPattern } from './utils';

interface PatternTB303FormProps {
  editPatternId?: string;
}

const LoadingState = ({ message }: { message: string }) => (
  <div className="px-4 sm:px-6 lg:px-8 py-8">
    <div className="flex items-center justify-center h-64">
      <div className="text-gray-500">{message}</div>
    </div>
  </div>
);

const ErrorState = ({ message }: { message: string }) => (
  <div className="px-4 sm:px-6 lg:px-8 py-8">
    <div className="flex items-center justify-center h-64">
      <div className="text-red-500">{message}</div>
    </div>
  </div>
);

export function PatternTB303Form({ editPatternId }: PatternTB303FormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isEditMode = Boolean(editPatternId);

  const methods = useForm<CreateTB303Pattern>({
    defaultValues: {},
  });
  const { handleSubmit, reset } = methods;

  const {
    data: pattern,
    isLoading,
    error,
  } = useGetTb303Pattern(editPatternId!, {
    query: {
      enabled: isEditMode,
    },
  });

  useEffect(() => {
    if (pattern && isEditMode) {
      const formData = {
        ...pattern,
        id: undefined,
        created_at: undefined,
        updated_at: undefined,
      };
      reset(formData as CreateTB303Pattern);
    }
  }, [pattern, reset, isEditMode]);

  const createPatternMutation = useCreateTb303Pattern({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getListTb303PatternsQueryKey(),
        });
        router.push('/dashboard/tb303');
      },
      onError: error => {
        console.error('Error creating pattern:', error);
      },
    },
  });

  const updatePatternMutation = useUpdateTb303Pattern({
    mutation: {
      onSuccess: () => {
        if (editPatternId) {
          queryClient.invalidateQueries({
            queryKey: getGetTb303PatternQueryKey(editPatternId),
          });
        }
        queryClient.invalidateQueries({
          queryKey: getListTb303PatternsQueryKey(),
        });
        router.push('/dashboard/tb303');
      },
      onError: error => {
        console.error('Error updating pattern:', error);
      },
    },
  });

  const onSubmit = async (data: CreateTB303Pattern) => {
    try {
      const validatedData = cleanPattern(data);

      await (isEditMode && editPatternId
        ? updatePatternMutation.mutateAsync({
            patternId: editPatternId,
            data: validatedData,
          })
        : createPatternMutation.mutateAsync({ data: validatedData }));
    } catch (error) {
      console.error('Submission failed:', error);
    }
  };

  if (isEditMode && isLoading) {
    return <LoadingState message="Loading pattern..." />;
  }

  if (isEditMode && error) {
    return <ErrorState message="Error loading pattern" />;
  }

  if (isEditMode && !pattern) {
    return <ErrorState message="Pattern not found" />;
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:flex-1">
              <EditableTB303PatternGrid />
            </div>
            <div className="lg:w-100 lg:flex-shrink-0">
              <EditableTB303PatternDetails />
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
