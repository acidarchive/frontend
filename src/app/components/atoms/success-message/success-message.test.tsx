import { render, screen } from '@testing-library/react';

import { SuccessMessage } from './success-message';

describe('SuccessMessage', () => {
  it('renders', () => {
    render(<SuccessMessage message="success" />);
    const message = screen.getByText('success');
    expect(message).toBeInTheDocument();
    expect(message).toHaveTextContent('success');
  });

  it('renders empty', () => {
    const { container } = render(<SuccessMessage message="" />);
    expect(container).toBeEmptyDOMElement();
  });
});
