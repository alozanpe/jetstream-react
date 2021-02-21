import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const SecondaryButton = ({ type, text, className, onClick }) => {
    const { t } = useTranslation();

    return (
        <button
            type={type}
            className={`inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150 ${className}`}
            onClick={onClick}
        >
            {t(text)}
        </button>
    );
};

SecondaryButton.propTypes = {
    type: PropTypes.string,
    text: PropTypes.string.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

SecondaryButton.defaultProps = {
    type: 'button',
    className: '',
    onClick: () => {},
};

export default SecondaryButton;
