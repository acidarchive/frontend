import { render, screen } from '@/tests/utils';

import { WaveformSelect } from './waveform-select';

describe('WaveformSelect', () => {
  it('renders both options', () => {
    render(<WaveformSelect name="waveform" />);

    const options = screen.getAllByRole('radio');
    expect(options).toHaveLength(2);
  });
});
