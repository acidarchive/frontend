import type { Meta, StoryObj } from '@storybook/nextjs';
import { fn } from 'storybook/test';

import { BaseModal } from './base-modal';

const meta = {
  title: 'Organisms/BaseModal',
  component: BaseModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isOpen: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof BaseModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Modal Title',
    description: 'Modal description',
    children: <p>Modal content</p>,
    isOpen: true,
    onSubmit: fn(),
    onClose: fn(),
  },
};
