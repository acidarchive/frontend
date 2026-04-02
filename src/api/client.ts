'use client';

import { fetchAuthSession } from 'aws-amplify/auth';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:8000';

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly data: unknown,
  ) {
    super(`API error ${status}`);
    this.name = 'ApiError';
  }
}

interface RequestConfig {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  data?: unknown;
  params?: Record<string, string | number | boolean | undefined>;
}

const getIdToken = async (): Promise<string | null> => {
  try {
    const session = await fetchAuthSession({ forceRefresh: false });
    return session.tokens?.idToken?.toString() ?? null;
  } catch (error) {
    console.error('Failed to get Cognito ID token:', error);
    return null;
  }
};

const hasBody = (method: string) =>
  !['GET', 'HEAD', 'DELETE'].includes(method.toUpperCase());

const buildUrl = (path: string, params?: RequestConfig['params']): string => {
  const url = new URL(`${API_BASE_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined) url.searchParams.set(k, String(v));
    });
  }
  return url.toString();
};

export const client = async <T>(config: RequestConfig): Promise<T> => {
  const { url, method, data, params } = config;

  const token = await getIdToken();
  const headers: Record<string, string> = {};

  if (token) headers['Authorization'] = `Bearer ${token}`;
  if (hasBody(method) && data !== undefined)
    headers['Content-Type'] = 'application/json';

  const response = await fetch(buildUrl(url, params), {
    method,
    headers,
    body:
      hasBody(method) && data !== undefined ? JSON.stringify(data) : undefined,
  });

  if (
    response.status === 204 ||
    response.headers.get('content-length') === '0'
  ) {
    return undefined as T;
  }

  if (response.ok) {
    return response.json() as Promise<T>;
  }

  const errorData = await response.json().catch(() => ({}));
  throw new ApiError(response.status, errorData);
};
