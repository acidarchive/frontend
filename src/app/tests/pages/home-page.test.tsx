import { render, screen } from '@testing-library/react';

import HomePage from '@/app/page';

describe('HomePage', () => {
  it('displays correct welcome message', () => {
    render(<HomePage />);

    expect(screen.getByText('303030303')).toBeInTheDocument();
  });
});
