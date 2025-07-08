import { render, screen } from '@testing-library/react';

import { Sidebar } from './sidebar';

describe('Sidebar', () => {
  it('renders', () => {
    render(<Sidebar />);

    expect(screen.getByText('Acid Archive')).toBeInTheDocument();
    expect(screen.getByText('TB-303')).toBeInTheDocument();
    expect(screen.getByText('TR-606')).toBeInTheDocument();
  });
});
