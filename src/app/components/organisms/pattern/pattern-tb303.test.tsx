import { render, screen } from '@testing-library/react';

import { pattern } from './data';
import { PatternTB303 } from './pattern-tb303';

describe('PatternTB303', () => {
  it('renders when no pattern is provided', () => {
    render(<PatternTB303 />);

    expect(screen.getByText('Title:')).toBeInTheDocument();
    expect(screen.getByText('Author:')).toBeInTheDocument();
  });

  it('renders title, author, and description', () => {
    render(<PatternTB303 pattern={pattern} />);
    expect(screen.getByDisplayValue(pattern.title)).toBeInTheDocument();
    expect(screen.getByDisplayValue(pattern.author)).toBeInTheDocument();
    expect(screen.getByDisplayValue(pattern.description)).toBeInTheDocument();
  });

  it('renders note, octave, accent, slide, and time values for steps', () => {
    render(<PatternTB303 pattern={pattern} />);

    expect(screen.getAllByDisplayValue('B')[0]).toBeInTheDocument();
    expect(screen.getAllByDisplayValue('▼')[0]).toBeInTheDocument();
    expect(screen.getAllByRole('checkbox', { checked: true })).toBeTruthy();

    const checkedBoxes = screen.getAllByRole('checkbox', { checked: true });
    expect(checkedBoxes.length).toBeGreaterThanOrEqual(2);

    expect(screen.getAllByDisplayValue('○').length).toBeGreaterThanOrEqual(2);
  });
});
