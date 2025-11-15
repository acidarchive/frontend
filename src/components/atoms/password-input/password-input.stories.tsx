import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';

import { PasswordInput } from './password-input';

const meta = {
  title: 'Atoms/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'password123',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvasElement.querySelector('input') as HTMLInputElement;
    const button = canvas.getByRole('button');

    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
    expect(input).toHaveAttribute('type', 'password');
  },
};

export const RevealPassword: Story = {
  args: {
    defaultValue: 'password123',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvasElement.querySelector('input') as HTMLInputElement;

    const button = canvas.getByRole('button', { name: /show password/i });

    expect(input).toHaveAttribute('type', 'password');

    await userEvent.click(button);
    expect(input).toHaveAttribute('type', 'text');

    const hideButton = canvas.getByRole('button', { name: /hide password/i });
    await userEvent.click(hideButton);
    expect(input).toHaveAttribute('type', 'password');
  },
};
