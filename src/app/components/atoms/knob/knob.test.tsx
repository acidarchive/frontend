import { render, screen } from '@testing-library/react';

import { Knob } from './knob';

describe('Knob', () => {
  it('renders', () => {
    render(<Knob label="Resonance" valueDefault={50} />);

    const knob = screen.getByRole('slider');
    const label = screen.getByText('Resonance');
    const value = screen.getByText('50%');

    expect(knob).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(value).toBeInTheDocument();
  });
});
