import { clsx } from 'clsx';
import { InputHTMLAttributes } from 'react';

import { Icons } from '@/components/atoms/icons';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function Input({ error, ...props }: InputProps) {
  return (
    <div className="mt-2 grid grid-cols-1">
      <input
        className={clsx(
          'col-start-1 row-start-1 block w-full bg-white py-1.5 pr-10 pl-3 text-base outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:pr-9 sm:text-sm/6',
          {
            'text-red-900 outline-red-300 placeholder:text-red-300 focus:outline-red-600':
              error,
            'text-gray-900 outline-gray-300 focus:outline-gray-950': !error,
          },
        )}
        {...props}
      />
      {error && (
        <Icons.alertCircle
          aria-hidden="true"
          className="pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-red-500 sm:size-4"
        />
      )}
    </div>
  );
}
