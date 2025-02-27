import { render, screen } from '@testing-library/react';

import { Header } from './header';

describe('Header', () => {
  it('contains a logo with a link to homepage', () => {
    render(<Header />);

    const link = screen.getByRole('link', { name: /acid archive/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');

    const logo = screen.getByRole('img', { name: /smiley logo/i });
    expect(logo).toBeInTheDocument();
  });

  it('contains a github link', () => {
    render(<Header />);

    const link = screen.getByRole('link', { name: /github/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://github.com/acidarchive');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
