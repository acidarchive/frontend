import type { Meta, StoryObj } from '@storybook/react';

import SubmitPasswordResetPage from '@/app/auth/reset-password/submit/page';

const meta = {
  title: 'Pages/Auth/SubmitPasswordResetPage',
  component: SubmitPasswordResetPage,
  tags: ['autodocs'],
} satisfies Meta<typeof SubmitPasswordResetPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
