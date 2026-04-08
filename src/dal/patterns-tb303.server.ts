import { serverClient } from '@/api/server-client';
import { TB303Pattern } from '@/types/api';

export const fetchPatternTB303Server = async (id: string) => {
  return await serverClient<TB303Pattern>({
    url: `/v1/patterns/tb303/${id}`,
    method: 'GET',
  });
};
