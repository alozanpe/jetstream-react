import React from 'react';
import PropTypes from 'prop-types';
import { InertiaLink } from '@inertiajs/inertia-react';

const DropdownLink = ({ href, as, children }) => {
    if (as === 'button') {
        return (
            <button
                type="submit"
                className="block w-full px-4 py-2 text-sm leading-5 text-gray-700 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
            >
                {children}
            </button>
        );
    }

    return (
        <InertiaLink
            href={href}
            className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
        >
            {children}
        </InertiaLink>
    );
};

DropdownLink.propTypes = {
    href: PropTypes.string,
    as: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.string,
    ]),
};

DropdownLink.defaultProps = {
    href: '',
    as: 'link',
};

export default DropdownLink;
