import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePage, useForm } from '@inertiajs/inertia-react';

import ActionSection from '@/Jetstream/ActionSection';
import Button from '@/Jetstream/Button';
import DangerButton from '@/Jetstream/DangerButton';
import SecondaryButton from '@/Jetstream/SecondaryButton';
import DialogModal from '@/Jetstream/DialogModal';
import Input from '@/Jetstream/Input';
import InputError from '@/Jetstream/InputError';

const LogoutOtherBrowserSessionsForm = () => {
    const { t } = useTranslation();
    const { errors, sessions } = usePage().props;
    const [confirmingLogout, setConfirmingLogout] = useState(false);

    const form = useForm({
        password: '',
    });

    const closeModal = () => {
        setConfirmingLogout(false);

        form.clearErrors();
        form.reset();
    };

    const confirmLogout = () => {
        setConfirmingLogout(true);
    };

    const logoutOtherBrowserSessions = () => {
        form.delete(route('other-browser-sessions.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => form.reset(),
        });
    };

    return (
        <ActionSection>
            <ActionSection.Title>{t('pages.profile.logoutOtherSessionsForm.title')}</ActionSection.Title>

            <ActionSection.Description>
                {t('pages.profile.logoutOtherSessionsForm.description')}
            </ActionSection.Description>

            <ActionSection.Content>
                <div className="max-w-xl text-sm text-gray-600">
                    {t('pages.profile.logoutOtherSessionsForm.content')}
                </div>
                {/* Other Browser Sessions */}
                {sessions.length > 0 && (
                    <div className="mt-5 space-y-6">
                        {sessions.map((session, i) => (
                            <div className="flex items-center" key={i}>
                                <div>
                                    {session.agent.is_desktop ? (
                                        <svg
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            className="w-8 h-8 text-gray-500"
                                        >
                                            <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            strokeWidth="2"
                                            stroke="currentColor"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="w-8 h-8 text-gray-500"
                                        >
                                            <path d="M0 0h24v24H0z" stroke="none"></path>
                                            <rect x="7" y="4" width="10" height="16" rx="1"></rect>
                                            <path d="M11 5h2M12 17v.01"></path>
                                        </svg>
                                    )}
                                </div>
                                <div className="ml-3">
                                    <div className="text-sm text-gray-600">
                                        {session.agent.platform} - {session.agent.browser}
                                    </div>

                                    <div>
                                        <div className="text-xs text-gray-500">
                                            {session.ip_address}
                                            {', '}
                                            {session.is_current_device ? (
                                                <span className="text-green-500 font-semibold">
                                                    {t('pages.profile.logoutOtherSessionsForm.this')}
                                                </span>
                                            ) : (
                                                <span>
                                                    {t('pages.profile.logoutOtherSessionsForm.last')}{' '}
                                                    {session.last_active}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="flex items-center mt-5">
                    <Button onClick={confirmLogout}>{t('pages.profile.logoutOtherSessionsForm.logoutOther')}</Button>
                </div>

                {/* Logout Other Devices Confirmation Modal */}
                <DialogModal onClose={closeModal} show={confirmingLogout}>
                    <DialogModal.Title>{t('pages.profile.logoutOtherSessionsForm.logoutOther')}</DialogModal.Title>

                    <DialogModal.Content>
                        {t('pages.profile.logoutOtherSessionsForm.confirm')}
                        <div className="mt-4">
                            <Input
                                id="password"
                                type="password"
                                className="mt-1 block w-3/4"
                                placeholder={t('pages.profile.logoutOtherSessionsForm.passwordPlaceholder')}
                                required
                                autoFocus
                                value={form.data.password}
                                onChange={(e) => form.setData('password', e.target.value)}
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>
                    </DialogModal.Content>

                    <DialogModal.Footer>
                        <SecondaryButton onClick={() => setConfirmingLogout(false)}>
                            {t('app.nevermind')}
                        </SecondaryButton>

                        <DangerButton
                            className={`${form.processing ? 'opacity-25' : ''} ml-2`}
                            onClick={logoutOtherBrowserSessions}
                            disabled={form.processing}
                        >
                            {t('pages.profile.logoutOtherSessionsForm.logoutOther')}
                        </DangerButton>
                    </DialogModal.Footer>
                </DialogModal>
            </ActionSection.Content>
        </ActionSection>
    );
};

export default LogoutOtherBrowserSessionsForm;
