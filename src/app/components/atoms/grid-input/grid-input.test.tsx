import { render, screen } from '@/tests/utils';

import { GridInput } from './grid-input';

describe('GridInput', () => {
  it('renders text input with correct attributes', () => {
    render(
      <GridInput
        name="test-input"
        type="text"
        id="test-input-id"
        placeholder="Enter text"
      />,
    );

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('id', 'test-input-id');
    expect(input).toHaveAttribute('placeholder', 'Enter text');
  });

  it('renders number input correctly', () => {
    render(
      <GridInput
        name="number-input"
        type="number"
        id="number-input-id"
        placeholder="Enter number"
      />,
    );

    const input = screen.getByRole('spinbutton');
    expect(input).toHaveAttribute('type', 'number');
  });

  it('applies disabled state', () => {
    render(
      <GridInput
        name="test-input"
        type="text"
        id="test-input-id"
        placeholder="Test"
        disabled={true}
      />,
    );

    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
