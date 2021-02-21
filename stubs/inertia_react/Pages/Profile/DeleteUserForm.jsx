import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';

import ActionSection from '@/Jetstream/ActionSection';
import DangerButton from '@/Jetstream/DangerButton';
import SecondaryButton from '@/Jetstream/SecondaryButton';
import DialogModal from '@/Jetstream/DialogModal';
import Input from '@/Jetstream/Input';
import InputError from '@/Jetstream/InputError';

import useApp from '@/Store/app/app-actions';

const DeleteUserForm = () => {
    const { t } = useTranslation();
    const { errors } = usePage().props;
    const { doToggleModal } = useApp();
    const [password, setPassword] = useState('');
    const [confirmingLogout, setConfirmingLogout] = useState(false);
    const [formProcessing, setFormProcessing] = useState(false);

    const deleteUser = () => {
        if (password) {
            setFormProcessing(true);

            Inertia.delete(route('current-user.destroy'), {
                preserveScroll: true,
                data: {
                    password,
                },
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
            <ActionSection.Title>{t('pages.profile.deleteUserForm.title')}</ActionSection.Title>
            <ActionSection.Description>
                {t('pages.profile.deleteUserForm.description')}
            </ActionSection.Description>
            <ActionSection.Content>
                <div className="max-w-xl text-sm text-gray-600">
                    {t('pages.profile.deleteUserForm.content')}
                </div>
                <div className="mt-5">
                    <DangerButton
                        text={t('pages.profile.deleteUserForm.title')}
                        onClick={() => {
                            setConfirmingLogout(true);
                            doToggleModal();
                        }}
                    />
                </div>

                {/* Delete Account Confirmation Modal */}
                {confirmingLogout && (
                    <DialogModal>
                        <DialogModal.Title>
                            {t('pages.profile.deleteUserForm.title')}
                        </DialogModal.Title>
                        <DialogModal.Content>
                            {t('pages.profile.deleteUserForm.modalContent')}
                            <div className="mt-4">
                                <Input
                                    id="password"
                                    type="password"
                                    className="mt-1 block w-3/4"
                                    placeholder={t(
                                        'pages.profile.deleteUserForm.passwordPlaceholder'
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
                                text={t('pages.profile.deleteUserForm.title')}
                                onClick={() => deleteUser()}
                                disabled={formProcessing}
                            />
                        </DialogModal.Footer>
                    </DialogModal>
                )}
            </ActionSection.Content>
        </ActionSection>
    );
};

export default DeleteUserForm;
