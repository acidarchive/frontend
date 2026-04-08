'use client';

import { fetchAuthSession } from 'aws-amplify/auth';

import { httpFetch, type RequestConfig } from './http';

export { ApiError } from '@/lib/errors/api';

const getIdToken = async (): Promise<string | null> => {
  try {
    const session = await fetchAuthSession({ forceRefresh: false });
    return session.tokens?.idToken?.toString() ?? null;
  } catch (error) {
    console.error('Failed to get Cognito ID token:', error);
    return null;
  }
};

export const client = async <T>(config: RequestConfig): Promise<T> => {
  const token = await getIdToken();
  return httpFetch<T>(config, token);
};
