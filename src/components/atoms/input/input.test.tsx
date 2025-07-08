import { render, screen } from '@testing-library/react';

import { Input } from './input';

describe('Input', () => {
  it('renders', () => {
    render(<Input name="username" type="text" aria-label="username" />);

    const input = screen.getByRole('textbox', {
      name: 'username',
    });
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('name', 'username');
  });
});
