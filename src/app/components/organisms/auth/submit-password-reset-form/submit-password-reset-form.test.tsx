import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import * as cognitoActions from '@/app/lib/cognito-actions';

import { SubmitPasswordResetForm } from './submit-password-reset-form';

vi.mock('@/app/lib/cognito-actions', async () => {
  return {
    handleResetPassword: vi.fn(),
  };
});

describe('SubmitPasswordResetForm', () => {
  it('renders all form fields with labels', () => {
    render(<SubmitPasswordResetForm />);

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Send code/i }),
    ).toBeInTheDocument();
  });

  it('shows errors when fields are empty', async () => {
    render(<SubmitPasswordResetForm />);

    const submitButton = screen.getByRole('button', {
      name: /Send code/i,
    });
    await userEvent.click(submitButton);

    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    vi.mocked(cognitoActions.handleResetPassword).mockResolvedValue({
      error: '',
    });

    render(<SubmitPasswordResetForm />);

    await userEvent.type(screen.getByLabelText(/email/i), 'fake@fake.com');
    const submitButton = screen.getByRole('button', {
      name: /Send code/i,
    });
    await userEvent.click(submitButton);

    expect(cognitoActions.handleResetPassword).toHaveBeenCalledWith({
      email: 'fake@fake.com',
    });
  });

  it('shows button loading state while submitting', async () => {
    vi.mocked(cognitoActions.handleResetPassword).mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ error: '' });
        }, 100);
      });
    });

    render(<SubmitPasswordResetForm />);

    await userEvent.type(screen.getByLabelText(/email/i), 'fake@fake.com');
    const submitButton = screen.getByRole('button', {
      name: /Send code/i,
    });
    await userEvent.click(submitButton);

    expect(screen.getByText('Sending...')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });
});
