import { LabelHTMLAttributes } from 'react';

export interface FormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor: string;
  children: React.ReactNode;
}

export function FormLabel({ children, htmlFor, ...props }: FormLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm/6 font-medium text-gray-900"
      {...props}
    >
      {children}
    </label>
  );
}
