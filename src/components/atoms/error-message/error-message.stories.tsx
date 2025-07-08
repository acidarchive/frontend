import type { Meta, StoryObj } from '@storybook/nextjs';

import { ErrorMessage } from './error-message';

const meta = {
  title: 'Atoms/ErrorMessage',
  component: ErrorMessage,
  tags: ['autodocs'],
} satisfies Meta<typeof ErrorMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: 'There was an error with your submission',
  },
};
