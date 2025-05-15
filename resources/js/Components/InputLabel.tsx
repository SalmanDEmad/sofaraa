import { LabelHTMLAttributes } from 'react';

export default function InputLabel({ value, className = '', children, ...props }: LabelHTMLAttributes<HTMLLabelElement>
  & { value?: string, variant?: "light" | "dark" }) {
    return (
        <label {...props} className={
          `block font-medium text-sm
          ${props?.variant == null || props?.variant == "dark"
            ? "text-gray-700 dark:text-gray-300"
            : "text-gray-700"
          } `
          + className
        }>
            {value ? value : children}
        </label>
    );
}
