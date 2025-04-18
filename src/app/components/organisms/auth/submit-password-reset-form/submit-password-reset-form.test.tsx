import { render, screen } from '@testing-library/react';

import { SubmitPasswordResetForm } from './submit-password-reset-form';

describe('SubmitPasswordResetForm', () => {
  it('renders all form fields with labels', () => {
    render(<SubmitPasswordResetForm />);

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Send code/i }),
    ).toBeInTheDocument();
  });
});
