import { forwardRef, useImperativeHandle, useRef, SelectHTMLAttributes } from 'react';

export default forwardRef(function SelectInput(
    { className = '', ...props }: SelectHTMLAttributes<HTMLSelectElement>,
    ref
) {
    const localRef = useRef<HTMLSelectElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    return (
        <select
            {...props}
            ref={localRef}
            className={
                'block w-full mt-1 border-gray-300 dark:border-gray-700 text-gray-900 text-black focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm ' +
                className
            }
        >
            {props.children}
        </select>
    );
});
