import { Description, Field, Label, Switch } from '@headlessui/react';
import { Controller, useFormContext } from 'react-hook-form';

export interface SwitchElementProps {
  label: string;
  name: string;
  description?: string;
  disabled?: boolean;
  defaultValue?: boolean;
}

export function SwitchElement({
  label,
  name,
  description,
  disabled,
  defaultValue = false,
}: SwitchElementProps) {
  const { control } = useFormContext();

  return (
    <div>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Field className="flex items-center justify-between">
            <span className="flex grow flex-col">
              <Label
                as="span"
                passive
                className="text-sm/6 font-medium text-gray-900"
              >
                {label}
              </Label>
              {description && (
                <Description as="span" className="text-sm text-gray-500">
                  {description}
                </Description>
              )}
            </span>
            <div className="flex items-center gap-2">
              <Switch
                checked={value}
                onChange={onChange}
                disabled={disabled}
                className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out  focus:outline-hidden data-checked:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-5"
                />
              </Switch>
            </div>
          </Field>
        )}
      />
    </div>
  );
}
