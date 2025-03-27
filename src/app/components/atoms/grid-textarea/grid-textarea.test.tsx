import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { GridTextarea } from './grid-textarea';

describe('GridTextarea', () => {
  it('renders an empty textarea by default', () => {
    render(<GridTextarea />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveValue('');
  });

  it('renders with initial value', () => {
    const initialValue = 'Initial test value';
    render(<GridTextarea value={initialValue} readOnly />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue(initialValue);
  });

  it('calls onChange when user types', async () => {
    const handleChange = vi.fn();
    render(<GridTextarea onChange={handleChange} />);

    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, 'Hello, world!');

    expect(handleChange).toHaveBeenCalledTimes('Hello, world!'.length);
  });

  it('respects disabled state', async () => {
    const handleChange = vi.fn();
    render(<GridTextarea disabled onChange={handleChange} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeDisabled();

    await userEvent.type(textarea, 'Should not change');
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('forwards additional HTML attributes', () => {
    render(<GridTextarea name="test-name" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('name', 'test-name');
  });
});
