import { render, screen } from '@/tests/utils';

import { GridCheckbox } from './grid-checkbox';

describe('GridCheckbox', () => {
  it('renders unchecked by default', () => {
    render(<GridCheckbox name="checkbox" />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it('renders checked', () => {
    render(<GridCheckbox name="checkbox" checked />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });
});
