import type { Meta, StoryObj } from '@storybook/react';

import { SubmitPasswordResetForm } from './submit-password-reset-form';

const meta = {
  title: 'Organisms/Auth/SubmitPasswordResetForm',
  component: SubmitPasswordResetForm,
  tags: ['autodocs'],
} satisfies Meta<typeof SubmitPasswordResetForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
