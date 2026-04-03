import { confirmResetPassword } from 'aws-amplify/auth';
import { redirect } from 'next/navigation';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { confirmPasswordResetAction } from './confirm-password-reset-action';

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

vi.mock('aws-amplify/auth', () => ({
  confirmResetPassword: vi.fn(),
}));

const createFormData = (data: {
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
}) => {
  const formData = new FormData();
  formData.append('email', data.email);
  formData.append('code', data.code);
  formData.append('password', data.password);
  formData.append('confirmPassword', data.confirmPassword);
  return formData;
};

describe('confirmPasswordResetAction', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const validFormData = {
    email: 'test@example.com',
    code: '123456',
    password: 'Password123!',
    confirmPassword: 'Password123!',
  };

  it('redirects to signin page on success', async () => {
    vi.mocked(confirmResetPassword).mockResolvedValue(undefined);

    const formData = createFormData(validFormData);

    await confirmPasswordResetAction({}, formData);

    expect(confirmResetPassword).toHaveBeenCalledWith({
      username: 'test@example.com',
      confirmationCode: '123456',
      newPassword: 'Password123!',
    });
    expect(redirect).toHaveBeenCalledWith('/auth/signin');
  });

  it('returns validation errors for invalid email', async () => {
    const formData = createFormData({
      ...validFormData,
      email: 'invalid-email',
    });

    const result = await confirmPasswordResetAction({}, formData);

    expect(result.fieldErrors?.email).toBeDefined();
    expect(confirmResetPassword).not.toHaveBeenCalled();
  });

  it('returns validation errors for invalid code', async () => {
    const formData = createFormData({
      ...validFormData,
      code: '12345',
    });

    const result = await confirmPasswordResetAction({}, formData);

    expect(result.fieldErrors?.code).toBeDefined();
    expect(confirmResetPassword).not.toHaveBeenCalled();
  });

  it('returns validation errors when passwords do not match', async () => {
    const formData = createFormData({
      ...validFormData,
      confirmPassword: 'Different123!',
    });

    const result = await confirmPasswordResetAction({}, formData);

    expect(result.fieldErrors?.confirmPassword).toContain(
      'Passwords do not match.',
    );
    expect(confirmResetPassword).not.toHaveBeenCalled();
  });

  it('returns an error for invalid verification code', async () => {
    const error = new Error('Invalid verification code');
    error.name = 'CodeMismatchException';
    vi.mocked(confirmResetPassword).mockRejectedValue(error);

    const formData = createFormData(validFormData);

    const result = await confirmPasswordResetAction({}, formData);

    expect(result).toEqual({
      formErrors: ['Invalid verification code.'],
      data: validFormData,
    });
    expect(redirect).not.toHaveBeenCalled();
  });

  it('returns an error for expired verification code', async () => {
    const error = new Error('Code expired');
    error.name = 'ExpiredCodeException';
    vi.mocked(confirmResetPassword).mockRejectedValue(error);

    const formData = createFormData(validFormData);

    const result = await confirmPasswordResetAction({}, formData);

    expect(result).toEqual({
      formErrors: ['Verification code has expired. Request a new one.'],
      data: validFormData,
    });
    expect(redirect).not.toHaveBeenCalled();
  });

  it('returns an error for too many attempts', async () => {
    const error = new Error('Too many attempts');
    error.name = 'LimitExceededException';
    vi.mocked(confirmResetPassword).mockRejectedValue(error);

    const formData = createFormData(validFormData);

    const result = await confirmPasswordResetAction({}, formData);

    expect(result).toEqual({
      formErrors: ['Too many attempts. Please try again later.'],
      data: validFormData,
    });
    expect(redirect).not.toHaveBeenCalled();
  });

  it('returns a generic error for unknown errors', async () => {
    const error = new Error('Unknown error');
    vi.mocked(confirmResetPassword).mockRejectedValue(error);

    const formData = createFormData(validFormData);

    const result = await confirmPasswordResetAction({}, formData);

    expect(result).toEqual({
      formErrors: ['Unknown error'],
      data: validFormData,
    });
    expect(redirect).not.toHaveBeenCalled();
  });
});
