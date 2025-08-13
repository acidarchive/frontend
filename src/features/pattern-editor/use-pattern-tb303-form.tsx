'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { TB303Pattern } from '@/api/generated/model';
import { parseTB303Pattern } from '@/dal/tb303-pattern';
import {
  useCreateTB303PatternMutation,
  useUpdateTB303PatternMutation,
} from '@/hooks/queries/tb303-pattern';
import { extractTB303StepValidationError } from '@/utils/tb303-form-errors';

import {
  TB303PatternSchema,
  TB303PatternSchemaType,
} from './tb303-pattern-schema';

interface UsePatternTB303FormProps {
  pattern?: TB303Pattern;
}

export function usePatternTB303Form({ pattern }: UsePatternTB303FormProps) {
  const isEditMode = Boolean(pattern);
  const [submissionError, setSubmissionError] = useState<string | undefined>();

  const methods = useForm({
    resolver: zodResolver(TB303PatternSchema),
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const validationError = useMemo(
    () => extractTB303StepValidationError(errors),
    [errors],
  );

  useEffect(() => {
    setSubmissionError(validationError);
  }, [validationError]);

  useEffect(() => {
    if (pattern && isEditMode) {
      reset(parseTB303Pattern(pattern));
    }
  }, [pattern, reset, isEditMode]);

  const createPatternMutation = useCreateTB303PatternMutation();
  const updatePatternMutation = useUpdateTB303PatternMutation();

  const onSubmit = async (data: TB303PatternSchemaType) => {
    setSubmissionError(undefined);

    await (isEditMode && pattern
      ? updatePatternMutation.mutateAsync({
          patternId: pattern.id as string,
          data,
        })
      : createPatternMutation.mutateAsync({ data }));
  };

  const handleFormSubmit = async (data: TB303PatternSchemaType) => {
    try {
      await onSubmit(data);
    } catch (error) {
      setSubmissionError(
        error instanceof Error ? error.message : 'Network error occurred',
      );
    }
  };

  return {
    methods,
    onSubmit: handleSubmit(handleFormSubmit),
    pattern,
    isEditMode,
    submissionError,
    isSubmitting:
      createPatternMutation.isPending || updatePatternMutation.isPending,
  };
}
