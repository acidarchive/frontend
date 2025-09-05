'use client';

import { useRouter } from 'next/navigation';

interface UsePatternModalOptions {
  onSuccess?: () => void;
}

const getErrorMessage = (error: unknown): string | undefined => {
  return (error as Error)?.message;
};

export function usePatternModal({ onSuccess }: UsePatternModalOptions = {}) {
  const router = useRouter();

  const handleSuccess = () => {
    onSuccess?.();
    router.push('/dashboard/tb303');
  };

  return {
    handleSuccess,
    getErrorMessage,
  };
}
