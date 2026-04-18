'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';

import { PatternTB303Form } from '@/components/organisms/pattern-tb303-form';
import { PatternFormData, PatternFormSchema } from '@/schemas/tb303/patterns';

function findFirstErrorMessage(errors: object): string | undefined {
  for (const value of Object.values(errors)) {
    if (!value || typeof value !== 'object') continue;
    if (typeof (value as { message?: unknown }).message === 'string') return (value as { message: string }).message;
    const nested = findFirstErrorMessage(value as object);
    if (nested) return nested;
  }
}

interface PatternEditorProps {
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
}: PatternEditorProps) {
  const methods = useForm({
    resolver: zodResolver(PatternFormSchema),
    defaultValues: { bars: [{ number: 1, steps: [] }] },
    values: initialData,
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const validationError = findFirstErrorMessage(errors);

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
      <FormProvider {...methods}>
        <PatternTB303Form
          readonly={readonly}
          error={error}
          onSubmit={handleSubmit(handleFormSubmit)}
          onReset={handleReset}
        />
      </FormProvider>
    </div>
  );
}
