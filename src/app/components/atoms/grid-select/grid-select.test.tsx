import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { GridSelect } from './grid-select';

const options = [
  { value: 'C', label: 'C' },
  { value: 'D', label: 'D' },
  { value: 'E', label: 'E' },
];

describe('GridSelect', () => {
  it('renders options correctly', () => {
    render(<GridSelect options={options} />);

    options.forEach(option => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('selects initial value when provided', () => {
    render(<GridSelect options={options} defaultValue="D" />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('D');
  });

  it('calls onChange when selecting different option', async () => {
    const onChange = vi.fn();
    render(
      <GridSelect options={options} onChange={onChange} defaultValue="C" />,
    );

    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, 'D');

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: 'D' }),
      }),
    );
  });

  it('renders an empty option when allowEmpty is true', () => {
    render(<GridSelect options={options} allowEmpty />);

    const select = screen.getByRole('combobox');
    const emptyOption = select.querySelector('option[value=""]');
    expect(emptyOption).toBeInTheDocument();
  });

  it('supports empty value selection when allowEmpty is true', async () => {
    const onChange = vi.fn();
    render(<GridSelect options={options} allowEmpty onChange={onChange} />);
    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, '');
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: '' }),
      }),
    );
  });

  it('respects disabled state', () => {
    const onChange = vi.fn();
    render(<GridSelect options={options} onChange={onChange} disabled />);

    const select = screen.getByRole('combobox');
    expect(select).toBeDisabled();
  });

  it('forwards additional HTML attributes', () => {
    render(<GridSelect options={options} name="test-select" />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('name', 'test-select');
  });
});
