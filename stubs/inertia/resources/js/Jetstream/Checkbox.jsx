import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ id, name, value, onChange }) => {
    return (
        <input
            id={id}
            name={name}
            type="checkbox"
            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={value}
            onChange={onChange}
        />
    );
};

Checkbox.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.bool,
    onChange: PropTypes.func,
};

Checkbox.defaultProps = {
    value: false,
    onChange: () => {},
};

export default Checkbox;
