import { confirmSignUp } from 'aws-amplify/auth';
import { redirect } from 'next/navigation';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { confirmSignUpAction } from './confirm-signup-action';

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

vi.mock('aws-amplify/auth', () => ({
  confirmSignUp: vi.fn(),
}));

describe('confirmSignUpAction', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('redirects to login page on success', async () => {
    vi.mocked(confirmSignUp).mockResolvedValue({
      nextStep: {
        signUpStep: 'DONE',
      },
      isSignUpComplete: true,
    });

    const formData = new FormData();
    formData.append('username', 'testuser');
    formData.append('code', '123456');

    await confirmSignUpAction({}, formData);

    expect(redirect).toHaveBeenCalledWith(
      '/auth/signin?confirmed=true&username=testuser',
    );
  });

  it('returns an error if confirmation code is invalid', async () => {
    const codeError = new Error('Invalid confirmation code.');
    codeError.name = 'CodeMismatchException';
    vi.mocked(confirmSignUp).mockRejectedValue(codeError);

    const formData = new FormData();
    formData.append('username', 'testuser');
    formData.append('code', '123456');

    const result = await confirmSignUpAction({}, formData);

    expect(result).toEqual({
      formErrors: ['Invalid confirmation code. Please try again.'],
      data: {
        username: 'testuser',
        code: '123456',
      },
    });
    expect(redirect).not.toHaveBeenCalled();
  });

  it('returns an error if user is not found', async () => {
    const userNotFoundError = new Error('User not found.');
    userNotFoundError.name = 'UserNotFoundException';
    vi.mocked(confirmSignUp).mockRejectedValue(userNotFoundError);

    const formData = new FormData();
    formData.append('username', 'testuser');
    formData.append('code', '123456');

    const result = await confirmSignUpAction({}, formData);

    expect(result).toEqual({
      formErrors: ['User not found.'],
      data: {
        username: 'testuser',
        code: '123456',
      },
    });
    expect(redirect).not.toHaveBeenCalled();
  });

  it('returns an error if user is already confirmed', async () => {
    const notAuthorizedException = new Error('User already confirmed.');
    notAuthorizedException.name = 'NotAuthorizedException';
    vi.mocked(confirmSignUp).mockRejectedValue(notAuthorizedException);

    const formData = new FormData();
    formData.append('username', 'testuser');
    formData.append('code', '123456');

    const result = await confirmSignUpAction({}, formData);

    expect(result).toEqual({
      formErrors: ['User already confirmed.'],
      data: {
        username: 'testuser',
        code: '123456',
      },
    });
    expect(redirect).not.toHaveBeenCalled();
  });
});
