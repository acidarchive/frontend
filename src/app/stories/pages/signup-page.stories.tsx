import type { Meta, StoryObj } from '@storybook/react';

import SignupPage from '@/app/auth/signup/page';

const meta = {
  title: 'Pages/Auth/SignupPage',
  component: SignupPage,
  tags: ['autodocs'],
} satisfies Meta<typeof SignupPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
