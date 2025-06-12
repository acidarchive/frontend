import type { Meta, StoryObj } from '@storybook/nextjs';

import { UserProvider } from '@/app/context/user-context';

import { MainLayout } from './main-layout';

const meta = {
  title: 'Layouts/MainLayout',
  component: MainLayout,
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
} satisfies Meta<typeof MainLayout>;

export default meta;
type Story = StoryObj<typeof MainLayout>;

export const Default: Story = {
  render: () => (
    <MainLayout>
      <div style={{ height: '30rem', textAlign: 'center' }}></div>
    </MainLayout>
  ),
};
