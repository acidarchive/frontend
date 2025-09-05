'use client';

import { useRouter } from 'next/navigation';
import { use } from 'react';

import { EditPattern } from '@/features/pattern-tb303-editor';

interface EditPatternModalProps {
  params: Promise<{ uuid: string }>;
}

export default function EditPatternModal({ params }: EditPatternModalProps) {
  const router = useRouter();
  const { uuid } = use(params);

  const handleClose = () => {
    router.back();
  };

  const handleSuccess = () => {
    router.back();
  };

  return (
    <EditPattern
      patternId={uuid}
      onClose={handleClose}
      onSuccess={handleSuccess}
    />
  );
}
