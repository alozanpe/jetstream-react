import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage, InertiaLink } from '@inertiajs/inertia-react';
import { useTranslation } from 'react-i18next';

import AuthenticationCard from '@/Jetstream/AuthenticationCard';
import ValidationErrors from '@/Jetstream/ValidationErrors';
import Label from '@/Jetstream/Label';
import Input from '@/Jetstream/Input';
import Checkbox from '@/Jetstream/Checkbox';
import Button from '@/Jetstream/Button';

const Login = () => {
    const { errors, canResetPassword, status } = usePage().props;
    const { t } = useTranslation();
    const [values, setValues] = useState({
        email: '',
        password: '',
        remember: false,
    });

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = {
            ...values,
            remember: values.remember ? 'on' : '',
        };

        Inertia.post(route('login'), formData);
    };

    const onChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        setValues({
            ...values,
            [e.target.id]: value,
        });
    };

    return (
        <AuthenticationCard>
            <ValidationErrors className="mb-4" errors={errors} />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={onSubmit}>
                <div>
                    <Label htmlFor="email" value={t('pages.login.email')} />
                    <Input
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        required
                        value={values.email}
                        onChange={onChange}
                    />
                </div>
                <div className="mt-4">
                    <Label htmlFor="password" value={t('pages.login.password')} />
                    <Input
                        id="password"
                        type="password"
                        className="mt-1 block w-full"
                        required
                        value={values.password}
                        onChange={onChange}
                    />
                </div>
                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox
                            id="remember"
                            name="remember"
                            value={values.remember}
                            onChange={onChange}
                        />
                        <span className="ml-2 text-sm text-gray-600">
                            {t('pages.login.rememberMe')}
                        </span>
                    </label>
                </div>
                <div className="flex items-center justify-end mt-4">
                    {canResetPassword && (
                        <InertiaLink
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 hover:text-gray-900"
                        >
                            {t('pages.login.forgot')}
                        </InertiaLink>
                    )}

                    <Button className="ml-4" text={t('pages.login.login')} />
                </div>
            </form>
        </AuthenticationCard>
    );
};

export default Login;
