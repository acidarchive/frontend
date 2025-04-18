import { render, screen } from '@testing-library/react';

import { SignupForm } from './signup-form';

describe('SignupForm', () => {
  it('renders all form fields with labels', () => {
    render(<SignupForm />);

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Sign up/i }),
    ).toBeInTheDocument();
  });
});
