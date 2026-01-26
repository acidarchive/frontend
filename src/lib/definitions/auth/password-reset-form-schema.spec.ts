import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import { PasswordResetFormSchema } from './password-reset-form-schema';

describe('PasswordResetFormSchema', () => {
  const validData = {
    email: 'test@example.com',
  };

  describe('email', () => {
    it('fails when email is empty', () => {
      const result = PasswordResetFormSchema.safeParse({
        ...validData,
        email: '',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(z.flattenError(result.error).fieldErrors.email).toBeDefined();
      }
    });

    it('fails when email format is invalid', () => {
      const result = PasswordResetFormSchema.safeParse({
        ...validData,
        email: 'invalid-email',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(z.flattenError(result.error).fieldErrors.email).toContain(
          'Please enter a valid email.',
        );
      }
    });

    it('passes with valid email', () => {
      const result = PasswordResetFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });
});
