import { ApiError } from '@/lib/errors/api';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:8000';

export interface RequestConfig {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  data?: unknown;
  params?: Record<string, string | number | boolean | undefined>;
}

export const hasBody = (method: string) =>
  !['GET', 'HEAD', 'DELETE'].includes(method.toUpperCase());

export const buildUrl = (
  path: string,
  params?: RequestConfig['params'],
): string => {
  const url = new URL(`${API_BASE_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined) url.searchParams.set(k, String(v));
    });
  }
  return url.toString();
};

export const httpFetch = async <T>(
  config: RequestConfig,
  token: string | null = null,
): Promise<T> => {
  const { url, method, data, params } = config;
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
