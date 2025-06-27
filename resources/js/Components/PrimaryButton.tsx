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
    inline-flex items-center justify-center text-center px-4 py-2
    bg-[#ffc926] border border-transparent rounded-md font-semibold text-xs
    text-black uppercase tracking-widest hover:bg-[#e0b528] focus:outline-none
    focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out
    duration-150 ${'disabled' in props && props.disabled ? 'opacity-25' : ''} ${className}
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