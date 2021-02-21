import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Inertia } from '@inertiajs/inertia';

import FormSection from '@/Jetstream/FormSection';
import Label from '@/Jetstream/Label';
import Input from '@/Jetstream/Input';
import Button from '@/Jetstream/Button';
import InputError from '@/Jetstream/InputError';

const UpdatePasswordForm = ({ errors }) => {
    const { t } = useTranslation();
    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const currentPasswordRef = useRef();
    const passwordRef = useRef();

    const updatePassword = (e) => {
        e.preventDefault();
        Inertia.put(
            route('user-password.update'),
            {
                current_password: currentPassword,
                password,
                password_confirmation: passwordConfirmation,
            },
            {
                errorBag: 'updatePassword',
                preserveScroll: true,
                onSuccess: () => {
                    setCurrentPassword('');
                    setPassword('');
                    setPasswordConfirmation('');
                },
                onError: () => {
                    if (errors.password) {
                        setPassword('');
                        setPasswordConfirmation('');
                        setTimeout(() => {
                            passwordRef.current.focus();
                        }, 500);
                    }

                    if (errors.current_password) {
                        setCurrentPassword('');
                        setTimeout(() => {
                            currentPasswordRef.current.focus();
                        }, 500);
                    }
                },
            }
        );
    };

    return (
        <FormSection onSubmit={updatePassword}>
            <FormSection.Title>{t('pages.profile.updatePasswordForm.title')}</FormSection.Title>
            <FormSection.Description>
                {t('pages.profile.updatePasswordForm.description')}
            </FormSection.Description>
            <FormSection.Form>
                <div className="col-span-6 sm:col-span-4">
                    <Label
                        htmlFor="current_password"
                        value={t('pages.profile.updatePasswordForm.current')}
                    />
                    <Input
                        id="current_password"
                        type="password"
                        className="mt-1 block w-full"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        refProp={currentPasswordRef}
                    />
                    <InputError message={errors.current_password} className="mt-2" />
                </div>

                <div className="col-span-6 sm:col-span-4">
                    <Label for="password" value={t('pages.profile.updatePasswordForm.new')} />
                    <Input
                        id="password"
                        type="password"
                        className="mt-1 block w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        refProp={passwordRef}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="col-span-6 sm:col-span-4">
                    <Label
                        for="password_confirmation"
                        value={t('pages.profile.updatePasswordForm.confirmation')}
                    />
                    <Input
                        id="password_confirmation"
                        type="password"
                        className="mt-1 block w-full"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>
            </FormSection.Form>
            <FormSection.Actions>
                <Button text={t('app.save')} />
            </FormSection.Actions>
        </FormSection>
    );
};

UpdatePasswordForm.propTypes = {
    errors: PropTypes.shape({}),
};

UpdatePasswordForm.defaultProps = {
    errors: {},
};

export default UpdatePasswordForm;
