'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { type FieldErrors, FormProvider, useForm } from 'react-hook-form';

import { BaseModal } from '@/components/organisms/base-modal';
import { PatternTB303Form } from '@/components/organisms/pattern-tb303-form';
import { PatternFormData, PatternFormSchema } from '@/schemas/tb303/patterns';

function getStepValidationError(
  errors: FieldErrors<{ steps?: unknown }>,
): string | undefined {
  if (errors.steps?.root?.message) {
    return errors.steps.root.message;
  }
  if (Array.isArray(errors.steps)) {
    const firstStepError = errors.steps.find(step => step?.time?.message);
    if (firstStepError?.time?.message) {
      return firstStepError.time.message;
    }
  }
}

interface PatternModalProps {
  isOpen?: boolean;
  title?: string;
  initialData?: PatternFormData;
  error?: string;
  isLoading?: boolean;
  readonly?: boolean;
  onReset?: () => void;
  onClose?: () => void;
  onSubmit?: (data: PatternFormData) => Promise<void>;
}

export function PatternModal({
  isOpen = true,
  title,
  initialData,
  onClose,
  onSubmit,
  error: externalError,
  onReset: externalReset,
  readonly,
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
    return getStepValidationError(errors);
  }, [errors]);

  const error = validationError || externalError;

  const handleFormSubmit = async (data: PatternFormData) => {
    if (onSubmit) {
      await onSubmit(data);
    }
  };

  const handleReset = () => {
    reset();
    externalReset?.();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      title={title}
      error={error}
      onClose={onClose}
      onSubmit={onSubmit ? handleSubmit(handleFormSubmit) : undefined}
      onReset={onSubmit ? handleReset : undefined}
    >
      <FormProvider {...methods}>
        <PatternTB303Form
          readonly={readonly}
          onSubmit={handleSubmit(handleFormSubmit)}
        />
      </FormProvider>
    </BaseModal>
  );
}
