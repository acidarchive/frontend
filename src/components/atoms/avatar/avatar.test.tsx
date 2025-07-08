import { render, screen } from '@testing-library/react';

import { Avatar } from './avatar';

describe('Avatar', () => {
  it('renders', () => {
    render(<Avatar image="https://image.url" username="John Doe" />);
    const avatar = screen.getByAltText('John Doe');
    expect(avatar).toBeInTheDocument();
  });
});
