import { render, screen } from '@testing-library/react';

import { Button } from './button';

describe('Button', () => {
  it('renders as link', () => {
    render(<Button href="https://example.com">Link</Button>);

    const button = screen.getByRole('link', { name: /link/i });

    expect(button).toHaveAttribute('href', 'https://example.com');
  });
});
