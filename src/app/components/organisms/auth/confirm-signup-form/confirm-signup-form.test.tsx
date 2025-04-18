import { render, screen } from '@testing-library/react';

import { ConfirmSignupForm } from './confirm-signup-form';

describe('ConfirmSignupForm', () => {
  it('renders all form fields with labels', () => {
    render(<ConfirmSignupForm username="testuser" />);

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
    render(<ConfirmSignupForm username="testuser" />);
    const usernameInput = screen.getByRole('textbox', {
      name: /username/i,
    }) as HTMLInputElement;
    expect(usernameInput.value).toBe('testuser');
  });
});
