import { serverClient } from '@/api/server-client';
import { PublicTB303PatternsList, TB303Pattern } from '@/types/api';

export const fetchPatternTB303Server = async (id: string) => {
  return await serverClient<TB303Pattern>({
    url: `/v1/patterns/tb303/${id}`,
    method: 'GET',
  });
};

export const listPublicPatternsTB303Server = async (
  limit: number,
  offset: number,
) => {
  return await serverClient<PublicTB303PatternsList>({
    url: `/v1/patterns/tb303/public`,
    method: 'GET',
    params: { limit, offset },
  });
};
