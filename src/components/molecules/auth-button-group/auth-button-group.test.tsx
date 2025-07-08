import { render, screen } from '@/tests/utils';

import { AuthButtonGroup } from './auth-button-group';

describe('AuthButtonGroup', () => {
  it('renders auth links', () => {
    render(<AuthButtonGroup />);

    const signInLink = screen.getByRole('link', {
      name: /sign in/i,
    });
    const signUpLink = screen.getByRole('link', {
      name: /sign up/i,
    });

    expect(signInLink).toBeInTheDocument();

    expect(signUpLink).toBeInTheDocument();
    expect(signInLink).toHaveAttribute('href', '/auth/signin');
    expect(signUpLink).toHaveAttribute('href', '/auth/signup');
  });
});
