'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { useForm } from 'react-hook-form';

import {
  getGetTb303PatternQueryKey,
  getListTb303PatternsQueryKey,
  useCreateTb303Pattern,
  useGetTb303Pattern,
  useUpdateTb303Pattern,
} from '@/api/generated/acid';

import {
  TB303PatternSchema,
  TB303PatternSchemaType,
} from './tb303-pattern-schema';

interface UsePatternTB303FormProps {
  patternId?: string;
}

export function usePatternTB303Form({ patternId }: UsePatternTB303FormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isEditMode = Boolean(patternId);
  const [submissionError, setSubmissionError] = useState<string | undefined>();
  const { showBoundary } = useErrorBoundary();

  const methods = useForm({
    resolver: zodResolver(TB303PatternSchema),
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log('Form Validation Errors:', errors);
    }
  }, [errors]);

  useEffect(() => {
    let errorToShow = errors.steps?.root?.message;

    if (!errorToShow && Array.isArray(errors.steps)) {
      const firstStepError = errors.steps.find(step => step?.time?.message);
      if (firstStepError?.time?.message) {
        errorToShow = firstStepError.time.message;
      }
    }

    setSubmissionError(errorToShow || undefined);
  }, [errors.steps]);

  const { data: pattern } = useGetTb303Pattern(patternId!, {
    query: {
      enabled: isEditMode,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      suspense: isEditMode ? true : undefined,
    },
  });

  useEffect(() => {
    if (pattern && isEditMode) {
      reset(TB303PatternSchema.parse(pattern) as TB303PatternSchemaType);
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
        showBoundary(error);
      },
    },
  });

  const updatePatternMutation = useUpdateTb303Pattern({
    mutation: {
      onSuccess: () => {
        if (patternId) {
          queryClient.invalidateQueries({
            queryKey: getGetTb303PatternQueryKey(patternId),
          });
        }
        queryClient.invalidateQueries({
          queryKey: getListTb303PatternsQueryKey(),
        });
        router.push('/dashboard/tb303');
      },
      onError: error => {
        showBoundary(error);
      },
    },
  });

  const onSubmit = async (data: TB303PatternSchemaType) => {
    setSubmissionError(undefined);

    await (isEditMode && patternId
      ? updatePatternMutation.mutateAsync({
          patternId,
          data,
        })
      : createPatternMutation.mutateAsync({ data }));
  };

  return {
    methods,
    onSubmit,
    handleSubmit,
    pattern,
    isEditMode,
    submissionError,
    isSubmitting:
      createPatternMutation.isPending || updatePatternMutation.isPending,
  };
}
