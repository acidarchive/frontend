'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import {
  getGetTb303PatternQueryKey,
  getListTb303PatternsQueryKey,
  useCreateTb303Pattern,
  useUpdateTb303Pattern,
} from '@/api/generated/acid';

export function useCreateTB303PatternMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useCreateTb303Pattern({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getListTb303PatternsQueryKey(),
        });
        router.push('/dashboard/tb303');
      },
    },
  });
}

export function useUpdateTB303PatternMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useUpdateTb303Pattern({
    mutation: {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: getGetTb303PatternQueryKey(variables.patternId),
        });
        queryClient.invalidateQueries({
          queryKey: getListTb303PatternsQueryKey(),
        });
        router.push('/dashboard/tb303');
      },
    },
  });
}
