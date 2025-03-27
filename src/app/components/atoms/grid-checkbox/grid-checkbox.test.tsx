import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { GridCheckbox } from './grid-checkbox';

describe('GridCheckbox', () => {
  it('renders unchecked by default', () => {
    render(<GridCheckbox />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it('renders checked when specified', () => {
    render(<GridCheckbox checked />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('calls onChange with correct value when clicked', async () => {
    const onChange = vi.fn();
    render(<GridCheckbox onChange={onChange} />);

    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);

    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('disables interaction when disabled', () => {
    const onChange = vi.fn();
    render(<GridCheckbox disabled onChange={onChange} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-disabled');

    userEvent.click(checkbox);
    expect(onChange).not.toHaveBeenCalled();
  });
});
