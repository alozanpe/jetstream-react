import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ id, checked, onChange }) => {
    return (
        <input
            id={id}
            type="checkbox"
            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            checked={checked}
            onChange={onChange}
        />
    );
};

Checkbox.propTypes = {
    id: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
};

Checkbox.defaultProps = {
    checked: false,
    onChange: () => {},
};

export default Checkbox;
