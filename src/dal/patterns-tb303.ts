'use client';

import { customInstance } from '@/api/mutator/custom-instance';
import {
  CreateTB303Pattern,
  TB303Pattern,
  TB303PatternSummary,
} from '@/types/api';

export const listPatternsTB303 = async () => {
  return await customInstance<TB303PatternSummary[]>({
    url: `/v1/patterns/tb303`,
    method: 'GET',
  });
};

export const fetchPatternTB303 = async (id: string) => {
  return await customInstance<TB303Pattern>({
    url: `/v1/patterns/tb303/${id}`,
    method: 'GET',
  });
};

export const fetchPatternTB303Random = async () => {
  return await customInstance<TB303Pattern>({
    url: `/v1/patterns/tb303/random`,
    method: 'GET',
  });
};

export const createPatternTB303 = async (data: CreateTB303Pattern) => {
  return await customInstance<TB303Pattern>({
    url: `/v1/patterns/tb303`,
    method: 'POST',
    data,
  });
};

export const updatePatternTB303 = async (
  id: string,
  data: CreateTB303Pattern,
) => {
  return await customInstance<TB303Pattern>({
    url: `/v1/patterns/tb303/${id}`,
    method: 'PUT',
    data,
  });
};
