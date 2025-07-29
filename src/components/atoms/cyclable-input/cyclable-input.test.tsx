import { fireEvent, render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { describe, expect, it } from 'vitest';

import { CyclableInput, CyclableInputOption } from './cyclable-input';

const options: CyclableInputOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const TestWrapper = ({
  children,
  defaultValue,
}: {
  children: React.ReactNode;
  defaultValue?: string;
}) => {
  const methods = useForm({
    defaultValues: {
      'cyclable-input': defaultValue,
    },
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('CyclableInput', () => {
  it('should render with the default value', () => {
    render(
      <TestWrapper defaultValue="option1">
        <CyclableInput
          id="cyclable-input"
          name="cyclable-input"
          options={options}
          defaultValue="option1"
        />
      </TestWrapper>,
    );

    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('should cycle forward on click', () => {
    render(
      <TestWrapper defaultValue="option1">
        <CyclableInput
          id="cyclable-input"
          name="cyclable-input"
          options={options}
          defaultValue="option1"
        />
      </TestWrapper>,
    );

    const input = screen.getByRole('button');

    fireEvent.click(input);
    expect(screen.getByText('Option 2')).toBeInTheDocument();

    fireEvent.click(input);
    expect(screen.getByText('Option 3')).toBeInTheDocument();

    fireEvent.click(input);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('should cycle backward on right-click', () => {
    render(
      <TestWrapper defaultValue="option1">
        <CyclableInput
          id="cyclable-input"
          name="cyclable-input"
          options={options}
          defaultValue="option1"
        />
      </TestWrapper>,
    );

    const input = screen.getByRole('button');

    fireEvent.contextMenu(input);
    expect(screen.getByText('Option 3')).toBeInTheDocument();

    fireEvent.contextMenu(input);
    expect(screen.getByText('Option 2')).toBeInTheDocument();

    fireEvent.contextMenu(input);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('should not cycle when disabled', () => {
    render(
      <TestWrapper defaultValue="option1">
        <CyclableInput
          id="cyclable-input"
          name="cyclable-input"
          options={options}
          defaultValue="option1"
          disabled
        />
      </TestWrapper>,
    );

    const input = screen.getByRole('button');

    fireEvent.click(input);
    expect(screen.getByText('Option 1')).toBeInTheDocument();

    fireEvent.contextMenu(input);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });
});

describe('CyclableInput with clearable prop', () => {
  it('should include an empty option in the cycle', () => {
    render(
      <TestWrapper defaultValue="option1">
        <CyclableInput
          id="cyclable-input"
          name="cyclable-input"
          options={options}
          defaultValue="option1"
          clearable
        />
      </TestWrapper>,
    );

    const input = screen.getByRole('button');
    expect(screen.getByText('Option 1')).toBeInTheDocument();

    fireEvent.click(input);
    expect(screen.getByText('Option 2')).toBeInTheDocument();

    fireEvent.click(input);
    expect(screen.getByText('Option 3')).toBeInTheDocument();

    fireEvent.click(input);
    expect(input.textContent).toBe('');

    fireEvent.click(input);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('should cycle backward to empty option', () => {
    render(
      <TestWrapper defaultValue="option1">
        <CyclableInput
          id="cyclable-input"
          name="cyclable-input"
          options={options}
          defaultValue="option1"
          clearable
        />
      </TestWrapper>,
    );

    const input = screen.getByRole('button');
    expect(screen.getByText('Option 1')).toBeInTheDocument();

    fireEvent.contextMenu(input);
    expect(input.textContent).toBe('');

    fireEvent.contextMenu(input);
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('should render with empty default value if provided', () => {
    render(
      <TestWrapper defaultValue="">
        <CyclableInput
          id="cyclable-input"
          name="cyclable-input"
          options={options}
          defaultValue=""
          clearable
        />
      </TestWrapper>,
    );

    const input = screen.getByRole('button');
    expect(input.textContent).toBe('');
  });
});
