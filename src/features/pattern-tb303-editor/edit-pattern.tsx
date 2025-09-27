'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { fetchPatternTB303, updatePatternTB303 } from '@/dal';
import {
  apiPatternToFormData,
  formDataToApiPayload,
  PatternFormData,
} from '@/schemas/tb303/patterns';
import { CreateTB303Pattern } from '@/types/api';

import { PatternModal } from './pattern-modal';
import { usePatternModal } from './use-pattern-modal';

interface EditPatternProps {
  patternId: string;
  isOpen?: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
}

export function EditPattern({
  patternId,
  isOpen,
  onClose,
  onSuccess,
}: EditPatternProps) {
  const queryClient = useQueryClient();

  const { data: pattern, isLoading: isLoadingPattern } = useQuery({
    queryKey: ['/v1/patterns/tb303', patternId],
    queryFn: () => fetchPatternTB303(patternId),
    throwOnError: true,
  });

  const updatePatternMutation = useMutation({
    mutationFn: (data: CreateTB303Pattern) =>
      updatePatternTB303(patternId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/v1/patterns/tb303'] });
      if (onSuccess) onSuccess();
    },
  });

  const { handleSuccess, getErrorMessage } = usePatternModal({ onSuccess });

  const handleSubmit = async (data: PatternFormData) => {
    const payload = formDataToApiPayload(data);
    await updatePatternMutation.mutateAsync(payload);
    handleSuccess();
  };

  const handleReset = () => {
    updatePatternMutation.reset();
  };

  const error = getErrorMessage(updatePatternMutation.error);
  const isLoading = isLoadingPattern || updatePatternMutation.isPending;

  const formData = pattern ? apiPatternToFormData(pattern) : undefined;

  return (
    <PatternModal
      title="Edit TB-303 Pattern"
      isOpen={isOpen}
      initialData={formData}
      error={error}
      isLoading={isLoading}
      onClose={onClose}
      onSubmit={handleSubmit}
      onReset={handleReset}
    />
  );
}
