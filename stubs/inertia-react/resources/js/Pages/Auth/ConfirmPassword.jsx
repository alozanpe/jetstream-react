import React from 'react';
import { Head, useForm } from '@inertiajs/inertia-react';
import { useTranslation } from 'react-i18next';

import AuthenticationCard from '@/Jetstream/AuthenticationCard';
import ValidationErrors from '@/Jetstream/ValidationErrors';
import Label from '@/Jetstream/Label';
import Input from '@/Jetstream/Input';
import Button from '@/Jetstream/Button';

const ConfirmPassword = () => {
    const { t } = useTranslation();

    const form = useForm({
        password: '',
    });

    const onSubmit = (e) => {
        e.preventDefault();

        form.post(route('password.confirm'), {
            onFinish: () => form.reset(),
        });
    };

    return (
        <React.Fragment>
            <Head title="Secure Area" />

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
                            autoComplete="current-password"
                            autoFocus
                            value={form.data.password}
                            onChange={(e) => form.setData('password', e.target.value)}
                        />
                    </div>

                    <div className="flex justify-end mt-4">
                        <Button
                            text={t('pages.confirmPassword.confirm')}
                            className={`${form.processing ? 'opacity-25' : ''} ml-4`}
                            disabled={form.processing}
                        />
                    </div>
                </form>
            </AuthenticationCard>
        </React.Fragment>
    );
};

export default ConfirmPassword;
