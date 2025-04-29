import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import * as cognitoActions from '@/app/lib/cognito-actions';
import { render, screen } from '@/tests/utils';

vi.mock('@/app/lib/cognito-actions', async () => {
  return {
    handleConfirmSignUp: vi.fn(),
    handleSendEmailVerificationCode: vi.fn(),
  };
});

vi.mock('next/navigation', async () => {
  return {
    useRouter: () => ({
      push: vi.fn(),
    }),
  };
});

import { ConfirmSignupForm } from './confirm-signup-form';

describe('ConfirmSignupForm', () => {
  const username = 'testuser';

  it('renders all form fields with labels', () => {
    render(<ConfirmSignupForm username={username} />);

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/verification code/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Resend Verification Code/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Confirm/i }),
    ).toBeInTheDocument();
  });

  it('pre-fills the username input', () => {
    render(<ConfirmSignupForm username={username} />);
    const usernameInput = screen.getByRole('textbox', {
      name: /username/i,
    }) as HTMLInputElement;
    expect(usernameInput.value).toBe('testuser');
  });

  it('disables the username field', () => {
    render(<ConfirmSignupForm username={username} />);
    const usernameInput = screen.getByRole('textbox', {
      name: /username/i,
    }) as HTMLInputElement;
    expect(usernameInput).toBeDisabled();
  });

  it('shows errors when fields are empty', async () => {
    render(<ConfirmSignupForm username={username} />);

    const submitButton = screen.getByRole('button', {
      name: /Confirm/i,
    });
    await userEvent.click(submitButton);

    expect(screen.getByText(/code is required/i)).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    vi.mocked(cognitoActions.handleConfirmSignUp).mockResolvedValue({
      error: '',
    });
    render(<ConfirmSignupForm username={username} />);
    const codeInput = screen.getByLabelText(/verification code/i);
    const submitButton = screen.getByRole('button', {
      name: /Confirm/i,
    });
    await userEvent.type(codeInput, '123456');
    await userEvent.click(submitButton);
    expect(cognitoActions.handleConfirmSignUp).toHaveBeenCalledWith({
      username,
      code: '123456',
    });
  });

  it('shows button loading state when submitting', async () => {
    vi.mocked(cognitoActions.handleConfirmSignUp).mockImplementation(
      () =>
        new Promise(resolve => {
          setTimeout(() => {
            resolve({ error: '' });
          }, 100);
        }),
    );

    render(<ConfirmSignupForm username={username} />);
    const codeInput = screen.getByLabelText(/verification code/i);
    const submitButton = screen.getByRole('button', {
      name: /Confirm/i,
    });
    await userEvent.type(codeInput, '123456');
    await userEvent.click(submitButton);
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent(/confirming/i);
  });

  it('shows API error message', async () => {
    const errorMessage = 'An error occurred';
    vi.mocked(cognitoActions.handleConfirmSignUp).mockResolvedValue({
      error: errorMessage,
    });
    render(<ConfirmSignupForm username={username} />);
    const codeInput = screen.getByLabelText(/verification code/i);
    const submitButton = screen.getByRole('button', {
      name: /Confirm/i,
    });
    await userEvent.type(codeInput, '123456');
    await userEvent.click(submitButton);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('resends the verification code', async () => {
    vi.mocked(cognitoActions.handleSendEmailVerificationCode).mockResolvedValue(
      {
        success: 'code sent',
      },
    );
    render(<ConfirmSignupForm username={username} />);
    const resendButton = screen.getByRole('button', {
      name: /Resend Verification Code/i,
    });
    await userEvent.click(resendButton);
    expect(cognitoActions.handleSendEmailVerificationCode).toHaveBeenCalledWith(
      username,
    );
    expect(screen.getByText('code sent')).toBeInTheDocument();
  });
});
