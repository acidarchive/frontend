import { render, screen } from '@testing-library/react';

import { Footer } from './footer';

describe('Footer', () => {
  it('contains a contact email link', () => {
    render(<Footer />);

    const link = screen.getByRole('link', { name: /info@acidarchive.com/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'mailto:info@acidarchive.com');
  });

  it('displays the correct copyright year', () => {
    render(<Footer />);

    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${year}`, 'i'))).toBeInTheDocument();
  });
});
