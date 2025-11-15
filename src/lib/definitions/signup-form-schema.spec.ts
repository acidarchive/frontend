import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import { SignupFormSchema } from './signup-form-schema';

describe('SignupFormSchema', () => {
  describe('username', () => {
    it('fails when username is empty', () => {
      const result = SignupFormSchema.safeParse({
        username: '',
        email: 'test@example.com',
        password: 'Password123!',
        confirmPassword: 'Password123!',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(z.flattenError(result.error).fieldErrors.username).toBeDefined();
      }
    });

    it('fails when username is less than 2 characters', () => {
      const result = SignupFormSchema.safeParse({
        username: 'a',
        email: 'test@example.com',
        password: 'Password123!',
        confirmPassword: 'Password123!',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(z.flattenError(result.error).fieldErrors.username).toContain(
          'Username must be at least 2 characters long.',
        );
      }
    });

    it('pass with valid username', () => {
      const result = SignupFormSchema.safeParse({
        username: 'testuser',
        email: 'test@example.com',
        password: 'Password123!',
        confirmPassword: 'Password123!',
      });

      expect(result.success).toBe(true);
    });
  });

  describe('email', () => {
    it('fails when email is empty', () => {
      const result = SignupFormSchema.safeParse({
        username: 'testuser',
        email: '',
        password: 'Password123!',
        confirmPassword: 'Password123!',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(z.flattenError(result.error).fieldErrors.email).toBeDefined();
      }
    });

    it('fails when email format is invalid', () => {
      const result = SignupFormSchema.safeParse({
        username: 'testuser',
        email: 'invalid-email',
        password: 'Password123!',
        confirmPassword: 'Password123!',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(z.flattenError(result.error).fieldErrors.email).toContain(
          'Please enter a valid email.',
        );
      }
    });

    it('pass with valid email', () => {
      const result = SignupFormSchema.safeParse({
        username: 'testuser',
        email: 'test@example.com',
        password: 'Password123!',
        confirmPassword: 'Password123!',
      });

      expect(result.success).toBe(true);
    });
  });

  describe('password', () => {
    it('fails when password is empty', () => {
      const result = SignupFormSchema.safeParse({
        username: 'testuser',
        email: 'test@example.com',
        password: '',
        confirmPassword: '',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(z.flattenError(result.error).fieldErrors.password).toBeDefined();
      }
    });

    it('fails when password is less than 8 characters', () => {
      const result = SignupFormSchema.safeParse({
        username: 'testuser',
        email: 'test@example.com',
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
      const result = SignupFormSchema.safeParse({
        username: 'testuser',
        email: 'test@example.com',
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
      const result = SignupFormSchema.safeParse({
        username: 'testuser',
        email: 'test@example.com',
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
      const result = SignupFormSchema.safeParse({
        username: 'testuser',
        email: 'test@example.com',
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

    it('pass with valid password', () => {
      const result = SignupFormSchema.safeParse({
        username: 'testuser',
        email: 'test@example.com',
        password: 'Password123!',
        confirmPassword: 'Password123!',
      });

      expect(result.success).toBe(true);
    });
  });

  describe('confirmPassword', () => {
    it('fails when confirmPassword is empty', () => {
      const result = SignupFormSchema.safeParse({
        username: 'testuser',
        email: 'test@example.com',
        password: 'Password123!',
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
      const result = SignupFormSchema.safeParse({
        username: 'testuser',
        email: 'test@example.com',
        password: 'Password123!',
        confirmPassword: 'Different123!',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(
          z.flattenError(result.error).fieldErrors.confirmPassword,
        ).toContain('Passwords do not match.');
      }
    });

    it('pass when passwords match', () => {
      const result = SignupFormSchema.safeParse({
        username: 'testuser',
        email: 'test@example.com',
        password: 'Password123!',
        confirmPassword: 'Password123!',
      });

      expect(result.success).toBe(true);
    });
  });
});
