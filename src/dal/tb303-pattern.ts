import { getRandomTb303Pattern } from '@/api/generated/acid';

export const getRandomTB303Pattern = async () => {
  try {
    return await getRandomTb303Pattern();
  } catch {
    throw new Error('Failed to fetch random TB-303 pattern');
  }
};
