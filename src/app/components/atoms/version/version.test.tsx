import { render, screen } from '@testing-library/react';

import { Version } from './version';

describe('Version', () => {
  beforeAll(() => {
    process.env.NEXT_PUBLIC_APP_VERSION = '1.2.3';
  });

  it('displays correct version', () => {
    render(<Version />);

    expect(screen.getByText('Version: 1.2.3')).toBeInTheDocument();
  });
});
