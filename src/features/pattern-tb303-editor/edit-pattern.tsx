'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { fetchPatternTB303, updatePatternTB303 } from '@/dal';
import { getErrorMessage } from '@/lib/errors';
import {
  apiPatternToFormData,
  formDataToApiPayload,
  PatternFormData,
} from '@/schemas/tb303/patterns';
import { CreateTB303Pattern } from '@/types/api';

import { PatternEditor } from './pattern-editor';

interface EditPatternProps {
  patternId: string;
  onSuccess?: () => void;
}

export function EditPattern({ patternId, onSuccess }: EditPatternProps) {
  const queryClient = useQueryClient();

  const { data: pattern } = useQuery({
    queryKey: ['/v1/patterns/tb303', patternId],
    queryFn: () => fetchPatternTB303(patternId),
    throwOnError: true,
  });

  const updatePatternMutation = useMutation({
    mutationFn: (data: CreateTB303Pattern) =>
      updatePatternTB303(patternId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/v1/patterns/tb303'] });
      onSuccess?.();
    },
  });

  const handleSubmit = async (data: PatternFormData) => {
    const payload = formDataToApiPayload(data);
    await updatePatternMutation.mutateAsync(payload);
  };

  const handleReset = () => {
    updatePatternMutation.reset();
  };

  const error = updatePatternMutation.error
    ? getErrorMessage(updatePatternMutation.error)
    : undefined;

  const formData = pattern ? apiPatternToFormData(pattern) : undefined;

  return (
    <PatternEditor
      title="Edit TB-303 Pattern"
      initialData={formData}
      error={error}
      onSubmit={handleSubmit}
      onReset={handleReset}
    />
  );
}
