// withDebounce.tsx
import React, { useState, useEffect } from 'react';

export function withDebounce<P>(
    Component: React.ComponentType<P>,
    delay: number = 300
) {
    return ({ onChange, value: propValue, ...props }: any) => {
        const [value, setValue] = useState(propValue ?? '');

        useEffect(() => {
            const timer = setTimeout(() => {
                onChange?.(value);
            }, delay);

            return () => clearTimeout(timer);
            // eslint-disable-next-line react-hooks/exhaustive-deps

        }, [value]);

        return <Component {...props} value={value} onChange={(e: any) => setValue(e.target.value)} />;
    };
}
const Input = ({ value, onChange, placeholder }: any) => (
    <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
);


export const DebouncedInput = withDebounce(Input, 500); // 500ms debounce
