import React, { useState, useRef } from 'react';
import { Inertia } from '@inertiajs/inertia';
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
    const [form, setForm] = useState({
        code: '',
        recovery_code: '',
        processing: false,
    });

    const toggleRecovery = (e) => {
        e.preventDefault();
        setRecovery(!recovery);

        if (!recovery) {
            recovery_code.current.focus();
            setForm({ ...form, code: '' });
        } else {
            code.current.focus();
            setForm({ ...form, recovery_code: '' });
        }
    };

    const submit = (e) => {
        e.preventDefault();
        setForm({ ...form, processing: true });

        Inertia.post(
            route('two-factor.login'),
            {},
            {
                onFinish: () => {
                    setForm({ ...form, processing: false });
                },
            }
        );
    };

    return (
        <AuthenticationCard>
            <div className="mb-4 text-sm text-gray-600">
                {!recovery ? (
                    <span>{t('pages.twoFactorChallenge.authCode')}</span>
                ) : (
                    <span>{t('pages.twoFactorChallenge.emergencyCode')}</span>
                )}
            </div>

            <ValidationErrors class="mb-4" />

            <form onSubmit={submit}>
                {!recovery ? (
                    <div>
                        <Label for="code" value={t('pages.twoFactorChallenge.code')} />
                        <Input
                            refProp={code}
                            id="code"
                            type="text"
                            inputmode="numeric"
                            className="mt-1 block w-full"
                            onChange={(e) => setForm({ ...form, code: e.target.value })}
                            autofocus
                            autocomplete="one-time-code"
                        />
                    </div>
                ) : (
                    <div>
                        <Label
                            for="recovery_code"
                            value={t('pages.twoFactorChallenge.recoveryCode')}
                        />
                        <Input
                            refProp={recovery_code}
                            id="recovery_code"
                            type="text"
                            className="mt-1 block w-full"
                            onChange={(e) => setForm({ ...form, removery_code: e.target.value })}
                            autocomplete="one-time-code"
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

                    <Button
                        className="ml-4"
                        className={`${form.processing ? 'opacity-25' : ''} ml-2`}
                        disabled={form.processing}
                        text="pages.twoFactorChallenge.login"
                    />
                </div>
            </form>
        </AuthenticationCard>
    );
};

export default TwoFactorChallenge;
