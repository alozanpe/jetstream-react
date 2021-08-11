import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { usePage, useForm } from '@inertiajs/inertia-react';

import ActionSection from '@/Jetstream/ActionSection';
import DangerButton from '@/Jetstream/DangerButton';
import SecondaryButton from '@/Jetstream/SecondaryButton';
import DialogModal from '@/Jetstream/DialogModal';
import Input from '@/Jetstream/Input';
import InputError from '@/Jetstream/InputError';

const DeleteUserForm = () => {
    const { t } = useTranslation();
    const { errors } = usePage().props;
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordRef = useRef();

    const form = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        form.reset();
    };

    const deleteUser = () => {
        form.delete(route('current-user.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordRef.current.focus(),
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
                    <DangerButton onClick={confirmUserDeletion}>Delete Account</DangerButton>
                </div>

                {/* Delete Account Confirmation Modal */}
                <DialogModal onClose={closeModal} show={confirmingUserDeletion}>
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
                                ref={passwordRef}
                                onChange={(e) => form.setData('password', e.target.value)}
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>
                    </DialogModal.Content>

                    <DialogModal.Footer>
                        <SecondaryButton
                            onClick={closeModal}
                            className={form.processing && 'opacity-25'}
                            type="button"
                            disabled={form.processing}
                        >
                            Cancel
                        </SecondaryButton>

                        <DangerButton
                            onClick={deleteUser}
                            className={`ml-2 ${form.processing && 'opacity-25'}`}
                            type="button"
                            disabled={form.processing}
                        >
                            Delete Account
                        </DangerButton>
                    </DialogModal.Footer>
                </DialogModal>
            </ActionSection.Content>
        </ActionSection>
    );
};

export default DeleteUserForm;
