import React from 'react';
import { usePage, useForm, Head } from '@inertiajs/inertia-react';
import { useTranslation } from 'react-i18next';

import AuthenticationCard from '@/Jetstream/AuthenticationCard';
import ValidationErrors from '@/Jetstream/ValidationErrors';
import Label from '@/Jetstream/Label';
import Input from '@/Jetstream/Input';
import Button from '@/Jetstream/Button';

const ResetPassword = () => {
    const { email, token } = usePage().props;
    const { t } = useTranslation();

    const form = useForm({
        token,
        email,
        password: '',
        password_confirmation: '',
    });

    const onSubmit = (e) => {
        e.preventDefault();

        form.post(route('password.update'), {
            onFinish: () => form.reset('password', 'password_confirmation'),
        });
    };

    return (
        <React.Fragment>
            <Head title="Reset Password" />

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
                            autoFocus
                            value={form.data.email}
                            onChange={(e) => form.setData('email', e.target.value)}
                        />
                    </div>
                    <div className="mt-4">
                        <Label htmlFor="password" value={t('pages.resetPassword.password')} />
                        <Input
                            id="password"
                            type="password"
                            className="mt-1 block w-full"
                            required
                            autocomplete="new-password"
                            value={form.data.password}
                            onChange={(e) => form.setData('password', e.target.value)}
                        />
                    </div>
                    <div className="mt-4">
                        <Label htmlFor="password_confirmation" value={t('pages.resetPassword.confirmation')} />
                        <Input
                            id="password_confirmation"
                            type="password"
                            className="mt-1 block w-full"
                            required
                            autocomplete="new-password"
                            value={form.data.password_confirmation}
                            onChange={(e) => form.setData('password_confirmation', e.target.value)}
                        />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Button
                            className={`${form.processing ? 'opacity-25' : ''} ml-4`}
                            disabled={form.processing}
                            text="pages.resetPassword.reset"
                        />
                    </div>
                </form>
            </AuthenticationCard>
        </React.Fragment>
    );
};

export default ResetPassword;
