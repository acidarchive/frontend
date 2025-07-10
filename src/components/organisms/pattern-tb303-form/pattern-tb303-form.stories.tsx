import type { Meta, StoryObj } from '@storybook/nextjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';

import { PatternTB303Form } from './pattern-tb303-form';

type PatternTB303FormProps = {
  editPatternId?: string;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return (
    <QueryClientProvider client={queryClient}>
      <FormProvider {...methods}>{children}</FormProvider>
    </QueryClientProvider>
  );
};

const meta = {
  title: 'Organisms/PatternTB303Form',
  component: PatternTB303Form,
  decorators: [
    Story => (
      <FormWrapper>
        <Story />
      </FormWrapper>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<PatternTB303FormProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    editPatternId: undefined,
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      router: {
        basePath: '/',
      },
    },
  },
};
