import { render, screen } from '@testing-library/react';

import { FormLabel } from './form-label';

describe('FormLabel', () => {
  it('renders', () => {
    render(<FormLabel htmlFor="username">Username</FormLabel>);

    const label = screen.getByText(/username/i);
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'username');
  });
});
