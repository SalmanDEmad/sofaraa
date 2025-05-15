import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';

interface BaseButtonProps {
    className?: string;
    disabled?: boolean;
    children: ReactNode;
    href?: string; // optional
}

type PrimaryButtonProps = BaseButtonProps & (
    | { href: string; onClick?: never }  // Link specific props
    | { href?: never; onClick?: () => void }  // Button specific props
);

export default function PrimaryButton({
    className = '',
    disabled,
    children,
    href,
    ...props
}: PrimaryButtonProps) {
    const Component = href ? 'a' : 'button'; // Use 'a' if href is provided, otherwise 'button'

    return (
        <Component
            {...(href ? { href } : {})} // Only add href if it's present
            {...props}
            className={
                `inline-flex items-center justify-center text-center px-4 py-2 bg-[#ffc926] border border-transparent rounded-md font-semibold text-xs text-black uppercase tracking-widest hover:bg-[#e0b528] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </Component>
    );
}