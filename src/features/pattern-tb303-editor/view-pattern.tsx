'use client';

import { useQuery } from '@tanstack/react-query';

import { fetchPatternTB303 } from '@/dal';
import { apiPatternToFormData } from '@/schemas/tb303/patterns';

import { PatternModal } from './pattern-modal';

interface ViewPatternProps {
  patternId: string;
  isOpen?: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
}

export function ViewPattern({ patternId, isOpen, onClose }: ViewPatternProps) {
  const { data } = useQuery({
    queryKey: ['patternsTB303', patternId],
    queryFn: () => fetchPatternTB303(patternId),
    throwOnError: true,
  });

  const formData = data ? apiPatternToFormData(data) : undefined;

  return (
    <PatternModal
      title="View TB-303 Pattern"
      readonly
      isOpen={isOpen}
      initialData={formData}
      onClose={onClose}
    />
  );
}
