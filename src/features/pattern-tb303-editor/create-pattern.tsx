'use client';

import { useMutation } from '@tanstack/react-query';

import { createPatternTB303 } from '@/dal';
import {
  formDataToApiPayload,
  PatternFormData,
} from '@/schemas/tb303/patterns';
import { CreateTB303Pattern } from '@/types/api';

import { PatternModal } from './pattern-modal';
import { usePatternModal } from './use-pattern-modal';

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
  const createPatternMutation = useMutation({
    mutationFn: (data: CreateTB303Pattern) => createPatternTB303(data),
    onSuccess: () => {
      if (onSuccess) onSuccess();
    },
  });

  const { handleSuccess, getErrorMessage } = usePatternModal({ onSuccess });

  const handleSubmit = async (formData: PatternFormData) => {
    const payload = formDataToApiPayload(formData);
    await createPatternMutation.mutateAsync(payload);
    handleSuccess();
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
