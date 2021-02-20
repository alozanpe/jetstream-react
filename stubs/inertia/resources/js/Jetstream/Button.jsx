import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ type, text, className, disabled, onClick }) => {
    return (
        <button
            type={type}
            disabled={disabled}
            className={`inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray transition ease-in-out duration-150 ${className}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

Button.propTypes = {
    type: PropTypes.string,
    text: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
};

Button.defaultProps = {
    type: 'submit',
    text: 'Submit',
    className: '',
    disabled: false,
    onClick: () => {},
};

export default Button;
