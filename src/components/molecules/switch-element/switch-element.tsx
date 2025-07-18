import { Controller, useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';

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
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <FormLabel>{label}</FormLabel>
              <FormDescription>{description}</FormDescription>
            </div>
            <FormControl>
              <Switch
                disabled={disabled}
                checked={value}
                onCheckedChange={onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
