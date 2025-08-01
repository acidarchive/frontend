import type { Meta, StoryObj } from '@storybook/nextjs';
import { FormProvider, useForm } from 'react-hook-form';

import { CyclableInput } from './cyclable-input';

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

const meta = {
  title: 'Atoms/CyclableInput',
  component: CyclableInput,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <FormWrapper>
        <Story />
      </FormWrapper>
    ),
  ],
} satisfies Meta<typeof CyclableInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'cyclable-input',
    name: 'cyclable-input',
    className: 'h-10 w-40',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    defaultValue: 'option1',
  },
};

export const Clearable: Story = {
  args: {
    id: 'cyclable-input-clearable',
    name: 'cyclable-input-clearable',
    className: 'h-10 w-40',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
    defaultValue: 'option1',
    clearable: true,
  },
};
