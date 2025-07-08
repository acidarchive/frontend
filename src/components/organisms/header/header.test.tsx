import { render, screen } from '@/tests/utils';

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
});
