import { httpFetch, type RequestConfig } from './http';

export { ApiError } from '@/lib/errors/api';

export const serverClient = async <T>(config: RequestConfig): Promise<T> => {
  return httpFetch<T>(config, null);
};
