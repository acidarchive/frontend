import type { Meta, StoryObj } from '@storybook/react';

import AuthLayout from '@/app/auth/layout';

const meta = {
  title: 'Layouts/AuthLayout',
  component: AuthLayout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AuthLayout>;

export default meta;
type Story = StoryObj<typeof AuthLayout>;

export const Default: Story = {
  render: () => (
    <AuthLayout>
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>contents</h1>
      </div>
    </AuthLayout>
  ),
};
