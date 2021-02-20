import React from 'react';
import PropTypes from 'prop-types';
import AuthenticationCardLogo from '@/Jetstream/AuthenticationCardLogo';

const AuthenticationCard = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <AuthenticationCardLogo />

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
};

AuthenticationCard.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
};

export default AuthenticationCard;
