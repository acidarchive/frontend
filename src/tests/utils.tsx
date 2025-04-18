/* eslint-disable import/export */
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react/types';
import React, { ReactElement } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { UserProvider } from '@/app/context/user-context';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm();
  return (
    <UserProvider>
      <FormProvider {...methods}>{children}</FormProvider>
    </UserProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
