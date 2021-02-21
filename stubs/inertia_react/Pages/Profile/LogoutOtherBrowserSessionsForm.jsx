import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';

import ActionSection from '@/Jetstream/ActionSection';
import Button from '@/Jetstream/Button';
import DangerButton from '@/Jetstream/DangerButton';
import SecondaryButton from '@/Jetstream/SecondaryButton';
import DialogModal from '@/Jetstream/DialogModal';
import Input from '@/Jetstream/Input';
import InputError from '@/Jetstream/InputError';

import useApp from '@/Store/app/app-actions';

const LogoutOtherBrowserSessionsForm = ({ sessions }) => {
    const { t } = useTranslation();
    const { errors } = usePage().props;
    const { doToggleModal } = useApp();
    const [password, setPassword] = useState('');
    const [confirmingLogout, setConfirmingLogout] = useState(false);
    const [formProcessing, setFormProcessing] = useState(false);

    const logoutOtherBrowserSessions = () => {
        if (password) {
            setFormProcessing(true);

            Inertia.delete(route('other-browser-sessions.destroy'), {
                data: {
                    password,
                },
                preserveScroll: true,
                onSuccess: () => doToggleModal(),
                onFinish: () => {
                    setPassword('');
                    setFormProcessing(false);
                },
            });
        }
    };

    return (
        <ActionSection>
            <ActionSection.Title>
                {t('pages.profile.logoutOtherSessionsForm.title')}
            </ActionSection.Title>
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
                                                    {t(
                                                        'pages.profile.logoutOtherSessionsForm.this'
                                                    )}
                                                </span>
                                            ) : (
                                                <span>
                                                    {t(
                                                        'pages.profile.logoutOtherSessionsForm.last'
                                                    )}{' '}
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
                    <Button
                        text={t('pages.profile.logoutOtherSessionsForm.logoutOther')}
                        onClick={() => {
                            setConfirmingLogout(true);
                            doToggleModal();
                        }}
                    />
                </div>
                {/* Logout Other Devices Confirmation Modal */}
                {confirmingLogout && (
                    <DialogModal>
                        <DialogModal.Title>
                            {t('pages.profile.logoutOtherSessionsForm.logoutOther')}
                        </DialogModal.Title>
                        <DialogModal.Content>
                            {t('pages.profile.logoutOtherSessionsForm.confirm')}
                            <div className="mt-4">
                                <Input
                                    id="password"
                                    type="password"
                                    className="mt-1 block w-3/4"
                                    placeholder={t(
                                        'pages.profile.logoutOtherSessionsForm.passwordPlaceholder'
                                    )}
                                    value={password}
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                <InputError message={errors.password} className="mt-2" />
                            </div>
                        </DialogModal.Content>
                        <DialogModal.Footer>
                            <SecondaryButton
                                text={t('app.nevermind')}
                                onClick={() => {
                                    doToggleModal();
                                    setConfirmingLogout(false);
                                }}
                            />
                            <DangerButton
                                className={`${formProcessing ? 'opacity-25' : ''} ml-2`}
                                text={t('pages.profile.logoutOtherSessionsForm.logoutOther')}
                                onClick={() => logoutOtherBrowserSessions()}
                                disabled={formProcessing}
                            />
                        </DialogModal.Footer>
                    </DialogModal>
                )}
            </ActionSection.Content>
        </ActionSection>
    );
};

LogoutOtherBrowserSessionsForm.propTypes = {
    sessions: PropTypes.array,
};

LogoutOtherBrowserSessionsForm.defaultProps = {
    sessions: [],
};

export default LogoutOtherBrowserSessionsForm;
