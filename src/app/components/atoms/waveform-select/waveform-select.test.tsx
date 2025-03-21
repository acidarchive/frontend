import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { Waveform, WaveformSelect } from './waveform-select';

describe('WaveformSelect', () => {
  it('renders correctly', () => {
    render(<WaveformSelect onChange={() => {}} />);

    expect(screen.getByText('Waveform:')).toBeInTheDocument();
  });

  it('renders both waveform options', () => {
    render(<WaveformSelect onChange={() => {}} />);

    expect(screen.getByDisplayValue(Waveform.Square)).toBeInTheDocument();
    expect(screen.getByDisplayValue(Waveform.Sawtooth)).toBeInTheDocument();
  });

  it('calls onChange', () => {
    const onChange = vi.fn();
    render(<WaveformSelect onChange={onChange} />);

    screen.getByDisplayValue(Waveform.Sawtooth).click();

    expect(onChange).toHaveBeenCalledWith(Waveform.Sawtooth);
  });
});
