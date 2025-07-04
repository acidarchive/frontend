import { render, screen } from '@/tests/utils';

import { KnobElement } from './knob-element';

describe('KnobElement', () => {
  it('renders with correct label and default value', () => {
    render(<KnobElement name="knob" label="Resonance" defaultValue={55} />);

    const knob = screen.getByRole('slider');
    expect(knob).toBeInTheDocument();
    expect(screen.getByText('Resonance')).toBeInTheDocument();
    expect(knob).toHaveAttribute('aria-valuenow', '55');
  });
});
