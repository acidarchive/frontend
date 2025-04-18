import { render, screen } from '@testing-library/react';

import { ConfirmPasswordResetForm } from './confirm-password-reset-form';

describe('ConfirmPasswordResetForm', () => {
  const email = 'test@example.com';

  it('renders all form fields with labels', () => {
    render(<ConfirmPasswordResetForm email={email} />);

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/new password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirmation code/i)).toBeInTheDocument();
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
});
