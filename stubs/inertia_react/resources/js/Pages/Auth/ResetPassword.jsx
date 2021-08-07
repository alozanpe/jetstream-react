import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import { useTranslation } from 'react-i18next';

import AuthenticationCard from '@/Jetstream/AuthenticationCard';
import ValidationErrors from '@/Jetstream/ValidationErrors';
import Label from '@/Jetstream/Label';
import Input from '@/Jetstream/Input';
import Button from '@/Jetstream/Button';

const ResetPassword = () => {
    const { email, token } = usePage().props;
    const { t } = useTranslation();
    const [values, setValues] = useState({
        token,
        email,
        password: '',
        password_confirmation: '',
    });

    const onSubmit = (e) => {
        e.preventDefault();

        Inertia.post(route('password.update'), values);
    };

    const onChange = (e) => {
        setValues({
            ...values,
            [e.target.id]: e.target.value,
        });
    };

    return (
        <AuthenticationCard>
            <ValidationErrors className="mb-4" />

            <form onSubmit={onSubmit}>
                <div>
                    <Label htmlFor="email" value={t('pages.resetPassword.email')} />
                    <Input
                        id="email"
                        type="text"
                        className="mt-1 block w-full"
                        required
                        onChange={onChange}
                    />
                </div>
                <div className="mt-4">
                    <Label htmlFor="password" value={t('pages.resetPassword.password')} />
                    <Input
                        id="password"
                        type="password"
                        className="mt-1 block w-full"
                        required
                        onChange={onChange}
                    />
                </div>
                <div className="mt-4">
                    <Label
                        htmlFor="password_confirmation"
                        value={t('pages.resetPassword.confirmation')}
                    />
                    <Input
                        id="password_confirmation"
                        type="password"
                        className="mt-1 block w-full"
                        required
                        onChange={onChange}
                    />
                </div>

                <div className="flex justify-end mt-4">
                    <Button className="ml-4" text={t('pages.resetPassword.reset')} />
                </div>
            </form>
        </AuthenticationCard>
    );
};

export default ResetPassword;
