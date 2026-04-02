import { client } from '@/api/client';
import { Me, UpdateMe, UpdateMeResponse } from '@/types/api';

export const fetchMe = async () => {
  return await client<Me>({
    url: '/v1/users/me',
    method: 'GET',
  });
};

export const patchMe = async (data: Partial<UpdateMe>) => {
  return await client<UpdateMeResponse>({
    url: '/v1/users/me',
    method: 'PATCH',
    data,
  });
};
