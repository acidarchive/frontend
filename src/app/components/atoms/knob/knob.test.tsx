import { render, screen } from '@testing-library/react';

import { Knob } from './knob';

describe('Knob', () => {
  it('renders with correct label and default value', () => {
    render(<Knob label="Resonance" value={50} />);

    const knob = screen.getByRole('slider');
    expect(knob).toBeInTheDocument();
    expect(screen.getByText('Resonance')).toBeInTheDocument();
    expect(knob).toHaveAttribute('aria-valuenow', '50');
  });
});
