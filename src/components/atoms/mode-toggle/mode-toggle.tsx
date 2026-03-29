'use client';

import { useTheme } from 'next-themes';

import { Icons } from '@/components/atoms/icons';
import { Button } from '@/components/ui/button';

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === 'dark';
  const toggle = () => setTheme(isDark ? 'light' : 'dark');

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggle}
      className="cursor-pointer"
      aria-label="Toggle theme"
    >
      <Icons.Lightbulb
        aria-hidden="true"
        className="size-4 scale-100 transition-all dark:scale-0"
      />
      <Icons.Moon
        aria-hidden="true"
        className="size-4 absolute scale-0 transition-all dark:scale-100"
      />
    </Button>
  );
}
