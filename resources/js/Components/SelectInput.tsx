import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  SelectHTMLAttributes,
} from "react";

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  isFocused?: boolean;
  className?: string;
}

const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ className = '', isFocused = false, children, ...props }, ref) => {
    const localRef = useRef<HTMLSelectElement>(null);

    useImperativeHandle(ref, () => localRef.current!);

    useEffect(() => {
      if (isFocused) localRef.current?.focus();
    }, [isFocused]);

    return (
      <select
        {...props}
        ref={localRef}
        className={
          `w-full
           bg-white
           border border-[#e6dcc6]
           text-[#402a13]
           placeholder-[#7b6650]
           rounded-md shadow-sm
           focus:outline-none focus:ring-2 focus:ring-[#d3a661] focus:border-[#d3a661]
           px-4 py-1
           min-h-[40px]
           pr-12
           transition
           ${className}`
        }
      >
        {children}
      </select>
    );
  }
);

export default SelectInput;