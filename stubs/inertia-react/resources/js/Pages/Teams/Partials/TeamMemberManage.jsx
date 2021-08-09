import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage, useForm } from '@inertiajs/inertia-react';
import { useTranslation } from 'react-i18next';

import ActionMessage from '@/Jetstream/ActionMessage';
import ActionSection from '@/Jetstream/ActionSection';
import Button from '@/Jetstream/Button';
import ConfirmationModal from '@/Jetstream/ConfirmationModal';
import DangerButton from '@/Jetstream/DangerButton';
import DialogModal from '@/Jetstream/DialogModal';
import FormSection from '@/Jetstream/FormSection';
import Input from '@/Jetstream/Input';
import InputError from '@/Jetstream/InputError';
import Label from '@/Jetstream/Label';
import SecondaryButton from '@/Jetstream/SecondaryButton';
import SectionBorder from '@/Jetstream/SectionBorder';

const TeamMemberManage = () => {
    const { t } = useTranslation();
    const { team, availableRoles, userPermissions, user } = usePage().props;
    const [currentlyManagingRole, setCurrentlyManagingRole] = useState(false);
    const [managingRoleFor, setManagingRoleFor] = useState(null);
    const [confirmingLeavingTeam, setConfirmingLeavingTeam] = useState(false);
    const [teamMemberBeingRemoved, setTeamMemberBeingRemoved] = useState(null);

    const addTeamMemberForm = useForm({
        email: '',
        role: null,
    });

    const updateRoleForm = useForm({
        role: null,
    });

    const leaveTeamForm = useForm();

    const removeTeamMemberForm = useForm();

    const addTeamMember = () => {
        addTeamMemberForm.post(route('team-members.store', team), {
            errorBag: 'addTeamMember',
            preserveScroll: true,
            onSuccess: () => addTeamMemberForm.reset(),
        });
    };

    const cancelTeamInvitation = (invitation) => {
        Inertia.delete(route('team-invitations.destroy', invitation), {
            preserveScroll: true,
        });
    };

    const manageRole = (teamMember) => {
        setManagingRoleFor(teamMember);
        updateRoleForm.setData('role', teamMember.membership.role);
        setCurrentlyManagingRole(true);
    };

    const updateRole = () => {
        updateRoleForm.put(route('team-members.update', [team, managingRoleFor]), {
            preserveScroll: true,
            onSuccess: () => setCurrentlyManagingRole(false),
        });
    };

    const confirmLeavingTeam = () => {
        setConfirmingLeavingTeam(true);
    };

    const leaveTeam = () => {
        leaveTeamForm.delete(route('team-members.destroy', [team, user]));
    };

    const confirmTeamMemberRemoval = (teamMember) => {
        setTeamMemberBeingRemoved(teamMember);
    };

    const removeTeamMember = () => {
        removeTeamMemberForm.delete(route('team-members.destroy', [team, teamMemberBeingRemoved]), {
            errorBag: 'removeTeamMember',
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => setTeamMemberBeingRemoved(null),
        });
    };

    const displayableRole = (role) => {
        return availableRoles.find((r) => r.key === role).name;
    };

    return (
        <div>
            {userPermissions.canAddTeamMembers && (
                <React.Fragment>
                    <SectionBorder />
                    {/* Add Team Member */}{' '}
                    <FormSection onSubmit={addTeamMember}>
                        <FormSection.Title>Add Team Member</FormSection.Title>

                        <FormSection.Description>
                            Add a new team member to your team, allowing them to collaborate with you.
                        </FormSection.Description>

                        <FormSection.Form>
                            <div className="col-span-6">
                                <div className="max-w-xl text-sm text-gray-600">
                                    Please provide the email address of the person you would like to add to this team.
                                </div>
                            </div>

                            {/* Member Email */}
                            <div className="col-span-6 sm:col-span-4">
                                <Label for="email" value="Email" />
                                <Input
                                    id="email"
                                    type="email"
                                    className="mt-1 block w-full"
                                    value={addTeamMemberForm.data.email}
                                />
                                <InputError message={addTeamMemberForm.errors.email} className="mt-2" />
                            </div>

                            {/* Role */}
                            <div class="col-span-6 lg:col-span-4" v-if="availableRoles.length > 0">
                                <Label for="roles" value="Role" />
                                <InputError message={addTeamMemberForm.errors.role} className="mt-2" />

                                <div className="relative z-0 mt-1 border border-gray-200 rounded-lg cursor-pointer">
                                    {availableRoles.map((role) => (
                                        <button
                                            key={role.key}
                                            type="button"
                                            class="relative px-4 py-3 inline-flex w-full rounded-lg focus:z-10 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200"
                                            onClick={() => addTeamMemberForm.setData('role', role.key)}
                                        >
                                            <div
                                                className={
                                                    addTeamMemberForm.data.role &&
                                                    addTeamMemberForm.data.role !== role.key
                                                        ? 'opacity-50'
                                                        : ''
                                                }
                                            >
                                                <div className="flex items-center">
                                                    <div
                                                        className="text-sm text-gray-600"
                                                        className={
                                                            addTeamMemberForm.data.role === role.key
                                                                ? 'font-semibold'
                                                                : ''
                                                        }
                                                    >
                                                        {role.name}
                                                    </div>

                                                    {addTeamMemberForm.role === role.key && (
                                                        <svg
                                                            className="ml-2 h-5 w-5 text-green-400"
                                                            fill="none"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                        </svg>
                                                    )}
                                                </div>

                                                {/* Role Description */}
                                                <div className="mt-2 text-xs text-gray-600">{role.description}</div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </FormSection.Form>

                        <FormSection.Actions>
                            <ActionMessage on={addTeamMemberForm.recentlySuccessful} className="mr-3">
                                Added.
                            </ActionMessage>

                            <Button
                                className={addTeamMemberForm.processing ? 'opacity-25' : ''}
                                disabled={addTeamMemberForm.processing}
                            >
                                {t('app.create')}
                            </Button>
                        </FormSection.Actions>
                    </FormSection>
                </React.Fragment>
            )}
        </div>
    );
};

export default TeamMemberManage;
