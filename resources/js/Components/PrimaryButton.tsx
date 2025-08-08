import {
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  ReactNode,
} from 'react';

type ButtonTypes = 'submit' | 'reset' | 'button';

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  className?: string;
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  type?: ButtonTypes;
  children: ReactNode;
  className?: string;
};

type PrimaryButtonProps = AnchorProps | ButtonProps;

export default function PrimaryButton(props: PrimaryButtonProps) {
  const {
    children,
    className = '',
    ...rest
  } = props;

  // Theme colors
  const GOLD = '#D4AF37';
  const NAVY = '#0B1F3A';
  const IVORY = '#F5F5F0';
  const GOLD_HOVER = '#e1c15a';

  const commonClasses = `
    inline-flex items-center justify-center text-center px-5 py-2.5
    bg-[${GOLD}] border border-transparent rounded-lg font-semibold text-base
    text-[${NAVY}] transition-colors duration-200 shadow-sm
    hover:bg-[${GOLD_HOVER}] hover:text-[${NAVY}]
    focus:outline-none focus:ring-2 focus:ring-[${GOLD}] focus:ring-offset-2 focus:ring-offset-[${NAVY}]
    ${'disabled' in props && props.disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `;

  if ('href' in props) {
    const { href, ...anchorProps } = rest as AnchorProps;
    return (
      <a
        href={href}
        className={commonClasses}
        {...anchorProps}
      >
        {children}
      </a>
    );
  } else {
    const { type = 'submit', disabled, ...buttonProps } = rest as ButtonProps;
    return (
      <button
        type={type}
        disabled={disabled}
        className={commonClasses}
        {...buttonProps}
      >
        {children}
      </button>
    );
  }
}