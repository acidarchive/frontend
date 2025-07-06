'use client';

import { Circle, PlusCircle } from 'lucide-react';
import { useCallback } from 'react';

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

interface DataTableFilterProps {
  title?: string;
  options: {
    label: string;
    value: boolean;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  value?: boolean;
  onValueChange?: (value?: boolean) => void;
}

const getSelectionClasses = (isSelected: boolean) => {
  return cn(
    'flex size-4 items-center justify-center rounded-full border',
    isSelected
      ? 'border-primary bg-primary text-primary-foreground'
      : 'border-input',
  );
};

export function DataTableFilter({
  title,
  options,
  value,
  onValueChange,
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

  const getSelectionIndicator = (isSelected: boolean) => {
    if (isSelected) {
      return <div className="size-1.5 rounded-full bg-primary-foreground" />;
    }
    return <Circle className="size-3.5 text-transparent" />;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircle className="h-4 w-4" />
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
      <PopoverContent className="w-[200px] p-0" align="start">
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
                      {getSelectionIndicator(isSelected)}
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
