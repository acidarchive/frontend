import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from '@storybook/test';

import { ImageDropzone } from './image-dropzone';

const meta = {
  title: 'Molecules/ImageDropzone',
  component: ImageDropzone,
  tags: ['autodocs'],
  args: {
    uploadType: 'avatar',
    onFileSelect: fn(),
    onError: fn(),
  },
} satisfies Meta<typeof ImageDropzone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithChildren: Story = {
  args: {
    children: (
      <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
        <p className="text-sm font-medium">Custom dropzone content</p>
        <p className="text-muted-foreground text-xs">
          Drag and drop your image here
        </p>
      </div>
    ),
  },
};
