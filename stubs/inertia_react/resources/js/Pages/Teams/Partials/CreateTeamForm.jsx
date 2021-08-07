import React, { useState } from 'react';
import { usePage } from '@inertiajs/inertia-react';
import { useTranslation } from 'react-i18next';
import { Inertia } from '@inertiajs/inertia';

import Button from '@/Jetstream/Button';
import FormSection from '@/Jetstream/FormSection';
import Input from '@/Jetstream/Input';
import InputError from '@/Jetstream/InputError';
import Label from '@/Jetstream/Label';

const CreateTeamForm = () => {
    const { t } = useTranslation();
    const { user } = usePage().props;
    const [form, setForm] = useState({ name: '', processing: false, errors: null });

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value,
        });
    };

    const createTeam = () => {
        setForm({
            ...form,
            processing: true,
        });

        Inertia.post(
            route('teams.store'),
            {
                name: form.name,
            },
            {
                errorBag: 'createTeam',
                preserveScroll: true,
                onSuccess: () => {
                    setForm({
                        name: '',
                        processing: false,
                        errors: null,
                    });
                },
                onError: (errors) => {
                    setForm({
                        ...form,
                        errors,
                    });
                },
                onFinish: () => {
                    setForm({
                        ...form,
                        processing: false,
                    });
                },
            }
        );
    }

    return (
        <FormSection onSubmit={createTeam}>
            <FormSection.Title>{t('pages.teams.createTeamForm.title')}</FormSection.Title>
            <FormSection.Description>
                {t('pages.teams.createTeamForm.description')}
            </FormSection.Description>
            <FormSection.Form>
                <div className="col-span-6">
                    <Label value={t('pages.teams.createTeamForm.teamOwner')} />

                    <div className="flex items-center mt-2">
                        <img className="w-12 h-12 rounded-full object-cover" src={user.profile_photo_url} alt={user.name} />

                        <div className="ml-4 leading-tight">
                            <div>{user.name}</div>
                            <div className="text-gray-700 text-sm">{user.email}</div>
                        </div>
                    </div>
                </div>

                <div className="col-span-6 sm:col-span-4">
                    <Label htmlFor="name" value={t('pages.teams.createTeamForm.teamName')} />
                    <Input id="name" type="text" className="mt-1 block w-full" value={form.name} autofocus onChange={onChange} />
                    <InputError message={form.errors?.name} className="mt-2" />
                </div>
            </FormSection.Form>
            <FormSection.Actions>
                <Button
                    className={`${form.processing ? 'opacity-25' : ''} ml-2`}
                    disabled={form.processing}
                    text="app.create"
                />
            </FormSection.Actions>
        </FormSection>
    );
};

export default CreateTeamForm;
