import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import ActionSection from '@/Jetstream/ActionSection';
import Button from '@/Jetstream/Button';
import DangerButton from '@/Jetstream/DangerButton';
import SecondaryButton from '@/Jetstream/SecondaryButton';
import ConfirmPassword from '@/Jetstream/ConfirmPassword';

const TwoFactorAuthenticationForm = () => {
    const { t } = useTranslation();
    const { user } = usePage().props;
    const [enabling, setEnabling] = useState(false);
    const [disabling, setDisabling] = useState(false);
    const [qrCode, setQrCode] = useState(null);
    const [recoveryCodes, setRecoveryCodes] = useState([]);

    const showRecoveryCodes = () => {
        return axios.get('/user/two-factor-recovery-codes').then((response) => {
            setRecoveryCodes(response.data);
        });
    };

    const showQrCode = () => {
        return axios.get('/user/two-factor-qr-code').then((response) => {
            setQrCode(response.data.svg);
        });
    };

    const enableTwoFactorAuthentication = () => {
        setEnabling(true);

        Inertia.post(
            '/user/two-factor-authentication',
            {},
            {
                preserveScroll: true,
                onSuccess: () => Promise.all([showQrCode(), showRecoveryCodes()]),
                onFinish: () => setEnabling(false),
            }
        );
    };

    const regenerateRecoveryCodes = () => {
        axios.post('/user/two-factor-recovery-codes').then(() => {
            showRecoveryCodes();
        });
    };

    const disableTwoFactorAuthentication = () => {
        setDisabling(true);

        Inertia.delete('/user/two-factor-authentication', {
            preserveScroll: true,
            onSuccess: () => setDisabling(false),
        });
    };

    const twoFactorEnabled = () => {
        return !enabling && user.two_factor_enabled;
    };

    return (
        <ActionSection>
            <ActionSection.Title>
                {t('pages.profile.twoFactorAuthenticationForm.title')}
            </ActionSection.Title>
            <ActionSection.Description>
                {t('pages.profile.twoFactorAuthenticationForm.description')}
            </ActionSection.Description>
            <ActionSection.Content>
                {twoFactorEnabled() ? (
                    <h3 className="text-lg font-medium text-gray-900">
                        {t('pages.profile.twoFactorAuthenticationForm.enabled')}
                    </h3>
                ) : (
                    <h3 className="text-lg font-medium text-gray-900">
                        {t('pages.profile.twoFactorAuthenticationForm.disabled')}
                    </h3>
                )}

                <div className="mt-3 max-w-xl text-sm text-gray-600">
                    <p>{t('pages.profile.twoFactorAuthenticationForm.content')}</p>
                </div>

                {twoFactorEnabled() && (
                    <div>
                        {qrCode && (
                            <div>
                                <div className="mt-4 max-w-xl text-sm text-gray-600">
                                    <p className="font-semibold">
                                        {t('pages.profile.twoFactorAuthenticationForm.qr')}
                                    </p>
                                </div>

                                <div
                                    className="mt-4 dark:p-4 dark:w-56 dark:bg-white"
                                    dangerouslySetInnerHTML={{ __html: qrCode }}
                                />
                            </div>
                        )}

                        {recoveryCodes.length > 0 && (
                            <div>
                                <div className="mt-4 max-w-xl text-sm text-gray-600">
                                    <p className="font-semibold">
                                        {t('pages.profile.twoFactorAuthenticationForm.recovery')}
                                    </p>
                                </div>

                                <div className="grid gap-1 max-w-xl mt-4 px-4 py-4 font-mono text-sm bg-gray-100 rounded-lg">
                                    {recoveryCodes.map((code) => (
                                        <div key={code}>{code}</div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div className="mt-5">
                    {!twoFactorEnabled() ? (
                        <ConfirmPassword confirmed={enableTwoFactorAuthentication}>
                            <Button
                                type="button"
                                className={`${enabling ? 'opacity-25' : ''}`}
                                disabled={enabling}
                                text="pages.profile.twoFactorAuthenticationForm.enable"
                            />
                        </ConfirmPassword>
                    ) : (
                        <div>
                            <ConfirmPassword confirmed={regenerateRecoveryCodes}>
                                {recoveryCodes.length > 0 && (
                                    <SecondaryButton
                                        type="button"
                                        className="mr-3"
                                        text="pages.profile.twoFactorAuthenticationForm.regenerateRecoveryCodes"
                                    />
                                )}
                            </ConfirmPassword>
                            <ConfirmPassword confirmed={showRecoveryCodes}>
                                {recoveryCodes.length > 0 && (
                                    <SecondaryButton
                                        type="button"
                                        className="mr-3"
                                        text="pages.profile.twoFactorAuthenticationForm.showRecoveryCodes"
                                    />
                                )}
                            </ConfirmPassword>
                            <ConfirmPassword confirmed={disableTwoFactorAuthentication}>
                                <DangerButton
                                    className={`${disabling ? 'opacity-25' : ''}`}
                                    disabled={disabling}
                                    text="pages.profile.twoFactorAuthenticationForm.disable"
                                />
                            </ConfirmPassword>
                        </div>
                    )}
                </div>
            </ActionSection.Content>
        </ActionSection>
    );
};

export default TwoFactorAuthenticationForm;
