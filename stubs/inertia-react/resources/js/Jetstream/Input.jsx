import React, { forwardRef } from 'react';

const Input = forwardRef(({ ...props }, ref) => (
    <div>
        <input
            {...props}
            ref={ref}
            className={`border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ${props.className}`}
        />
    </div>
));

export default Input;
