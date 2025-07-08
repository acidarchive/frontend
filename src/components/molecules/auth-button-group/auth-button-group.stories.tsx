import type { Meta, StoryObj } from '@storybook/nextjs';

import { AuthButtonGroup } from './auth-button-group';

const meta: Meta<typeof AuthButtonGroup> = {
  title: 'Molecules/AuthButtonGroup',
  component: AuthButtonGroup,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AuthButtonGroup>;

export const Default: Story = {
  args: {
    label: 'Username',
    type: 'text',
    id: 'username',
    placeholder: 'Enter your username',
    name: 'username',
  },
};

export const WithLabelAction: Story = {
  args: {
    label: 'Password',
    type: 'password',
    id: 'password',
    placeholder: 'Enter your password',
    name: 'password',
    labelAction: (
      <span className="text-blue-500 hover:underline cursor-pointer">
        Forgot?
      </span>
    ),
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    type: 'text',
    id: 'disabled-field',
    placeholder: 'This field is disabled',
    name: 'disabled-field',
    disabled: true,
  },
};
