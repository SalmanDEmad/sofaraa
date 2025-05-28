import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  InputHTMLAttributes,
  ReactNode,
} from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isFocused?: boolean;
  className?: string;
}

export default forwardRef(function TextInput(
  { type = 'text', className = '', isFocused = false, ...props }: TextInputProps,
  ref: any
) {
  const localRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus(),
  }));

  useEffect(() => {
    if (isFocused) {
      localRef.current?.focus();
    }
  }, [isFocused]);

  return (
    <input
      {...props}
      type={type}
      className={
        `w-full
         bg-white
         border border-[#e6dcc6]
         text-[#402a13]
         placeholder-[#7b6650]
         rounded-md shadow-sm
         focus:outline-none focus:ring-2 focus:ring-[#d3a661] focus:border-[#d3a661]
        ` + ` ` + className
      }
      ref={localRef}
    />
  );
});