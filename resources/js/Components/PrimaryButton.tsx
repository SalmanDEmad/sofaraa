import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  children: ReactNode;
  href?: string;
}

type ButtonTypes = 'submit' | 'reset' | 'button';

type PrimaryButtonProps =
  | (BaseButtonProps & {
      href: string;
      onClick?: never;
    } & AnchorHTMLAttributes<HTMLAnchorElement>)
  | (BaseButtonProps & {
      href?: undefined;
      onClick?: () => void;
      type?: ButtonTypes;
    } & ButtonHTMLAttributes<HTMLButtonElement>);

export default function PrimaryButton({
  className = '',
  disabled,
  children,
  href,
  type = 'submit',
  ...props
}: PrimaryButtonProps) {
  const commonClasses = `
    inline-flex items-center justify-center text-center px-4 py-2
    bg-[#ffc926] border border-transparent rounded-md font-semibold text-xs
    text-black uppercase tracking-widest hover:bg-[#e0b528] focus:outline-none
    focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out
    duration-150 ${disabled ? 'opacity-25' : ''} ${className}
  `;

  if (href) {
    return (
      <a
        href={href} // ✅ FIXED: Ensures <a> tag has proper href
        className={commonClasses}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={commonClasses}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}