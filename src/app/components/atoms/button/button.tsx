import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className="flex w-full justify-center border border-gray-950 bg-gray-950 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-white hover:text-gray-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
      {...props}
    >
      {children}
    </button>
  );
}
