import { type NextServer } from '@aws-amplify/adapter-nextjs';
import { fetchAuthSession } from 'aws-amplify/auth/server';

import { getRandomTb303Pattern, getTb303Pattern } from '@/api/generated/acid';
import { TB303Pattern } from '@/api/generated/model';

import { runWithAmplifyServerContext } from '../utils/amplify-server-utils';

export async function getTB303PatternById(
  patternId: string,
  context: NextServer.Context,
): Promise<TB303Pattern> {
  return await runWithAmplifyServerContext({
    nextServerContext: context,
    operation: async contextSpec => {
      try {
        const session = await fetchAuthSession(contextSpec);
        const idToken = session.tokens?.idToken?.toString();

        if (!idToken) {
          throw new Error('No access token found in session');
        }

        const pattern = await getTb303Pattern(patternId, {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });

        return pattern;
      } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch TB-303 pattern');
      }
    },
  });
}

export async function getRandomTB303Pattern(): Promise<TB303Pattern> {
  try {
    return await getRandomTb303Pattern();
  } catch {
    throw new Error('Failed to fetch random TB-303 pattern');
  }
}
