import React from 'react';
import PropTypes from 'prop-types';

const Label = ({ htmlFor, value, children }) => {
    return (
        <label htmlFor={htmlFor} className="block font-medium text-sm text-gray-700">
            {value && <span>{value}</span>}
            {children}
        </label>
    );
};

Label.propTypes = {
    value: PropTypes.string,
    htmlFor: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};

Label.defaultProps = {
    value: '',
    htmlFor: '',
    children: null,
};

export default Label;
