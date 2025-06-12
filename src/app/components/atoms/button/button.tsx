import { clsx } from 'clsx';
import { ButtonHTMLAttributes } from 'react';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export function Button({
  children,
  variant = 'primary',
  ...props
}: ButtonProps) {
  const base =
    'flex w-full justify-center border px-3 py-1.5 text-sm/6 font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2';
  const primary =
    'border-gray-950 bg-gray-950 text-white hover:bg-white hover:text-gray-950 focus-visible:outline-gray-600';
  const secondary =
    'border-gray-300 bg-white text-gray-950 hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-gray-400';

  return (
    <button
      className={clsx(base, variant === 'secondary' ? secondary : primary)}
      {...props}
    >
      {children}
    </button>
  );
}
