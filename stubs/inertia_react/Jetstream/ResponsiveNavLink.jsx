import React from 'react';
import PropTypes from 'prop-types';
import { InertiaLink } from '@inertiajs/inertia-react';

const ResponsiveNavLink = ({ children, href, active, as }) => {
    const getClasses = () => {
        return active
            ? 'block pl-3 pr-4 py-2 border-l-4 border-indigo-400 text-base font-medium text-indigo-700 bg-indigo-50 focus:outline-none focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700 transition duration-150 ease-in-out'
            : 'block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out';
    };

    if (as === 'button') {
        return <button className={`w-full text-left ${getClasses()}`}>{children}</button>;
    }

    return (
        <InertiaLink href={href} className={getClasses()}>
            {children}
        </InertiaLink>
    );
};

ResponsiveNavLink.propTypes = {
    href: PropTypes.string,
    active: PropTypes.bool,
    as: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.string,
    ]).isRequired,
};

ResponsiveNavLink.defaultProps = {
    href: '',
    active: false,
    as: 'link',
};

export default ResponsiveNavLink;
