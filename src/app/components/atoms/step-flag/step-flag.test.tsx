import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { StepFlag } from './step-flag';

describe('StepFlag', () => {
  it('renders', () => {
    render(<StepFlag onChange={vi.fn()} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('calls onChange', async () => {
    const onChange = vi.fn();
    render(<StepFlag onChange={onChange} />);

    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);

    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('respects initial value', () => {
    render(<StepFlag value={true} onChange={vi.fn()} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('handles disabled state', () => {
    const onChange = vi.fn();
    render(<StepFlag disabled={true} onChange={onChange} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeDisabled();

    userEvent.click(checkbox);
    expect(onChange).not.toHaveBeenCalled();
  });
});
