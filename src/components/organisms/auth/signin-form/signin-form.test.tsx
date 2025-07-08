import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import * as cognitoActions from '@/lib/cognito-actions';
import { render, screen } from '@/tests/utils';

import { SigninForm } from './signin-form';

vi.mock('@/lib/cognito-actions', async () => {
  return {
    handleSignIn: vi.fn(),
  };
});

vi.mock('next/navigation', () => {
  return {
    useRouter: () => ({
      push: vi.fn(),
    }),
  };
});

describe('SigninForm', () => {
  it('renders all form fields with labels', () => {
    render(<SigninForm />);

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Sign in/i }),
    ).toBeInTheDocument();
  });

  it('shows errors when fields are empty', async () => {
    render(<SigninForm />);

    const submitButton = screen.getByRole('button', {
      name: /Sign in/i,
    });
    await userEvent.click(submitButton);

    expect(screen.getByText(/username is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    render(<SigninForm />);

    const usernameInput = screen.getByRole('textbox', {
      name: /username/i,
    }) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      /password/i,
    ) as HTMLInputElement;
    const submitButton = screen.getByRole('button', {
      name: /Sign in/i,
    });

    await userEvent.type(usernameInput, 'testuser');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(submitButton);

    expect(cognitoActions.handleSignIn).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'password123',
    });
  });

  it('shows button loading state while submitting', async () => {
    vi.mocked(cognitoActions.handleSignIn).mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ error: '' });
        }, 100);
      });
    });

    render(<SigninForm />);

    const usernameInput = screen.getByRole('textbox', {
      name: /username/i,
    }) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      /password/i,
    ) as HTMLInputElement;
    const submitButton = screen.getByRole('button', {
      name: /Sign in/i,
    });

    await userEvent.type(usernameInput, 'testuser');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
  });

  it('shows API error message', async () => {
    vi.mocked(cognitoActions.handleSignIn).mockResolvedValue({
      error: 'Invalid credentials',
    });

    render(<SigninForm />);

    const usernameInput = screen.getByRole('textbox', {
      name: /username/i,
    }) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      /password/i,
    ) as HTMLInputElement;
    const submitButton = screen.getByRole('button', {
      name: /Sign in/i,
    });

    await userEvent.type(usernameInput, 'testuser');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(submitButton);

    expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
  });
});
