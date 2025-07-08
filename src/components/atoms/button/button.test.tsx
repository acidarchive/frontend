import { render, screen } from '@testing-library/react';

import { Button } from './button';

describe('Button', () => {
  it('renders', () => {
    render(<Button>Submit</Button>);

    const button = screen.getByRole('button', { name: /submit/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Submit');
  });
});
