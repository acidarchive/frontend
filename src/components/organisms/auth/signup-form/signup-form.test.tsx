import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import * as cognitoActions from '@/lib/cognito-actions';

import { SignupForm } from './signup-form';

vi.mock('@/lib/cognito-actions', async () => {
  return {
    handleSignUp: vi.fn(),
  };
});

describe('SignupForm', () => {
  it('renders all form fields with labels', () => {
    render(<SignupForm />);

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^confirm password/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Sign up/i }),
    ).toBeInTheDocument();
  });

  it('shows errors when fields are empty', async () => {
    render(<SignupForm />);

    const submitButton = screen.getByRole('button', {
      name: /Sign up/i,
    });
    await userEvent.click(submitButton);

    expect(screen.getByText(/username is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });

  it('shows error when passwords do not match', async () => {
    render(<SignupForm />);

    await userEvent.type(screen.getByLabelText(/^password/i), 'password123');
    await userEvent.type(
      screen.getByLabelText(/^confirm password/i),
      'differentPassword',
    );

    const submitButton = screen.getByRole('button', {
      name: /Sign up/i,
    });
    await userEvent.click(submitButton);

    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    vi.mocked(cognitoActions.handleSignUp).mockResolvedValue({
      error: '',
    });

    render(<SignupForm />);
    await userEvent.type(screen.getByLabelText(/username/i), 'testuser');
    await userEvent.type(
      screen.getByLabelText(/email address/i),
      'fake@fake.com',
    );
    await userEvent.type(screen.getByLabelText(/^password/i), 'Password123!');
    await userEvent.type(
      screen.getByLabelText(/^confirm password/i),
      'Password123!',
    );
    const submitButton = screen.getByRole('button', {
      name: /Sign up/i,
    });
    await userEvent.click(submitButton);
    expect(cognitoActions.handleSignUp).toHaveBeenCalledWith({
      username: 'testuser',
      email: 'fake@fake.com',
      password: 'Password123!',
      confirmPassword: 'Password123!',
    });
  });

  it('shows button loading state while submitting', async () => {
    vi.mocked(cognitoActions.handleSignUp).mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ error: '' });
        }, 100);
      });
    });

    render(<SignupForm />);

    await userEvent.type(screen.getByLabelText(/username/i), 'testuser');
    await userEvent.type(
      screen.getByLabelText(/email address/i),
      'fake@fake.com',
    );
    await userEvent.type(screen.getByLabelText(/^password/i), 'Password123!');
    await userEvent.type(
      screen.getByLabelText(/^confirm password/i),
      'Password123!',
    );
    const submitButton = screen.getByRole('button', {
      name: /Sign up/i,
    });
    await userEvent.click(submitButton);

    expect(screen.getByText('Signing up...')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('shows API error messages', async () => {
    const errorMessage = 'An error occurred';
    vi.mocked(cognitoActions.handleSignUp).mockResolvedValue({
      error: errorMessage,
    });

    render(<SignupForm />);

    await userEvent.type(screen.getByLabelText(/username/i), 'testuser');
    await userEvent.type(
      screen.getByLabelText(/email address/i),
      'fake@fake.com',
    );
    await userEvent.type(screen.getByLabelText(/^password/i), 'Password123!');
    await userEvent.type(
      screen.getByLabelText(/^confirm password/i),
      'Password123!',
    );
    const submitButton = screen.getByRole('button', {
      name: /Sign up/i,
    });
    await userEvent.click(submitButton);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
