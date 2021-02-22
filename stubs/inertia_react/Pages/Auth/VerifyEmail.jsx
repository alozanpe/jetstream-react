import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Inertia } from '@inertiajs/inertia';
import { useTranslation } from 'react-i18next';
import { InertiaLink } from '@inertiajs/inertia-react';

import AuthenticationCard from '@/Jetstream/AuthenticationCard';
import Button from '@/Jetstream/Button';

const VerifyEmail = ({ status }) => {
    const { t } = useTranslation();

    const submit = (e) => {
        e.preventDefault();
        Inertia.post(route('verification.send'));
    };

    const verificationLinkSent = useMemo(() => {
        return status === 'verification-link-sent';
    }, [status]);

    return (
        <AuthenticationCard>
            <div className="mb-4 text-sm text-gray-600">{t('pages.verifyEmail.thanks')}</div>

            {verificationLinkSent && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {t('pages.verifyEmail.linkSend')}
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between">
                    <Button
                        className="{ 'opacity-25': form.processing }"
                        disabled="form.processing"
                        text="pages.verifyEmail.resend"
                    />

                    <InertiaLink
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="underline text-sm text-gray-600 hover:text-gray-900"
                    >
                        {t('pages.verifyEmail.logout')}
                    </InertiaLink>
                </div>
            </form>
        </AuthenticationCard>
    );
};

VerifyEmail.propTypes = {
    status: PropTypes.string,
};

VerifyEmail.defaultProps = {
    status: '',
};

export default VerifyEmail;
