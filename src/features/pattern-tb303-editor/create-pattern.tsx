'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createPatternTB303 } from '@/dal';
import { getErrorMessage } from '@/lib/errors';
import {
  formDataToApiPayload,
  PatternFormData,
} from '@/schemas/tb303/patterns';

import { PatternEditor } from './pattern-editor';

interface CreatePatternProps {
  onSuccess?: () => void;
}

export function CreatePattern({ onSuccess }: CreatePatternProps) {
  const queryClient = useQueryClient();

  const createPatternMutation = useMutation({
    mutationFn: createPatternTB303,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/v1/patterns/tb303'] });
      onSuccess?.();
    },
  });

  const handleSubmit = async (formData: PatternFormData) => {
    const payload = formDataToApiPayload(formData);
    await createPatternMutation.mutateAsync(payload);
  };

  const handleReset = () => {
    createPatternMutation.reset();
  };

  const error = createPatternMutation.error
    ? getErrorMessage(createPatternMutation.error)
    : undefined;

  return (
    <PatternEditor
      title="Create TB-303 Pattern"
      onSubmit={handleSubmit}
      onReset={handleReset}
      error={error}
    />
  );
}
