import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import { ConfirmSignupFormSchema } from './confirm-signup-schema';

describe('ConfirmSignupFormSchema', () => {
  describe('code', () => {
    it('fails when code is not 6 digits', () => {
      const result = ConfirmSignupFormSchema.safeParse({
        username: 'testuser',
        code: '12345',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(z.flattenError(result.error).fieldErrors.code).toBeDefined();
      }
    });
  });
});
