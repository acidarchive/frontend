import type { Meta, StoryObj } from '@storybook/nextjs';
import { FormProvider, useForm } from 'react-hook-form';

import { PatternTB303Form } from './pattern-tb303-form';

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

const meta: Meta<typeof PatternTB303Form> = {
  title: 'Organisms/PatternTB303Form',
  component: PatternTB303Form,
  decorators: [
    Story => (
      <FormWrapper>
        <Story />
      </FormWrapper>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PatternTB303Form>;

export const Default: Story = {
  args: {},
};

export const WithError: Story = {
  args: {
    error: 'Failed to save pattern. Please try again.',
  },
};
