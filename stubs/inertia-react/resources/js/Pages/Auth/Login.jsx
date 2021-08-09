import React from 'react';
import { usePage, useForm, Link, Head } from '@inertiajs/inertia-react';
import { useTranslation } from 'react-i18next';

import AuthenticationCard from '@/Jetstream/AuthenticationCard';
import ValidationErrors from '@/Jetstream/ValidationErrors';
import Label from '@/Jetstream/Label';
import Input from '@/Jetstream/Input';
import Checkbox from '@/Jetstream/Checkbox';
import Button from '@/Jetstream/Button';

const Login = () => {
    const { canResetPassword, status } = usePage().props;
    const { t } = useTranslation();

    const form = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const onSubmit = (e) => {
        e.preventDefault();

        form.transform((data) => ({
            ...data,
            remember: form.remember ? 'on' : '',
        }));

        form.post(route('login'), {
            onFinish: () => form.reset('password'),
        });
    };

    return (
        <React.Fragment>
            <Head title="Log in" />

            <AuthenticationCard>
                <ValidationErrors className="mb-4" />

                {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

                <form onSubmit={onSubmit}>
                    <div>
                        <Label htmlFor="email" value={t('pages.login.email')} />
                        <Input
                            id="email"
                            type="email"
                            className="mt-1 block w-full"
                            required
                            autoFocus
                            value={form.data.email}
                            onChange={(e) => form.setData('email', e.target.value)}
                        />
                    </div>
                    <div className="mt-4">
                        <Label htmlFor="password" value={t('pages.login.password')} />
                        <Input
                            id="password"
                            type="password"
                            className="mt-1 block w-full"
                            required
                            value={form.data.password}
                            onChange={(e) => form.setData('password', e.target.value)}
                        />
                    </div>
                    <div className="block mt-4">
                        <label className="flex items-center">
                            <Checkbox
                                id="remember"
                                name="remember"
                                checked={form.data.remember}
                                onChange={(e) => form.setData('remember', e.target.checked)}
                            />
                            <span className="ml-2 text-sm text-gray-600">{t('pages.login.rememberMe')}</span>
                        </label>
                    </div>
                    <div className="flex items-center justify-end mt-4">
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="underline text-sm text-gray-600 hover:text-gray-900"
                            >
                                {t('pages.login.forgot')}
                            </Link>
                        )}

                        <Button className={form.processing ? 'opacity-25 ml-4' : 'ml-4'} disabled={form.processing}>
                            {t('pages.login.login')}
                        </Button>
                    </div>
                </form>
            </AuthenticationCard>
        </React.Fragment>
    );
};

export default Login;
