import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';

interface BaseButtonProps {
    className?: string;
    disabled?: boolean;
    children: ReactNode;
    href?: string; // optional
    type?: 'button' | 'submit' | 'reset'; // for button specific
    onClick?: any
}

type SecondaryButtonProps = BaseButtonProps & (
    | { href: string; type?: never }  // Link specific props
    | { href?: never; type?: 'button' | 'submit' | 'reset' }  // Button specific props
);

export default function SecondaryButton({
    className = '',
    disabled,
    children,
    href,
    type = 'button',
    ...props
}: SecondaryButtonProps) {
    const Component = href ? 'a' : 'button'; // Use 'a' if href is provided, otherwise 'button'

    return (
        <Component
            {...(href ? { href } : {})} // Only add href if it's present
            {...props}
            type={type}
            className={
                `inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-md font-semibold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-25 transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </Component>
    );
}
