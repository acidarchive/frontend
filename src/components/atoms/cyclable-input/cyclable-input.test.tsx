import userEvent from '@testing-library/user-event';
import { FormProvider, useForm } from 'react-hook-form';
import { describe, expect, it } from 'vitest';

import { render, screen } from '@/tests/utils';

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

const renderCyclableInput = (
  props: Partial<React.ComponentProps<typeof CyclableInput>> = {},
) => {
  const defaultProps = {
    id: 'cyclable-input',
    name: 'cyclable-input',
    options,
    defaultValue: 'option1',
    ...props,
  };

  return render(
    <TestWrapper defaultValue={defaultProps.defaultValue as string}>
      <CyclableInput {...defaultProps} />
    </TestWrapper>,
  );
};

describe('CyclableInput', () => {
  it('should render with the default value', () => {
    renderCyclableInput();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('should cycle forward on click', async () => {
    const user = userEvent.setup();
    renderCyclableInput();

    const input = screen.getByRole('button');

    await user.click(input);
    expect(screen.getByText('Option 2')).toBeInTheDocument();

    await user.click(input);
    expect(screen.getByText('Option 3')).toBeInTheDocument();

    await user.click(input);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('should cycle backward on right-click', async () => {
    const user = userEvent.setup();
    renderCyclableInput();

    const input = screen.getByRole('button');

    await user.pointer({ target: input, keys: '[MouseRight]' });
    expect(screen.getByText('Option 3')).toBeInTheDocument();

    await user.pointer({ target: input, keys: '[MouseRight]' });
    expect(screen.getByText('Option 2')).toBeInTheDocument();

    await user.pointer({ target: input, keys: '[MouseRight]' });
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('should not cycle when disabled', async () => {
    const user = userEvent.setup();
    renderCyclableInput({ disabled: true });

    const input = screen.getByRole('button');

    await user.click(input);
    expect(screen.getByText('Option 1')).toBeInTheDocument();

    await user.pointer({ target: input, keys: '[MouseRight]' });
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });
});

it('should include an empty option in the cycle', async () => {
  const user = userEvent.setup();
  renderCyclableInput({ clearable: true });

  const input = screen.getByRole('button');
  expect(screen.getByText('Option 1')).toBeInTheDocument();

  await user.click(input);
  expect(screen.getByText('Option 2')).toBeInTheDocument();

  await user.click(input);
  expect(screen.getByText('Option 3')).toBeInTheDocument();

  await user.click(input);
  expect(input.textContent).toBe('');

  await user.click(input);
  expect(screen.getByText('Option 1')).toBeInTheDocument();
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
