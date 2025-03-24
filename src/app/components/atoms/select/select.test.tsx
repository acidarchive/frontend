import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { Select } from './select';

const options = [
  { value: 'C', label: 'C' },
  { value: 'D', label: 'D' },
  { value: 'E', label: 'E' },
];

describe('Select', () => {
  it('renders correctly', () => {
    render(<Select options={options} onChange={() => {}} />);

    expect(screen.getByText('C')).toBeInTheDocument();
  });

  it('calls onChange', async () => {
    const onChange = vi.fn();
    render(<Select options={options} onChange={onChange} />);

    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, 'D');

    expect(onChange).toHaveBeenCalledWith('D');
  });
});
