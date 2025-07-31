import type { Meta, StoryObj } from '@storybook/nextjs';
import { fn } from 'storybook/test';

import { ErrorFallback } from './error-fallback';

const meta: Meta<typeof ErrorFallback> = {
  title: 'Molecules/ErrorFallback',
  component: ErrorFallback,
  tags: ['autodocs'],
  args: {
    resetErrorBoundary: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    error: new Error('Request failed with status code 500'),
  },
};
