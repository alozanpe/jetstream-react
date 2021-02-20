import React from 'react';
import PropTypes from 'prop-types';

import AppLayout from '@/Layout/AppLayout';
import ApiTokenManager from '@/Pages/API/ApiTokenManager';

const Index = ({ tokens, availablePermissions, defaultPermissions }) => {
    return (
        <AppLayout>
            <AppLayout.Header>
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">API Tokens</h2>
            </AppLayout.Header>
            <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <ApiTokenManager
                    tokens={tokens}
                    availablePermissions={availablePermissions}
                    defaultPermissions={defaultPermissions}
                />
            </div>
        </AppLayout>
    );
};

Index.propTypes = {};

export default Index;
