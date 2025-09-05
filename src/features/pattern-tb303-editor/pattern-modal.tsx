'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { BaseModal } from '@/components/organisms/base-modal';
import { PatternTB303Form } from '@/components/organisms/pattern-tb303-form';
import { PatternFormData, PatternFormSchema } from '@/schemas/tb303/patterns';
import { extractTB303StepValidationError } from '@/utils/tb303-form-errors';

interface PatternModalProps {
  isOpen?: boolean;
  title?: string;
  description?: string;
  initialData?: PatternFormData;
  onClose?: () => void;
  onSubmit: (data: PatternFormData) => Promise<void>;
  error?: string;
  isLoading?: boolean;
  onReset?: () => void;
}

export function PatternModal({
  isOpen = true,
  title = 'Pattern',
  description,
  initialData,
  onClose,
  onSubmit,
  error: externalError,
  onReset: externalReset,
}: PatternModalProps) {
  const methods = useForm({
    resolver: zodResolver(PatternFormSchema),
    defaultValues: initialData,
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const validationError = useMemo(() => {
    return extractTB303StepValidationError(errors);
  }, [errors]);

  const error = validationError || externalError;

  const handleFormSubmit = async (data: PatternFormData) => {
    await onSubmit(data);
  };

  const handleReset = () => {
    reset();
    externalReset?.();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      title={title}
      description={description}
      error={error}
      onClose={onClose}
      onSubmit={handleSubmit(handleFormSubmit)}
      onReset={handleReset}
    >
      <FormProvider {...methods}>
        <PatternTB303Form onSubmit={handleSubmit(handleFormSubmit)} />
      </FormProvider>
    </BaseModal>
  );
}
