import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { useTranslation } from 'react-i18next';

import AuthenticationCard from '@/Jetstream/AuthenticationCard';
import ValidationErrors from '@/Jetstream/ValidationErrors';
import Label from '@/Jetstream/Label';
import Input from '@/Jetstream/Input';
import Button from '@/Jetstream/Button';

const ConfirmPassword = () => {
    const { t } = useTranslation();
    const [values, setValues] = useState({
        password: '',
    });

    const onSubmit = (e) => {
        e.preventDefault();

        Inertia.post(route('password.confirm'), values);
    };

    const onChange = (e) => {
        setValues({
            ...values,
            [e.target.id]: e.target.value,
        });
    };

    return (
        <AuthenticationCard>
            <div className="mb-4 text-sm text-gray-600">{t('pages.confirmPassword.message')}</div>

            <ValidationErrors className="mb-4" />

            <form onSubmit={onSubmit}>
                <div>
                    <Label htmlFor="password" value={t('pages.confirmPassword.password')} />
                    <Input
                        id="password"
                        type="password"
                        className="mt-1 block w-full"
                        required
                        onChange={onChange}
                    />
                </div>

                <div className="flex justify-end mt-4">
                    <Button className="ml-4" text={t('pages.confirmPassword.confirm')} />
                </div>
            </form>
        </AuthenticationCard>
    );
};

export default ConfirmPassword;
