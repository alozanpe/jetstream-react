import React from 'react';
import Button from '@/Jetstream/Button';
import FormSection from '@/Jetstream/FormSection';
import Input from '@/Jetstream/Input';
import InputError from '@/Jetstream/InputError';
import Label from '@/Jetstream/Label';
import { useForm, usePage } from '@inertiajs/inertia-react';

const CreateTeamForm = () => {
    const { user } = usePage().props;

    const form = useForm({
        name: '',
    });

    const createTeam = () => {
        form.post(route('teams.store'), {
            errorBag: 'createTeam',
            preserveScroll: true,
        });
    };

    return (
        <FormSection onSubmit={createTeam}>
            <FormSection.Title>Team Details</FormSection.Title>

            <FormSection.Description>Create a new team to collaborate with others on projects.</FormSection.Description>

            <FormSection.Form>
                <div className="col-span-6">
                    <Label value="Team Owner" />

                    <div className="flex items-center mt-2">
                        <img
                            className="w-12 h-12 rounded-full object-cover"
                            src={user.profile_photo_url}
                            alt={user.name}
                        />

                        <div className="ml-4 leading-tight">
                            <div>{user.name}</div>
                            <div className="text-gray-700 text-sm">{user.email}</div>
                        </div>
                    </div>
                </div>

                <div className="col-span-6 sm:col-span-4">
                    <Label for="name" value="Team Name" />
                    <Input
                        id="name"
                        type="text"
                        className="mt-1 block w-full"
                        value={form.data.name}
                        autoFocus
                        onChange={(e) => form.setData('name', e.target.value)}
                    />
                    <InputError message={form.errors.name} className="mt-2" />
                </div>
            </FormSection.Form>

            <FormSection.Actions>
                <Button
                    className={`${form.processing ? 'opacity-25' : ''}`}
                    disabled={form.processing}
                    text="app.create"
                />
            </FormSection.Actions>
        </FormSection>
    );
};

export default CreateTeamForm;
