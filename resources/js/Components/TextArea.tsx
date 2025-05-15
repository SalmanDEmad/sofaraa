import React, { forwardRef, TextareaHTMLAttributes, Ref } from 'react';

const TextArea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement> & { variant?: "light" | "dark"}>(
  ({ className = '', variant = "light", ...props }, ref: Ref<HTMLTextAreaElement>) => {
    // const variant = (props as any)?.variant ?? null;
    return (
      <textarea
        {...props}
        className={
          (variant == null || variant == "dark"
          ? 'border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm '
          : 'border-gray-700 bg-gray-50 text-black focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ')
          + className
        }
        ref={ref}
      />
    );
  }
);

export default TextArea;
