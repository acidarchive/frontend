import { resetPassword } from 'aws-amplify/auth';
import { redirect } from 'next/navigation';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { resetPasswordAction } from './reset-password-action';

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

vi.mock('aws-amplify/auth', () => ({
  resetPassword: vi.fn(),
}));

const createFormData = (email: string) => {
  const formData = new FormData();
  formData.append('email', email);
  return formData;
};

describe('resetPasswordAction', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('redirects to confirm page on success', async () => {
    vi.mocked(resetPassword).mockResolvedValue({
      isPasswordReset: false,
      nextStep: {
        resetPasswordStep: 'CONFIRM_RESET_PASSWORD_WITH_CODE',
        codeDeliveryDetails: {
          destination: 'test@example.com',
          deliveryMedium: 'EMAIL',
          attributeName: 'email',
        },
      },
    });

    const formData = createFormData('test@example.com');

    await resetPasswordAction({}, formData);

    expect(resetPassword).toHaveBeenCalledWith({
      username: 'test@example.com',
    });
    expect(redirect).toHaveBeenCalledWith(
      '/auth/reset-password/confirm?email=test%40example.com',
    );
  });

  it('returns validation error for invalid email', async () => {
    const formData = createFormData('invalid-email');

    const result = await resetPasswordAction({}, formData);

    expect(result.fieldErrors?.email).toBeDefined();
    expect(resetPassword).not.toHaveBeenCalled();
  });

  it('returns validation error for empty email', async () => {
    const formData = createFormData('');

    const result = await resetPasswordAction({}, formData);

    expect(result.fieldErrors?.email).toBeDefined();
    expect(resetPassword).not.toHaveBeenCalled();
  });

  it('returns an error when user is not found', async () => {
    const error = new Error('User not found');
    error.name = 'UserNotFoundException';
    vi.mocked(resetPassword).mockRejectedValue(error);

    const formData = createFormData('notfound@example.com');

    const result = await resetPasswordAction({}, formData);

    expect(result).toEqual({
      formErrors: ['User not found.'],
      data: { email: 'notfound@example.com' },
    });
    expect(redirect).not.toHaveBeenCalled();
  });

  it('returns an error for too many attempts', async () => {
    const error = new Error('Too many attempts');
    error.name = 'LimitExceededException';
    vi.mocked(resetPassword).mockRejectedValue(error);

    const formData = createFormData('test@example.com');

    const result = await resetPasswordAction({}, formData);

    expect(result).toEqual({
      formErrors: ['Too many attempts. Please try again later.'],
      data: { email: 'test@example.com' },
    });
    expect(redirect).not.toHaveBeenCalled();
  });

  it('returns a generic error for unknown errors', async () => {
    const error = new Error('Unknown error');
    vi.mocked(resetPassword).mockRejectedValue(error);

    const formData = createFormData('test@example.com');

    const result = await resetPasswordAction({}, formData);

    expect(result).toEqual({
      formErrors: ['Unknown error'],
      data: { email: 'test@example.com' },
    });
    expect(redirect).not.toHaveBeenCalled();
  });
});
