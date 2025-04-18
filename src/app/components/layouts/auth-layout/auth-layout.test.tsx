import { render, screen } from '@/tests/utils';

import { AuthLayout } from './auth-layout';

describe('AuthLayout', () => {
  it('renders children inside main content', () => {
    render(
      <AuthLayout>
        <p>Test Content</p>
      </AuthLayout>,
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
