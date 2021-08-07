import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ id, type, required, className, value, placeholder, onChange, refProp }) => {
    return (
        <input
            id={id}
            type={type}
            required={required}
            className={`border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ${className}`}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            ref={refProp}
        />
    );
};

Input.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string,
    required: PropTypes.bool,
    className: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    refProp: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    ]),
};

Input.defaultProps = {
    type: 'text',
    required: false,
    className: '',
    value: '',
    placeholder: '',
    onChange: () => {},
    refProp: null,
};

export default Input;
