import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import { useTranslation } from 'react-i18next';

import AuthenticationCard from '@/Jetstream/AuthenticationCard';
import ValidationErrors from '@/Jetstream/ValidationErrors';
import Label from '@/Jetstream/Label';
import Input from '@/Jetstream/Input';
import Button from '@/Jetstream/Button';

const ForgotPassword = () => {
    const { status } = usePage().props;
    const { t } = useTranslation();
    const [values, setValues] = useState({
        email: '',
    });

    const onSubmit = (e) => {
        e.preventDefault();

        Inertia.post(route('password.email'), values);
    };

    const onChange = (e) => {
        setValues({
            ...values,
            [e.target.id]: e.target.value,
        });
    };

    return (
        <AuthenticationCard>
            <div className="mb-4 text-sm text-gray-600">{t('pages.forgotPassword.message')}</div>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{{ status }}</div>}

            <ValidationErrors className="mb-4" />

            <form onSubmit={onSubmit}>
                <div>
                    <Label htmlFor="email" value={t('pages.forgotPassword.email')} />
                    <Input
                        id="email"
                        type="text"
                        className="mt-1 block w-full"
                        required
                        onChange={onChange}
                    />
                </div>

                <div className="flex justify-end mt-4">
                    <Button className="ml-4" text={t('pages.forgotPassword.send')} />
                </div>
            </form>
        </AuthenticationCard>
    );
};

export default ForgotPassword;
