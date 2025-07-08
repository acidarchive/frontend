import type { Meta, StoryObj } from '@storybook/nextjs';

import { UserProvider } from '@/context/user-context';

import { AuthLayout } from './auth-layout';

const meta = {
  title: 'Layouts/AuthLayout',
  component: AuthLayout,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    Story => (
      <UserProvider>
        <Story />
      </UserProvider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof AuthLayout>;

export default meta;
type Story = StoryObj<typeof AuthLayout>;

export const Default: Story = {
  render: () => (
    <AuthLayout>
      <div style={{ height: '30rem', textAlign: 'center' }}></div>
    </AuthLayout>
  ),
};
