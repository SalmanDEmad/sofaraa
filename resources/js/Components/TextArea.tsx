import React, { forwardRef, TextareaHTMLAttributes, Ref } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: "light" | "dark";
  className?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className = '', variant = "light", ...props }, ref) => {
    // Styling for light and dark variants
    const baseStyles = `
      w-full
      border
      rounded-md
      shadow-sm
      focus:outline-none
      transition
      min-h-[90px]
      px-4 py-2
      resize-y
    `;

    const lightStyles = `
      bg-white
      border-[#e6dcc6]
      text-[#402a13]
      placeholder-[#7b6650]
      focus:border-[#d3a661]
      focus:ring-2 focus:ring-[#d3a661]
    `;

    const darkStyles = `
      bg-gray-900
      border-gray-700
      text-gray-200
      placeholder-gray-400
      focus:border-indigo-500
      focus:ring-2 focus:ring-indigo-600
    `;

    return (
      <textarea
        {...props}
        ref={ref}
        className={
          `${baseStyles} ${variant === "dark" ? darkStyles : lightStyles} ${className}`
        }
      />
    );
  }
);

export default TextArea;