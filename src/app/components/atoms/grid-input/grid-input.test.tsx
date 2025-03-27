import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { GridInput } from './grid-input';

describe('GridInput', () => {
  it('renders input with correct initial value', () => {
    const initialValue = 'Test input';
    render(<GridInput value={initialValue} onChange={vi.fn()} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue(initialValue);
  });

  it('calls onChange when typing', async () => {
    const onChange = vi.fn();
    render(<GridInput value="" onChange={onChange} />);

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Hello, world!');

    expect(onChange).toHaveBeenCalledTimes(13);
  });

  it('respects disabled state', async () => {
    const onChange = vi.fn();
    render(<GridInput value="" onChange={onChange} disabled />);

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();

    await userEvent.type(input, 'Should not change');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('forwards additonal HTML attributes', () => {
    render(<GridInput placeholder="Enter text..." maxLength={10} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', 'Enter text...');
    expect(input).toHaveAttribute('maxLength', '10');
  });
});
