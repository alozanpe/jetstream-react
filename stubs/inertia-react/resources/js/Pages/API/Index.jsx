import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import AppLayout from '@/Layouts/AppLayout';
import ApiTokenManager from '@/Pages/API/Partials/ApiTokenManager';

const Index = ({ tokens, availablePermissions, defaultPermissions }) => {
    const { t } = useTranslation();

    return (
        <AppLayout>
            <AppLayout.Header>
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {t('pages.api.title')}
                </h2>
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

Index.propTypes = {
    tokens: PropTypes.arrayOf(PropTypes.string),
    availablePermissions: PropTypes.arrayOf(PropTypes.string),
    defaultPermissions: PropTypes.arrayOf(PropTypes.string),
};

Index.defaultProps = {
    tokens: [],
    availablePermissions: [],
    defaultPermissions: [],
};

export default Index;
