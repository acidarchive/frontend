'use client';

import type { ReactNode } from 'react';
import { useCallback } from 'react';

import { Icons } from '@/components/atoms/icons/icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface FilterOption {
  label: string;
  value: boolean;
  icon?: (props: { className?: string }) => ReactNode;
}

interface DataTableFilterProps {
  title?: string;
  options: FilterOption[];
  value?: boolean;
  onValueChange?: (value?: boolean) => void;
  disabled?: boolean;
}

interface SelectionIndicatorProps {
  isSelected: boolean;
}

function SelectionIndicator({ isSelected }: SelectionIndicatorProps) {
  if (isSelected) {
    return <div className="size-1.5 rounded-full bg-primary-foreground" />;
  }
  return <Icons.Circle className="size-3.5 text-transparent" />;
}

const getSelectionClasses = (isSelected: boolean) => {
  return cn(
    'flex size-4 items-center justify-center rounded-full border',
    isSelected
      ? 'border-primary bg-primary text-primary-foreground'
      : 'border-input',
  );
};

export function Filter({
  title,
  options,
  value,
  onValueChange,
  disabled,
}: DataTableFilterProps) {
  const selectedOption = options.find(option => option.value === value);
  const hasFilter = value !== undefined;

  const handleSelect = useCallback(
    (optionValue: boolean) => {
      if (value === optionValue) {
        onValueChange?.();
      } else {
        onValueChange?.(optionValue);
      }
    },
    [value, onValueChange],
  );

  const handleClear = useCallback(() => {
    onValueChange?.();
  }, [onValueChange]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 border-dashed"
          disabled={disabled}
        >
          <Icons.PlusCircle className="size-4" />
          {title}
          {selectedOption && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal"
              >
                {selectedOption.label}
              </Badge>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-50 p-0" align="start">
        <Command>
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map(option => {
                const isSelected = value === option.value;
                const OptionIcon = option.icon;

                return (
                  <CommandItem
                    key={String(option.value)}
                    onSelect={() => handleSelect(option.value)}
                  >
                    <div className={getSelectionClasses(isSelected)}>
                      <SelectionIndicator isSelected={isSelected} />
                    </div>
                    {OptionIcon && (
                      <OptionIcon className="size-4 text-muted-foreground" />
                    )}
                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {hasFilter && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={handleClear}
                    className="justify-center text-center"
                  >
                    Clear filter
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
