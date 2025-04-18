import type { Meta, StoryObj } from '@storybook/react';

import { ConfirmSignupForm } from './confirm-signup-form';

const meta = {
  title: 'Organisms/Auth/ConfirmSignupForm',
  component: ConfirmSignupForm,
  tags: ['autodocs'],
} satisfies Meta<typeof ConfirmSignupForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    username: 'testuser',
  },
};
