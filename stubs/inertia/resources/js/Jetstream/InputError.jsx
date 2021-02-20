import React from 'react';
import PropTypes from 'prop-types';

const InputError = ({ message, className }) => {
    if (message) {
        return (
            <div className={className}>
                <p className="text-sm text-red-600">{message}</p>
            </div>
        );
    }

    return null;
};

InputError.propTypes = {
    message: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    className: PropTypes.string,
};

InputError.defaultProps = {
    message: '',
    className: '',
};

export default InputError;
