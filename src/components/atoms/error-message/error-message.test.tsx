import { render, screen } from '@testing-library/react';

import { ErrorMessage } from './error-message';

describe('ErrorMessage', () => {
  it('renders', () => {
    render(<ErrorMessage message="error" />);
    const message = screen.getByText('error');
    expect(message).toBeInTheDocument();
    expect(message).toHaveTextContent('error');
  });

  it('renders empty', () => {
    const { container } = render(<ErrorMessage message="" />);
    expect(container).toBeEmptyDOMElement();
  });
});
