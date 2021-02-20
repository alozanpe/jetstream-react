import React from 'react';
import PropTypes from 'prop-types';

const DangerButton = ({ type, text, className, onClick, disabled }) => {
    return (
        <button
            type={type}
            className={`inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-600 transition ease-in-out duration-150 ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

DangerButton.propTypes = {
    type: PropTypes.string,
    text: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
};

DangerButton.defaultProps = {
    type: 'button',
    text: 'Button',
    className: '',
    onClick: () => {},
    disabled: false,
};

export default DangerButton;
