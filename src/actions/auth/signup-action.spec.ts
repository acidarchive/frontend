import { signUp } from 'aws-amplify/auth';
import { redirect } from 'next/navigation';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { signupAction } from './signup-action';

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

vi.mock('aws-amplify/auth', () => ({
  signUp: vi.fn(),
}));

describe('signupAction', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('redirects to confirmation page on success', async () => {
    vi.mocked(signUp).mockResolvedValue({
      isSignUpComplete: false,
      nextStep: {
        signUpStep: 'CONFIRM_SIGN_UP',
        codeDeliveryDetails: {
          destination: 'test-destination',
        },
      },
      userId: 'test-user-id',
    });

    const formData = new FormData();
    formData.append('username', 'testuser');
    formData.append('email', 'test@example.com');
    formData.append('password', 'Password123!');
    formData.append('confirmPassword', 'Password123!');

    await signupAction({}, formData);

    expect(redirect).toHaveBeenCalledWith(
      '/auth/confirm-signup?username=testuser',
    );
  });

  it('returns an error if username is taken', async () => {
    const usernameError = new Error('Username already exists');
    usernameError.name = 'UsernameExistsException';
    vi.mocked(signUp).mockRejectedValue(usernameError);

    const formData = new FormData();
    formData.append('username', 'existinguser');
    formData.append('email', 'test@example.com');
    formData.append('password', 'Password123!');
    formData.append('confirmPassword', 'Password123!');

    const result = await signupAction({}, formData);

    expect(result).toEqual({
      formErrors: ['Username already exists.'],
      data: {
        username: 'existinguser',
        email: 'test@example.com',
        password: 'Password123!',
        confirmPassword: 'Password123!',
      },
    });
    expect(redirect).not.toHaveBeenCalled();
  });
});
