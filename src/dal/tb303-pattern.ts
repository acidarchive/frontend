import { type NextServer } from '@aws-amplify/adapter-nextjs';
import { fetchAuthSession } from 'aws-amplify/auth/server';

import {
  getRandomTb303Pattern,
  getTb303Pattern,
  listTb303Patterns,
} from '@/api/generated/acid';
import {
  ListTb303PatternsParams,
  PaginatedResponseTB303PatternSummary,
  TB303Pattern,
} from '@/api/generated/model';
import {
  TB303PatternSchema,
  TB303PatternSchemaType,
} from '@/features/pattern-editor/tb303-pattern-schema';
import { runWithAmplifyServerContext } from '@/utils/amplify-server-utils';

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

export async function getTB303PatternsList(
  params: ListTb303PatternsParams,
  context: NextServer.Context,
): Promise<PaginatedResponseTB303PatternSummary> {
  return await runWithAmplifyServerContext({
    nextServerContext: context,
    operation: async contextSpec => {
      try {
        const session = await fetchAuthSession(contextSpec);
        const idToken = session.tokens?.idToken?.toString();

        if (!idToken) {
          throw new Error('No access token found in session');
        }

        const patterns = await listTb303Patterns(params, {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });

        return patterns;
      } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch TB-303 patterns list');
      }
    },
  });
}

export function parseTB303Pattern(
  pattern: TB303Pattern,
): TB303PatternSchemaType {
  return TB303PatternSchema.parse(pattern) as TB303PatternSchemaType;
}
