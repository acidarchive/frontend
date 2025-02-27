import { render, screen } from '@testing-library/react';

import { MainLayout } from './main-layout';

describe('MainLayout', () => {
  it('renders header and footer', () => {
    render(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>,
    );

    expect(
      screen.getByRole('img', { name: /smiley logo/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument();
  });

  it('renders children inside main content', () => {
    render(
      <MainLayout>
        <p>Test Content</p>
      </MainLayout>,
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
