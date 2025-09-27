'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createPatternTB303 } from '@/dal';
import {
  formDataToApiPayload,
  PatternFormData,
} from '@/schemas/tb303/patterns';
import { CreateTB303Pattern } from '@/types/api';

import { PatternModal } from './pattern-modal';

const getErrorMessage = (error: unknown): string | undefined => {
  return (error as Error)?.message;
};

interface CreatePatternProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
}

export function CreatePattern({
  isOpen,
  onClose,
  onSuccess,
}: CreatePatternProps) {
  const queryClient = useQueryClient();

  const createPatternMutation = useMutation({
    mutationFn: (data: CreateTB303Pattern) => createPatternTB303(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/v1/patterns/tb303'] });
      if (onSuccess) onSuccess();
    },
  });

  const handleSubmit = async (formData: PatternFormData) => {
    const payload = formDataToApiPayload(formData);
    await createPatternMutation.mutateAsync(payload);
  };

  const handleReset = () => {
    createPatternMutation.reset();
  };

  const error = getErrorMessage(createPatternMutation.error);

  return (
    <PatternModal
      isOpen={isOpen}
      title="Create TB-303 Pattern"
      onClose={onClose}
      onSubmit={handleSubmit}
      onReset={handleReset}
      error={error}
      isLoading={createPatternMutation.isPending}
    />
  );
}
