import React from 'react';
import { usePage, useForm, Link, Head } from '@inertiajs/inertia-react';
import { useTranslation } from 'react-i18next';

import AuthenticationCard from '@/Jetstream/AuthenticationCard';
import ValidationErrors from '@/Jetstream/ValidationErrors';
import Label from '@/Jetstream/Label';
import Input from '@/Jetstream/Input';
import Checkbox from '@/Jetstream/Checkbox';
import Button from '@/Jetstream/Button';

const Register = () => {
    const { jetstream } = usePage().props;
    const { t } = useTranslation();

    const form = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        terms: false,
    });

    const onSubmit = (e) => {
        e.preventDefault();

        form.post(route('register'), {
            onFinish: () => form.reset('password', 'password_confirmation'),
        });
    };

    return (
        <React.Fragment>
            <Head title="Register" />

            <AuthenticationCard>
                <ValidationErrors className="mb-4" />

                <form onSubmit={onSubmit}>
                    <div>
                        <Label htmlFor="name" value={t('pages.register.name')} />
                        <Input
                            id="name"
                            type="text"
                            className="mt-1 block w-full"
                            required
                            autoFocus
                            autoComplete="name"
                            value={form.data.name}
                            onChange={(e) => form.setData('name', e.target.value)}
                        />
                    </div>
                    <div className="mt-4">
                        <Label htmlFor="email" value={t('pages.register.email')} />
                        <Input
                            id="email"
                            type="text"
                            className="mt-1 block w-full"
                            required
                            value={form.data.email}
                            onChange={(e) => form.setData('email', e.target.value)}
                        />
                    </div>
                    <div className="mt-4">
                        <Label htmlFor="password" value={t('pages.register.password')} />
                        <Input
                            id="password"
                            type="password"
                            className="mt-1 block w-full"
                            required
                            autoComplete="new-password"
                            value={form.data.password}
                            onChange={(e) => form.setData('password', e.target.value)}
                        />
                    </div>
                    <div className="mt-4">
                        <Label htmlFor="password_confirmation" value={t('pages.register.confirmation')} />
                        <Input
                            id="password_confirmation"
                            type="password"
                            className="mt-1 block w-full"
                            required
                            autoComplete="new-password"
                            value={form.data.password_confirmation}
                            onChange={(e) => form.setData('password_confirmation', e.target.value)}
                        />
                    </div>
                    {jetstream.hasTermsAndPrivacyPolicyFeature && (
                        <div className="mt-4">
                            <Label htmlFor="terms">
                                <div className="flex items-center">
                                    <Checkbox
                                        name="terms"
                                        id="terms"
                                        checked={form.data.terms}
                                        onChange={(e) => form.setData('terms', e.target.checked)}
                                    />

                                    <div className="ml-2">
                                        {t('pages.register.agree')}{' '}
                                        <a
                                            target="_blank"
                                            href={route('terms.show')}
                                            className="underline text-sm text-gray-600 hover:text-gray-900"
                                        >
                                            {t('pages.register.terms')}
                                        </a>{' '}
                                        {t('pages.register.and')}{' '}
                                        <a
                                            target="_blank"
                                            href={route('policy.show')}
                                            className="underline text-sm text-gray-600 hover:text-gray-900"
                                        >
                                            {t('pages.register.privacy')}{' '}
                                        </a>
                                    </div>
                                </div>
                            </Label>
                        </div>
                    )}

                    <div className="flex items-center justify-end mt-4">
                        <Link href={route('login')} className="underline text-sm text-gray-600 hover:text-gray-900">
                            {t('pages.register.already')}
                        </Link>

                        <Button className={form.processing ? 'opacity-25 ml-4' : 'ml-4'} disabled={form.processing}>
                            {t('pages.register.register')}
                        </Button>
                    </div>
                </form>
            </AuthenticationCard>
        </React.Fragment>
    );
};

export default Register;
