import React, { createRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from '@inertiajs/inertia-react';

import FormSection from '@/Jetstream/FormSection';
import Label from '@/Jetstream/Label';
import Input from '@/Jetstream/Input';
import Button from '@/Jetstream/Button';
import InputError from '@/Jetstream/InputError';
import ActionMessage from '@/Jetstream/ActionMessage';

const UpdatePasswordForm = () => {
    const { t } = useTranslation();

    const currentPasswordRef = createRef();
    const passwordRef = createRef();

    const form = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        form.put(route('user-password.update'), {
            errorBag: 'updatePassword',
            preserveScroll: true,
            onSuccess: () => form.reset(),
            onError: () => {
                if (form.errors.password) {
                    form.reset('password', 'password_confirmation');
                    passwordRef.current.focus();
                }

                if (form.errors.current_password) {
                    form.reset('current_password');
                    currentPasswordRef.current.focus();
                }
            },
        });
    };

    return (
        <FormSection onSubmit={updatePassword}>
            <FormSection.Title>{t('pages.profile.updatePasswordForm.title')}</FormSection.Title>

            <FormSection.Description>{t('pages.profile.updatePasswordForm.description')}</FormSection.Description>

            <FormSection.Form>
                <div className="col-span-6 sm:col-span-4">
                    <Label htmlFor="current_password" value={t('pages.profile.updatePasswordForm.current')} />
                    <Input
                        id="current_password"
                        type="password"
                        className="mt-1 block w-full"
                        value={form.data.current_password}
                        onChange={(e) => form.setData('current_password', e.target.value)}
                        ref={currentPasswordRef}
                    />
                    <InputError message={form.errors.current_password} className="mt-2" />
                </div>

                <div className="col-span-6 sm:col-span-4">
                    <Label for="password" value={t('pages.profile.updatePasswordForm.new')} />
                    <Input
                        id="password"
                        type="password"
                        className="mt-1 block w-full"
                        value={form.data.password}
                        onChange={(e) => form.setData('password', e.target.value)}
                        ref={passwordRef}
                    />
                    <InputError message={form.errors.password} className="mt-2" />
                </div>

                <div className="col-span-6 sm:col-span-4">
                    <Label for="password_confirmation" value={t('pages.profile.updatePasswordForm.confirmation')} />
                    <Input
                        id="password_confirmation"
                        type="password"
                        className="mt-1 block w-full"
                        value={form.data.password_confirmation}
                        onChange={(e) => form.setData('password_confirmation', e.target.value)}
                    />
                    <InputError message={form.errors.password} className="mt-2" />
                </div>
            </FormSection.Form>

            <FormSection.Actions>
                <ActionMessage on={form.recentlySuccessful} className="mr-3">
                    {t('app.saved')}
                </ActionMessage>

                <Button className={`${form.processing ? 'opacity-25' : ''}`} disabled={form.processing}>
                    {t('app.save')}
                </Button>
            </FormSection.Actions>
        </FormSection>
    );
};

export default UpdatePasswordForm;
