import { render, screen } from '@/tests/utils';

import { InputElement } from './input-element';

describe('InputElement', () => {
  it('renders with label, input field and placeholder', () => {
    render(
      <InputElement
        name="username"
        label="Username"
        type="text"
        id="username-field"
        placeholder="Enter your username"
      />,
    );

    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter your username'),
    ).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'username-field');
  });

  it('renders labelAction when provided', () => {
    const labelAction = <span data-testid="label-action">Required</span>;
    render(
      <InputElement
        name="email"
        label="Email"
        type="email"
        id="email-field"
        placeholder="Enter your email"
        labelAction={labelAction}
      />,
    );

    expect(screen.getByTestId('label-action')).toBeInTheDocument();
    expect(screen.getByTestId('label-action')).toHaveTextContent('Required');
  });

  it('renders disabled', () => {
    render(
      <InputElement
        name="disabled-field"
        label="Disabled Field"
        type="text"
        id="disabled-field"
        placeholder="This field is disabled"
        disabled={true}
      />,
    );

    expect(
      screen.getByPlaceholderText('This field is disabled'),
    ).toBeDisabled();
  });

  it('applies various input types correctly', () => {
    render(
      <InputElement
        name="password"
        label="Password"
        type="password"
        id="password-field"
        placeholder="Enter your password"
      />,
    );

    expect(screen.getByPlaceholderText('Enter your password')).toHaveAttribute(
      'type',
      'password',
    );
  });
});
