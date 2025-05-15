import { forwardRef, useEffect, useImperativeHandle, useRef, InputHTMLAttributes } from 'react';

export function FakeTextInput(
    {className = '', isFocused = false, children, ...props }: InputHTMLAttributes<HTMLInputElement>
    & { isFocused?: boolean, variant?: "light" | "dark" }
) {

    return (
        <div
            {...props}
            className={
              props?.variant == null || props?.variant == "dark"
              ? 'border-gray-300 dark:border-gray-700 dark:bg-gray-900 focus:outline-none dark:text-gray-300 rounded-md shadow-sm '
              : 'border border-gray-700 bg-gray-50 text-black focus:outline-none rounded-md shadow-sm '
              + className
            }
        >
          {children}
        </div>
    );
};

export default FakeTextInput;
