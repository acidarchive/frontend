import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { Waveform, WaveformSelect } from './waveform-select';

describe('WaveformSelect', () => {
  it('renders with the correct label', () => {
    render(<WaveformSelect />);

    expect(screen.getByText('Waveform')).toBeInTheDocument();
  });

  it('renders both waveform options', () => {
    render(<WaveformSelect />);

    const options = screen.getAllByRole('radio');
    expect(options).toHaveLength(2);
  });

  it('calls onChange when an option is selected', async () => {
    const onChange = vi.fn();
    render(
      <WaveformSelect defaultValue={Waveform.Sawtooth} onChange={onChange} />,
    );

    const options = screen.getAllByRole('radio');

    await userEvent.click(options[1]);

    expect(onChange).toHaveBeenCalled();
  });
});
