import { notFound } from 'next/navigation';

import { ApiError } from '@/lib/errors/api';

export async function fetchOrNotFound<T>(
  function_: () => Promise<T>,
): Promise<T> {
  try {
    return await function_();
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }
}
