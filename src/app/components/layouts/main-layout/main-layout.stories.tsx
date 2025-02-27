import type { Meta, StoryObj } from '@storybook/react';

import { MainLayout } from './main-layout';

const meta = {
  title: 'Layouts/MainLayout',
  component: MainLayout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MainLayout>;

export default meta;
type Story = StoryObj<typeof MainLayout>;

export const Default: Story = {
  render: () => (
    <MainLayout>
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Welcome to Acid Archive</h1>
        <p>This is a preview of the Layout component.</p>
      </div>
    </MainLayout>
  ),
};
