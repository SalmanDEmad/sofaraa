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

  const commonClasses = `
    inline-flex items-center justify-center text-center px-5 py-2.5
    bg-[#3B5049] border border-transparent rounded-lg font-semibold text-base
    text-[#B3B79D] transition-colors duration-200 shadow-sm
    hover:bg-[#86836B] hover:text-[#192925]
    focus:outline-none focus:ring-2 focus:ring-[#B3B79D] focus:ring-offset-2
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