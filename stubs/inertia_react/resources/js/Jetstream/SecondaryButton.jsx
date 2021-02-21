import React from 'react';
import PropTypes from 'prop-types';

const SecondaryButton = ({ type, text, className, onClick }) => {
    return (
        <button
            type={type}
            className={`inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150 ${className}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

SecondaryButton.propTypes = {
    type: PropTypes.string,
    text: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

SecondaryButton.defaultProps = {
    type: 'button',
    text: 'Button',
    className: '',
    onClick: () => {},
};

export default SecondaryButton;
