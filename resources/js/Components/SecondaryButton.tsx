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
  const baseClasses = `
    inline-flex items-center justify-center px-5 py-2.5
    border border-[#3B5049] rounded-lg font-semibold text-base
    text-[#B3B79D] bg-transparent
    transition-colors duration-200 shadow-sm
    hover:bg-[#3B5049] hover:text-[#B3B79D]
    focus:outline-none focus:ring-2 focus:ring-[#86836B] focus:ring-offset-2
    disabled:opacity-50 cursor-pointer
  `;

  const allClasses = `${baseClasses} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={allClasses}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        {...props}
      >
        {children}
      </a>
    );
  } else {
    return (
      <button
        type={type}
        disabled={disabled}
        className={allClasses}
        {...props}
      >
        {children}
      </button>
    );
  }
}