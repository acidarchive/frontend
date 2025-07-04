import { render, screen } from '@/tests/utils';

import { GridSelect } from './grid-select';

const options = [
  { value: 'C', label: 'C' },
  { value: 'D', label: 'D' },
  { value: 'E', label: 'E' },
];

describe('GridSelect', () => {
  it('renders options correctly', () => {
    render(<GridSelect id="select" name="select" options={options} />);

    options.forEach(option => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('renders an empty option when allowEmpty is true', () => {
    render(
      <GridSelect id="select" name="select" options={options} allowEmpty />,
    );

    const select = screen.getByRole('combobox');
    const emptyOption = select.querySelector('option[value=""]');
    expect(emptyOption).toBeInTheDocument();
  });

  it('respects disabled state', () => {
    render(<GridSelect id="select" name="select" options={options} disabled />);

    const select = screen.getByRole('combobox');
    expect(select).toBeDisabled();
  });
});
