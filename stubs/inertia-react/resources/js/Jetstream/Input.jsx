import React, { forwardRef } from 'react';

const Input = forwardRef(({ onChange, ...props }, ref) => (
    <div>
        <input
            {...props}
            ref={ref}
            onChange={onChange}
            className={`border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ${props.className}`}
        />
    </div>
));

export default Input;
