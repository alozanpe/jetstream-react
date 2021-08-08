import React, { useMemo } from 'react';
import { usePage, useForm, Head, Link } from '@inertiajs/inertia-react';
import { useTranslation } from 'react-i18next';

import AuthenticationCard from '@/Jetstream/AuthenticationCard';
import Button from '@/Jetstream/Button';

const VerifyEmail = () => {
    const { t } = useTranslation();
    const { status } = usePage().props;

    const form = useForm();

    const onSubmit = (e) => {
        e.preventDefault();

        form.post(route('verification.send'));
    };

    const verificationLinkSent = useMemo(() => {
        return status === 'verification-link-sent';
    }, [status]);

    return (
        <React.Fragment>
            <Head title="Email Verification" />

            <AuthenticationCard>
                <div className="mb-4 text-sm text-gray-600">{t('pages.verifyEmail.thanks')}</div>

                {verificationLinkSent && (
                    <div className="mb-4 font-medium text-sm text-green-600">{t('pages.verifyEmail.linkSend')}</div>
                )}

                <form onSubmit={onSubmit}>
                    <div className="mt-4 flex items-center justify-between">
                        <Button
                            className={`${form.processing ? 'opacity-25' : ''}`}
                            disabled={form.processing}
                            text="pages.verifyEmail.resend"
                        />

                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="underline text-sm text-gray-600 hover:text-gray-900"
                        >
                            {t('pages.verifyEmail.logout')}
                        </Link>
                    </div>
                </form>
            </AuthenticationCard>
        </React.Fragment>
    );
};

export default VerifyEmail;
