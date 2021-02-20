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

const Register = () => {
    const { errors, jetstream } = usePage().props;
    const { t } = useTranslation();
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        terms: false,
    });

    const onSubmit = (e) => {
        e.preventDefault();

        Inertia.post(route('register'), values);
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

            <form onSubmit={onSubmit}>
                <div>
                    <Label htmlFor="name" value={t('pages.register.name')} />
                    <Input
                        id="name"
                        type="text"
                        className="mt-1 block w-full"
                        required
                        value={values.name}
                        onChange={onChange}
                    />
                </div>
                <div className="mt-4">
                    <Label htmlFor="email" value={t('pages.register.email')} />
                    <Input
                        id="email"
                        type="text"
                        className="mt-1 block w-full"
                        required
                        value={values.email}
                        onChange={onChange}
                    />
                </div>
                <div className="mt-4">
                    <Label htmlFor="password" value={t('pages.register.password')} />
                    <Input
                        id="password"
                        type="password"
                        className="mt-1 block w-full"
                        required
                        value={values.password}
                        onChange={onChange}
                    />
                </div>
                <div className="mt-4">
                    <Label
                        htmlFor="password_confirmation"
                        value={t('pages.register.confirmation')}
                    />
                    <Input
                        id="password_confirmation"
                        type="password"
                        className="mt-1 block w-full"
                        required
                        value={values.password_confirmation}
                        onChange={onChange}
                    />
                </div>
                {jetstream.hasTermsAndPrivacyPolicyFeature && (
                    <div className="mt-4">
                        <Label htmlFor="terms">
                            <div className="flex items-center">
                                <Checkbox
                                    name="terms"
                                    id="terms"
                                    value={values.terms}
                                    onChange={onChange}
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
                    <InertiaLink
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900"
                    >
                        {t('pages.register.already')}
                    </InertiaLink>

                    <Button className="ml-4" text={t('pages.register.register')} />
                </div>
            </form>
        </AuthenticationCard>
    );
};

export default Register;
