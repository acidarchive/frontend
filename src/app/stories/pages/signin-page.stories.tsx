import type { Meta, StoryObj } from '@storybook/react';

import SigninPage from '@/app/auth/signin/page';

const meta = {
  title: 'Pages/Auth/SigninPage',
  component: SigninPage,
  tags: ['autodocs'],
} satisfies Meta<typeof SigninPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
