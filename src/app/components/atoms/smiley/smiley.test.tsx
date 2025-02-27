import { render, screen } from '@testing-library/react';

import { Smiley } from './smiley';

describe('Smiley', () => {
  it('renders correctly with default props', () => {
    render(<Smiley />);

    const smiley = screen.getByRole('img', { name: /smiley logo/i });

    expect(smiley).toBeInTheDocument();
    expect(smiley).toHaveAttribute('width', '32');
    expect(smiley).toHaveAttribute('height', '32');
  });

  it('renders correctly with custom size', () => {
    render(<Smiley size={64} />);

    const smiley = screen.getByRole('img', { name: /smiley logo/i });

    expect(smiley).toBeInTheDocument();
    expect(smiley).toHaveAttribute('width', '64');
    expect(smiley).toHaveAttribute('height', '64');
  });
});
