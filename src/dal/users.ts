import { customInstance } from '@/api/mutator/custom-instance';
import { Me, UpdateMe, UpdateMeResponse } from '@/types/api';

export const fetchMe = async () => {
  return await customInstance<Me>({
    url: '/v1/users/me',
    method: 'GET',
  });
};

export const patchMe = async (data: Partial<UpdateMe>) => {
  return await customInstance<UpdateMeResponse>({
    url: '/v1/users/me',
    method: 'PATCH',
    data,
  });
};
