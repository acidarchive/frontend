import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import { ConfirmPasswordResetFormSchema } from './confirm-password-reset-form-schema';

describe('ConfirmPasswordResetFormSchema', () => {
  const validData = {
    email: 'test@example.com',
    code: '123456',
    password: 'Password123!',
    confirmPassword: 'Password123!',
  };

  describe('email', () => {
    it('fails when email is empty', () => {
      const result = ConfirmPasswordResetFormSchema.safeParse({
        ...validData,
        email: '',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(z.flattenError(result.error).fieldErrors.email).toBeDefined();
      }
    });

    it('fails when email format is invalid', () => {
      const result = ConfirmPasswordResetFormSchema.safeParse({
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
      const result = ConfirmPasswordResetFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  describe('code', () => {
    it('fails when code is empty', () => {
      const result = ConfirmPasswordResetFormSchema.safeParse({
        ...validData,
        code: '',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(z.flattenError(result.error).fieldErrors.code).toBeDefined();
      }
    });

    it('fails when code is not 6 digits', () => {
      const result = ConfirmPasswordResetFormSchema.safeParse({
        ...validData,
        code: '12345',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(z.flattenError(result.error).fieldErrors.code).toContain(
          'Verification code must be 6 digits.',
        );
      }
    });

    it('fails when code contains non-numeric characters', () => {
      const result = ConfirmPasswordResetFormSchema.safeParse({
        ...validData,
        code: '12345a',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(z.flattenError(result.error).fieldErrors.code).toContain(
          'Verification code must contain only numbers.',
        );
      }
    });

    it('passes with valid 6-digit code', () => {
      const result = ConfirmPasswordResetFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  describe('password', () => {
    it('fails when password is empty', () => {
      const result = ConfirmPasswordResetFormSchema.safeParse({
        ...validData,
        password: '',
        confirmPassword: '',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(z.flattenError(result.error).fieldErrors.password).toBeDefined();
      }
    });

    it('fails when password is less than 8 characters', () => {
      const result = ConfirmPasswordResetFormSchema.safeParse({
        ...validData,
        password: 'Pass1!',
        confirmPassword: 'Pass1!',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(z.flattenError(result.error).fieldErrors.password).toContain(
          'Password must be at least 8 characters long.',
        );
      }
    });

    it('fails when password has no letters', () => {
      const result = ConfirmPasswordResetFormSchema.safeParse({
        ...validData,
        password: '12345678!',
        confirmPassword: '12345678!',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(z.flattenError(result.error).fieldErrors.password).toContain(
          'Password must contain at least one letter.',
        );
      }
    });

    it('fails when password has no numbers', () => {
      const result = ConfirmPasswordResetFormSchema.safeParse({
        ...validData,
        password: 'Password!',
        confirmPassword: 'Password!',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(z.flattenError(result.error).fieldErrors.password).toContain(
          'Password must contain at least one number.',
        );
      }
    });

    it('fails when password has no special characters', () => {
      const result = ConfirmPasswordResetFormSchema.safeParse({
        ...validData,
        password: 'Password123',
        confirmPassword: 'Password123',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(z.flattenError(result.error).fieldErrors.password).toContain(
          'Password must contain at least one special character.',
        );
      }
    });

    it('passes with valid password', () => {
      const result = ConfirmPasswordResetFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  describe('confirmPassword', () => {
    it('fails when confirmPassword is empty', () => {
      const result = ConfirmPasswordResetFormSchema.safeParse({
        ...validData,
        confirmPassword: '',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(
          z.flattenError(result.error).fieldErrors.confirmPassword,
        ).toBeDefined();
      }
    });

    it('fails when passwords do not match', () => {
      const result = ConfirmPasswordResetFormSchema.safeParse({
        ...validData,
        confirmPassword: 'Different123!',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(
          z.flattenError(result.error).fieldErrors.confirmPassword,
        ).toContain('Passwords do not match.');
      }
    });

    it('passes when passwords match', () => {
      const result = ConfirmPasswordResetFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });
});
