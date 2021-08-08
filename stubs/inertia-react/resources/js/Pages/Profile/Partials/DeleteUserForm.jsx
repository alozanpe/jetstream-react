import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePage, useForm } from '@inertiajs/inertia-react';

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
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);

    const form = useForm({
        password: '',
    });

    const doConfirmUserDeletion = () => {
        doToggleModal();
        setConfirmingUserDeletion(true);
    };

    const closeModal = () => {
        doToggleModal();
        setConfirmingUserDeletion(false);

        form.reset();
    };

    const deleteUser = () => {
        form.delete(route('current-user.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => form.reset(),
        });
    };

    return (
        <ActionSection>
            <ActionSection.Title>{t('pages.profile.deleteUserForm.title')}</ActionSection.Title>

            <ActionSection.Description>{t('pages.profile.deleteUserForm.description')}</ActionSection.Description>

            <ActionSection.Content>
                <div className="max-w-xl text-sm text-gray-600">{t('pages.profile.deleteUserForm.content')}</div>
                <div className="mt-5">
                    <DangerButton text={t('pages.profile.deleteUserForm.title')} onClick={doConfirmUserDeletion} />
                </div>

                {/* Delete Account Confirmation Modal */}
                {confirmingUserDeletion && (
                    <DialogModal>
                        <DialogModal.Title>{t('pages.profile.deleteUserForm.title')}</DialogModal.Title>

                        <DialogModal.Content>
                            {t('pages.profile.deleteUserForm.modalContent')}
                            <div className="mt-4">
                                <Input
                                    id="password"
                                    type="password"
                                    className="mt-1 block w-3/4"
                                    placeholder={t('pages.profile.deleteUserForm.passwordPlaceholder')}
                                    required
                                    autoFocus
                                    value={form.data.password}
                                    onChange={(e) => form.setData('password', e.target.value)}
                                />

                                <InputError message={errors.password} className="mt-2" />
                            </div>
                        </DialogModal.Content>

                        <DialogModal.Footer>
                            <SecondaryButton
                                text={t('app.nevermind')}
                                onClick={() => {
                                    doToggleModal();
                                    setConfirmingUserDeletion(false);
                                }}
                            />
                            <DangerButton
                                className={`${form.processing ? 'opacity-25' : ''} ml-2`}
                                text={t('pages.profile.deleteUserForm.title')}
                                disabled={form.processing}
                                onClick={deleteUser}
                            />
                        </DialogModal.Footer>
                    </DialogModal>
                )}
            </ActionSection.Content>
        </ActionSection>
    );
};

export default DeleteUserForm;
