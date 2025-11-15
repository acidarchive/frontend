import { resendSignUpCode } from 'aws-amplify/auth';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { resendSignupCodeAction } from './resend-signup-code-action';

vi.mock('aws-amplify/auth', () => ({
  resendSignUpCode: vi.fn(),
}));

describe('resendSignupAction', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns a success message', async () => {
    vi.mocked(resendSignUpCode).mockResolvedValue({});

    const formData = new FormData();
    formData.append('username', 'testuser');

    const result = await resendSignupCodeAction({}, formData);

    expect(result).toEqual({
      message: 'Verification code sent successfully!',
      data: { username: 'testuser', code: '' },
    });
  });

  it('returns an error message', async () => {
    const error = new Error('Failed to resend code');
    vi.mocked(resendSignUpCode).mockRejectedValue(error);

    const formData = new FormData();
    formData.append('username', 'testuser');

    const result = await resendSignupCodeAction({}, formData);

    expect(result).toEqual({
      formErrors: ['Failed to resend code. Please try again.'],
      data: { username: 'testuser', code: '' },
    });
  });
});
