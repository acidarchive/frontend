import { LabelHTMLAttributes } from 'react';

export interface FormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor: string;
  children: React.ReactNode;
}

export function FormLabel({ children, htmlFor, ...props }: FormLabelProps) {
  return (
    <label htmlFor={htmlFor} className="block text-md font-medium" {...props}>
      {children}
    </label>
  );
}
