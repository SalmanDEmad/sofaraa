import { LabelHTMLAttributes, ReactNode } from 'react';

interface InputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  value?: string;
  children?: ReactNode;
  className?: string;
}

export default function InputLabel({
  value,
  children,
  className = '',
  ...props
}: InputLabelProps) {
  return (
    <label
      {...props}
      className={`block text-black font-medium text-sm ${className}`}
    >
      {value ?? children}
    </label>
  );
}