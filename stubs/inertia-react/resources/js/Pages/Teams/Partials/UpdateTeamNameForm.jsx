import React from 'react';
import { usePage, useForm } from '@inertiajs/inertia-react';
import ActionMessage from '@/Jetstream/ActionMessage';
import Button from '@/Jetstream/Button';
import FormSection from '@/Jetstream/FormSection';
import Input from '@/Jetstream/Input';
import InputError from '@/Jetstream/InputError';
import Label from '@/Jetstream/Label';

const UpdateTeamNameForm = () => {
    const { team, permissions } = usePage().props;

    const form = useForm({
        name: team.name,
    });

    const updateTeamName = () => {
        form.put(route('teams.update', team), {
            errorBag: 'updateTeamName',
            preserveScroll: true,
        });
    };

    return (
        <FormSection onSubmit={updateTeamName}>
            <FormSection.Title>Team Name</FormSection.Title>

            <FormSection.Description>The team's name and owner information.</FormSection.Description>

            <FormSection.Form>
                {/* Team Owner Information */}
                <div className="col-span-6">
                    <jet-label value="Team Owner" />

                    <div className="flex items-center mt-2">
                        <img
                            className="w-12 h-12 rounded-full object-cover"
                            src={team.owner.profile_photo_url}
                            alt={team.owner.name}
                        />

                        <div className="ml-4 leading-tight">
                            <div>{team.owner.name}</div>
                            <div className="text-gray-700 text-sm">{team.owner.email}</div>
                        </div>
                    </div>
                </div>

                {/* Team Name */}
                <div className="col-span-6 sm:col-span-4">
                    <Label for="name" value="Team Name" />

                    <Input
                        id="name"
                        type="text"
                        className="mt-1 block w-full"
                        value={form.data.name}
                        disabled={!permissions.canUpdateTeam}
                    />

                    <InputError message={form.errors.name} className="mt-2" />
                </div>
            </FormSection.Form>

            {permissions.canUpdateTeam && (
                <FormSection.Actions>
                    <ActionMessage on={form.recentlySuccessful} className="mr-3">
                        Saved.
                    </ActionMessage>

                    <Button className={form.processing ? 'opacity-25' : ''} disabled={form.processing}>
                        Save
                    </Button>
                </FormSection.Actions>
            )}
        </FormSection>
    );
};

export default UpdateTeamNameForm;
