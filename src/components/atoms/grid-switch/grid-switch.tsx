import { Controller, useFormContext } from 'react-hook-form';

import { Switch } from '@/components/ui/switch';

export interface GridSwitchProps {
  name: string;
  defaultValue?: boolean;
  disabled?: boolean;
}

export function GridSwitch({
  name,
  defaultValue,
  disabled = false,
}: GridSwitchProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <Switch
          name={name}
          checked={value ?? false}
          onCheckedChange={onChange}
          disabled={disabled}
        />
      )}
    />
  );
}
