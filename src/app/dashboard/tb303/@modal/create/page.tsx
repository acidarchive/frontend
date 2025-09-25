'use client';

import { useRouter } from 'next/navigation';

import { CreatePattern } from '@/features/pattern-tb303-editor';

export default function CreatePatternModal() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const handleSuccess = () => {
    router.back();
  };

  return <CreatePattern onClose={handleClose} onSuccess={handleSuccess} />;
}
