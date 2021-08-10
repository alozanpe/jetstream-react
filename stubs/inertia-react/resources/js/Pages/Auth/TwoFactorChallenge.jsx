import React, { useState, useRef } from 'react';
import { useForm, Head } from '@inertiajs/inertia-react';
import { useTranslation } from 'react-i18next';

import AuthenticationCard from '@/Jetstream/AuthenticationCard';
import Button from '@/Jetstream/Button';
import Input from '@/Jetstream/Input';
import Label from '@/Jetstream/Label';
import ValidationErrors from '@/Jetstream/ValidationErrors';

const TwoFactorChallenge = () => {
    const { t } = useTranslation();
    const code = useRef();
    const recovery_code = useRef();
    const [recovery, setRecovery] = useState(false);

    const form = useForm({
        code: '',
        recovery_code: '',
    });

    const toggleRecovery = (e) => {
        e.preventDefault();

        setRecovery(!recovery);

        if (!recovery) {
            recovery_code.current.focus();
            form.setData('code', '');
        } else {
            code.current.focus();
            form.setData('recovery_code', '');
        }
    };

    const submit = (e) => {
        e.preventDefault();

        form.post(route('two-factor.login'));
    };

    return (
        <React.Fragment>
            <Head title="Two-factor Confirmation" />

            <AuthenticationCard>
                <div className="mb-4 text-sm text-gray-600">
                    {!recovery ? (
                        <span>{t('pages.twoFactorChallenge.authCode')}</span>
                    ) : (
                        <span>{t('pages.twoFactorChallenge.emergencyCode')}</span>
                    )}
                </div>

                <ValidationErrors className="mb-4" />

                <form onSubmit={submit}>
                    {!recovery ? (
                        <div>
                            <Label for="code" value={t('pages.twoFactorChallenge.code')} />
                            <Input
                                ref={code}
                                id="code"
                                type="text"
                                inputMode="numeric"
                                className="mt-1 block w-full"
                                autoFocus
                                autoComplete="one-time-code"
                                value={form.data.code}
                                onChange={(e) => form.setData('code', e.target.value)}
                            />
                        </div>
                    ) : (
                        <div>
                            <Label for="recovery_code" value={t('pages.twoFactorChallenge.recoveryCode')} />
                            <Input
                                ref={recovery_code}
                                id="recovery_code"
                                type="text"
                                className="mt-1 block w-full"
                                autoComplete="one-time-code"
                                value={form.data.code}
                                onChange={(e) => form.setData('recovery_code', e.target.value)}
                            />
                        </div>
                    )}

                    <div className="flex items-center justify-end mt-4">
                        <button
                            type="button"
                            className="text-sm text-gray-600 hover:text-gray-900 underline cursor-pointer"
                            onClick={toggleRecovery}
                        >
                            {!recovery
                                ? t('pages.twoFactorChallenge.useRecoveryCode')
                                : t('pages.twoFactorChallenge.useAuthCode')}
                        </button>

                        <Button className={`${form.processing ? 'opacity-25' : ''} ml-4`} disabled={form.processing}>
                            {t('pages.twoFactorChallenge.login')}
                        </Button>
                    </div>
                </form>
            </AuthenticationCard>
        </React.Fragment>
    );
};

export default TwoFactorChallenge;
