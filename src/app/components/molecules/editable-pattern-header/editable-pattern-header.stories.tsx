import type { Meta, StoryObj } from '@storybook/nextjs';
import { FormProvider, useForm } from 'react-hook-form';

import { EditablePatternHeader } from './editable-pattern-header';

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

const meta = {
  title: 'Molecules/EditablePatternHeader',
  component: EditablePatternHeader,
  decorators: [
    Story => (
      <FormWrapper>
        <Story />
      </FormWrapper>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof EditablePatternHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
