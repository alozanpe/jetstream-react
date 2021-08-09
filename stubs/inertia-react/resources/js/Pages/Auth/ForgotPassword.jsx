import React from 'react';
import { usePage, useForm, Head } from '@inertiajs/inertia-react';
import { useTranslation } from 'react-i18next';

import AuthenticationCard from '@/Jetstream/AuthenticationCard';
import ValidationErrors from '@/Jetstream/ValidationErrors';
import Label from '@/Jetstream/Label';
import Input from '@/Jetstream/Input';
import Button from '@/Jetstream/Button';

const ForgotPassword = () => {
    const { status } = usePage().props;
    const { t } = useTranslation();

    const form = useForm({
        email: '',
    });

    const onSubmit = (e) => {
        e.preventDefault();

        form.post(route('password.email'));
    };

    return (
        <React.Fragment>
            <Head title="Forgot Password" />

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
                            autoFocus
                            value={form.data.email}
                            onChange={(e) => form.setData('email', e.target.value)}
                        />
                    </div>

                    <div className="flex justify-end mt-4">
                        <Button className={`${form.processing ? 'opacity-25' : ''} ml-4`} disabled={form.processing}>
                            {t('pages.forgotPassword.send')}
                        </Button>
                    </div>
                </form>
            </AuthenticationCard>
        </React.Fragment>
    );
};

export default ForgotPassword;
