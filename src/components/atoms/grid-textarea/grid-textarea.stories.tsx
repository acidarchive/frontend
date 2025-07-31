import { Meta, StoryObj } from '@storybook/nextjs';
import { FormProvider, useForm } from 'react-hook-form';

import { GridTextarea } from './grid-textarea';

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

const meta = {
  title: 'Atoms/GridTextarea',
  component: GridTextarea,
  decorators: [
    Story => (
      <FormWrapper>
        <Story />
      </FormWrapper>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof GridTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'default-textarea',
    placeholder: 'Enter your text',
    defaultValue: 'Hello world',
  },
};

export const Disabled: Story = {
  args: {
    name: 'disabled-textarea',
    defaultValue: 'Hello world',
    disabled: true,
  },
};
