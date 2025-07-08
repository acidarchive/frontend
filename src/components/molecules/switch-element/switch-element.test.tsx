import userEvent from '@testing-library/user-event';

import { render, screen } from '@/tests/utils';

import { SwitchElement } from './switch-element';

describe('SwitchElement', () => {
  it('is unchecked by default', () => {
    render(<SwitchElement label="Enable notifications" name="notifications" />);

    const switchElement = screen.getByRole('switch');
    expect(switchElement).not.toBeChecked();
  });

  it('respects defaultValue prop', () => {
    render(
      <SwitchElement
        label="Enable notifications"
        name="notifications"
        defaultValue={true}
      />,
    );

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeChecked();
  });

  it('can be toggled when not disabled', async () => {
    render(<SwitchElement label="Enable notifications" name="notifications" />);

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeEnabled();
    expect(switchElement).not.toBeChecked();

    await userEvent.click(switchElement);
    expect(switchElement).toBeChecked();

    await userEvent.click(switchElement);
    expect(switchElement).not.toBeChecked();
  });

  it('can not be toggled when disabled', async () => {
    render(
      <SwitchElement
        label="Enable notifications"
        name="notifications"
        disabled={true}
        defaultValue={false}
      />,
    );

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeDisabled();
    expect(switchElement).not.toBeChecked();

    await userEvent.click(switchElement);
    expect(switchElement).not.toBeChecked();
  });
});
