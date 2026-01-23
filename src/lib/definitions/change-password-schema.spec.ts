import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import { ChangePasswordSchema } from './change-password-schema';

describe('ChangePasswordSchema', () => {
  const validData = {
    currentPassword: 'OldPassword123!',
    newPassword: 'NewPassword123!',
    confirmNewPassword: 'NewPassword123!',
  };

  describe('currentPassword', () => {
    it('fails when currentPassword is empty', () => {
      const result = ChangePasswordSchema.safeParse({
        ...validData,
        currentPassword: '',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(
          z.flattenError(result.error).fieldErrors.currentPassword,
        ).toBeDefined();
      }
    });

    it('passes with any non-empty currentPassword', () => {
      const result = ChangePasswordSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  describe('newPassword', () => {
    it('fails when newPassword is empty', () => {
      const result = ChangePasswordSchema.safeParse({
        ...validData,
        newPassword: '',
        confirmNewPassword: '',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(
          z.flattenError(result.error).fieldErrors.newPassword,
        ).toBeDefined();
      }
    });

    it('fails when newPassword is less than 8 characters', () => {
      const result = ChangePasswordSchema.safeParse({
        ...validData,
        newPassword: 'Pass1!',
        confirmNewPassword: 'Pass1!',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(z.flattenError(result.error).fieldErrors.newPassword).toContain(
          'Password must be at least 8 characters long.',
        );
      }
    });

    it('fails when newPassword has no letters', () => {
      const result = ChangePasswordSchema.safeParse({
        ...validData,
        newPassword: '12345678!',
        confirmNewPassword: '12345678!',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(z.flattenError(result.error).fieldErrors.newPassword).toContain(
          'Password must contain at least one letter.',
        );
      }
    });

    it('fails when newPassword has no numbers', () => {
      const result = ChangePasswordSchema.safeParse({
        ...validData,
        newPassword: 'Password!',
        confirmNewPassword: 'Password!',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(z.flattenError(result.error).fieldErrors.newPassword).toContain(
          'Password must contain at least one number.',
        );
      }
    });

    it('fails when newPassword has no special characters', () => {
      const result = ChangePasswordSchema.safeParse({
        ...validData,
        newPassword: 'Password123',
        confirmNewPassword: 'Password123',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(z.flattenError(result.error).fieldErrors.newPassword).toContain(
          'Password must contain at least one special character.',
        );
      }
    });

    it('passes with valid newPassword', () => {
      const result = ChangePasswordSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  describe('confirmNewPassword', () => {
    it('fails when confirmNewPassword is empty', () => {
      const result = ChangePasswordSchema.safeParse({
        ...validData,
        confirmNewPassword: '',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(
          z.flattenError(result.error).fieldErrors.confirmNewPassword,
        ).toBeDefined();
      }
    });

    it('fails when passwords do not match', () => {
      const result = ChangePasswordSchema.safeParse({
        ...validData,
        confirmNewPassword: 'DifferentPassword123!',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(
          z.flattenError(result.error).fieldErrors.confirmNewPassword,
        ).toContain('Passwords do not match.');
      }
    });

    it('passes when passwords match', () => {
      const result = ChangePasswordSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });
});
