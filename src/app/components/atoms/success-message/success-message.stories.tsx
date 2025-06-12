import type { Meta, StoryObj } from '@storybook/nextjs';

import { SuccessMessage } from './success-message';

const meta = {
  title: 'Atoms/SuccessMessage',
  component: SuccessMessage,
  tags: ['autodocs'],
} satisfies Meta<typeof SuccessMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: 'Operation completed successfully',
  },
};
