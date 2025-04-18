import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import * as cognitoActions from '@/app/lib/cognito-actions';

import { ConfirmPasswordResetForm } from './confirm-password-reset-form';

vi.mock('@/app/lib/cognito-actions', async () => {
  return {
    handleConfirmResetPassword: vi.fn(),
  };
});

describe('ConfirmPasswordResetForm', () => {
  const email = 'test@example.com';

  it('renders all form fields with labels', () => {
    render(<ConfirmPasswordResetForm email={email} />);

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/verification code/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/new password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /reset password/i }),
    ).toBeInTheDocument();
  });

  it('pre-fills the email input', () => {
    render(<ConfirmPasswordResetForm email={email} />);
    const emailInput = screen.getByRole('textbox', {
      name: /email address/i,
    }) as HTMLInputElement;
    expect(emailInput.value).toBe(email);
  });

  it('disables the email field', () => {
    render(<ConfirmPasswordResetForm email={email} />);
    const emailInput = screen.getByRole('textbox', {
      name: /email address/i,
    }) as HTMLInputElement;
    expect(emailInput).toBeDisabled();
  });

  it('shows errors when fields are empty', async () => {
    render(<ConfirmPasswordResetForm email={email} />);

    const submitButton = screen.getByRole('button', {
      name: /reset password/i,
    });
    await userEvent.click(submitButton);

    expect(screen.getByText(/code is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    expect(
      screen.getByText(/please confirm your password/i),
    ).toBeInTheDocument();
  });

  it('shows error when passwords do not match', async () => {
    render(<ConfirmPasswordResetForm email={email} />);

    await userEvent.type(screen.getByLabelText(/verification code/i), '123456');
    await userEvent.type(
      screen.getByLabelText(/new password/i),
      'Password123!',
    );
    await userEvent.type(
      screen.getByLabelText(/confirm password/i),
      'Password1234!',
    );

    const submitButton = screen.getByRole('button', {
      name: /reset password/i,
    });
    await userEvent.click(submitButton);

    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    vi.mocked(cognitoActions.handleConfirmResetPassword).mockResolvedValue({
      error: '',
    });

    render(<ConfirmPasswordResetForm email={email} />);

    await userEvent.type(screen.getByLabelText(/verification code/i), '123456');
    await userEvent.type(
      screen.getByLabelText(/new password/i),
      'Password123!',
    );
    await userEvent.type(
      screen.getByLabelText(/confirm password/i),
      'Password123!',
    );

    const submitButton = screen.getByRole('button', {
      name: /reset password/i,
    });

    await userEvent.click(submitButton);

    expect(cognitoActions.handleConfirmResetPassword).toHaveBeenCalledWith({
      email,
      code: '123456',
      password: 'Password123!',
      confirmPassword: 'Password123!',
    });
  });

  it('shows button loading state while submitting', async () => {
    vi.mocked(cognitoActions.handleConfirmResetPassword).mockImplementation(
      () => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve({ error: '' });
          }, 100);
        });
      },
    );

    render(<ConfirmPasswordResetForm email={email} />);

    await userEvent.type(screen.getByLabelText(/verification code/i), '123456');
    await userEvent.type(
      screen.getByLabelText(/new password/i),
      'Password123!',
    );
    await userEvent.type(
      screen.getByLabelText(/confirm password/i),
      'Password123!',
    );

    const submitButton = screen.getByRole('button', {
      name: /reset password/i,
    });
    await userEvent.click(submitButton);

    expect(screen.getByText('Resetting...')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('shows API error messages', async () => {
    const errorMessage = 'Invalid verification code';
    vi.mocked(cognitoActions.handleConfirmResetPassword).mockResolvedValue({
      error: errorMessage,
    });

    render(<ConfirmPasswordResetForm email={email} />);

    await userEvent.type(screen.getByLabelText(/verification code/i), '123456');
    await userEvent.type(
      screen.getByLabelText(/new password/i),
      'Password123!',
    );
    await userEvent.type(
      screen.getByLabelText(/confirm password/i),
      'Password123!',
    );

    const submitButton = screen.getByRole('button', {
      name: /reset password/i,
    });
    await userEvent.click(submitButton);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
