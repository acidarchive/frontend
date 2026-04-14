'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { type FieldErrors, FormProvider, useForm } from 'react-hook-form';

import { FormAlert } from '@/components/molecules/form-alert';
import { PatternTB303Form } from '@/components/organisms/pattern-tb303-form';
import { Button } from '@/components/ui/button';
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
  title?: string;
  initialData?: PatternFormData;
  error?: string;
  readonly?: boolean;
  onReset?: () => void;
  onSubmit?: (data: PatternFormData) => Promise<void>;
}

export function PatternEditor({
  title,
  initialData,
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
    <div className="flex flex-col gap-4">
      {title && <h1 className="text-2xl font-semibold">{title}</h1>}
      {error && <FormAlert title="Error" message={error} />}
      <FormProvider {...methods}>
        <PatternTB303Form
          readonly={readonly}
          onSubmit={handleSubmit(handleFormSubmit)}
        />
      </FormProvider>
      {onSubmit && (
        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
          <Button onClick={handleSubmit(handleFormSubmit)}>Save</Button>
        </div>
      )}
    </div>
  );
}
