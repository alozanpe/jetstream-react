import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@inertiajs/inertia-react';

const DropdownLink = ({ href, as, children }) => {
    if (as === 'button') {
        return (
            <button
                type="submit"
                className="block w-full px-4 py-2 text-sm leading-5 text-gray-700 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition"
            >
                {children}
            </button>
        );
    } else if (as === 'a') {
        return (
            <a
                href={href}
                className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition"
            >
                {children}
            </a>
        );
    }

    return (
        <Link
            href={href}
            className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition"
        >
            {children}
        </Link>
    );
};

DropdownLink.propTypes = {
    href: PropTypes.string,
    as: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node), PropTypes.string]),
};

DropdownLink.defaultProps = {
    href: '',
    as: 'link',
};

export default DropdownLink;
