import { render, screen } from '@testing-library/react';

import { SigninForm } from './signin-form';

describe('SigninForm', () => {
  it('renders all form fields with labels', () => {
    render(<SigninForm />);

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Sign in/i }),
    ).toBeInTheDocument();
  });
});
