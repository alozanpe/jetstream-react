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

const TeamMemberManager = () => {
    const { t } = useTranslation();
    const { team, availableRoles, permissions, user } = usePage().props;
    const [currentlyManagingRole, setCurrentlyManagingRole] = useState(false);
    const [managingRoleFor, setManagingRoleFor] = useState(null);
    const [confirmingLeavingTeam, setConfirmingLeavingTeam] = useState(false);
    const [teamMemberBeingRemoved, setTeamMemberBeingRemoved] = useState(false);

    const addTeamMemberForm = useForm({
        email: '',
        role: null,
    });

    const updateRoleForm = useForm({
        role: null,
    });

    const leaveTeamForm = useForm();

    const removeTeamMemberForm = useForm();

    const addTeamMember = (e) => {
        e.preventDefault();

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

    const updateRole = (e) => {
        e.preventDefault();

        updateRoleForm.put(route('team-members.update', [team, managingRoleFor]), {
            preserveScroll: true,
            onSuccess: () => setCurrentlyManagingRole(false),
        });
    };

    const confirmLeavingTeam = () => {
        setConfirmingLeavingTeam(true);
    };

    const leaveTeam = (e) => {
        e.preventDefault();

        leaveTeamForm.delete(route('team-members.destroy', [team, user]));
    };

    const confirmTeamMemberRemoval = (teamMember) => {
        setTeamMemberBeingRemoved(teamMember);
    };

    const removeTeamMember = (e) => {
        e.preventDefault();

        removeTeamMemberForm.delete(route('team-members.destroy', [team, teamMemberBeingRemoved]), {
            errorBag: 'removeTeamMember',
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => setTeamMemberBeingRemoved(false),
        });
    };

    const displayableRole = (role) => {
        return availableRoles.find((r) => r.key === role).name;
    };

    return (
        <div>
            {permissions.canAddTeamMembers && (
                <div>
                    <SectionBorder />
                    {/* Add Team Member */}
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
                                    onChange={(e) => addTeamMemberForm.setData('email', e.target.value)}
                                    value={addTeamMemberForm.data.email}
                                />
                                <InputError message={addTeamMemberForm.errors.email} className="mt-2" />
                            </div>

                            {/* Role */}
                            <div className="col-span-6 lg:col-span-4" v-if="availableRoles.length > 0">
                                <Label for="roles" value="Role" />
                                <InputError message={addTeamMemberForm.errors.role} className="mt-2" />

                                <div className="relative z-0 mt-1 border border-gray-200 rounded-lg cursor-pointer">
                                    {availableRoles.map((role) => (
                                        <button
                                            key={role.key}
                                            type="button"
                                            className="relative px-4 py-3 inline-flex w-full rounded-lg focus:z-10 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200"
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
                                Add
                            </Button>
                        </FormSection.Actions>
                    </FormSection>
                </div>
            )}

            {team.team_invitations.length > 0 && permissions.canAddTeamMembers && (
                <div>
                    <SectionBorder />

                    {/* Team Member Invitations */}
                    <ActionSection className="mt-10 sm:mt-0">
                        <ActionSection.Title>Pending Team Invitations</ActionSection.Title>

                        <ActionSection.Description>
                            These people have been invited to your team and have been sent an invitation email. They may
                            join the team by accepting the email invitation.
                        </ActionSection.Description>

                        <ActionSection.Content>
                            <div className="space-y-6">
                                {team.team_invitations.map((invitation) => (
                                    <div key={invitation.id} className="flex items-center justify-between">
                                        <div className="text-gray-600">{invitation.email}</div>

                                        <div className="flex items-center">
                                            {permissions.canRemoveTeamMembers && (
                                                <button
                                                    className="cursor-pointer ml-6 text-sm text-red-500 focus:outline-none"
                                                    onClick={() => cancelTeamInvitation(invitation)}
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ActionSection.Content>
                    </ActionSection>
                </div>
            )}

            {team.users.length > 0 && (
                <div>
                    <SectionBorder />

                    {/* Manage Team Members */}
                    <ActionSection className="mt-10 sm:mt-0">
                        <ActionSection.Title>Team Members</ActionSection.Title>

                        <ActionSection.Description>
                            All of the people that are part of this team.
                        </ActionSection.Description>

                        {/* Team Member List */}
                        <ActionSection.Content>
                            <div className="space-y-6">
                                {team.users.map((teamUser) => (
                                    <Fragment key={teamUser.id}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <img
                                                    className="w-8 h-8 rounded-full"
                                                    src={teamUser.profile_photo_url}
                                                    alt={teamUser.name}
                                                />
                                                <div className="ml-4">{teamUser.name}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            {/* Manage Team Member Role */}
                                            {permissions.canAddTeamMembers && availableRoles.length ? (
                                                <button
                                                    className="ml-2 text-sm text-gray-400 underline"
                                                    onClick={() => manageRole(teamUser)}
                                                >
                                                    {displayableRole(teamUser.membership.role)}
                                                </button>
                                            ) : (
                                                availableRoles.length && (
                                                    <div className="ml-2 text-sm text-gray-400">
                                                        {displayableRole(teamUser.membership.role)}
                                                    </div>
                                                )
                                            )}

                                            {/* Leave Team */}
                                            {user.id === teamUser.id && (
                                                <button
                                                    className="cursor-pointer ml-6 text-sm text-red-500"
                                                    onClick={confirmLeavingTeam}
                                                >
                                                    Leave
                                                </button>
                                            )}

                                            {/* Remove Team Member */}
                                            {permissions.canRemoveTeamMembers && (
                                                <button
                                                    className="cursor-pointer ml-6 text-sm text-red-500"
                                                    onClick={() => confirmTeamMemberRemoval(teamUser)}
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                    </Fragment>
                                ))}
                            </div>
                        </ActionSection.Content>
                    </ActionSection>
                </div>
            )}

            {/* Role Management Modal */}
            <DialogModal show={currentlyManagingRole} onClose={() => setCurrentlyManagingRole(false)}>
                <DialogModal.Title>Manage Role</DialogModal.Title>

                <DialogModal.Content>
                    {managingRoleFor && (
                        <div>
                            <div className="relative z-0 mt-1 border border-gray-200 rounded-lg cursor-pointer">
                                {availableRoles.map((role, index) => (
                                    <button
                                        key={role.key}
                                        type="button"
                                        className={`relative px-4 py-3 inline-flex w-full rounded-lg focus:z-10 focus:outline-none
                                            ${index > 0 && 'border-t border-gray-200 rounded-t-none'}
                                            ${index !== Object.keys(availableRoles).length - 1 && 'rounded-b-none'}`}
                                        onClick={() => updateRoleForm.setData('role', role.key)}
                                    >
                                        <div
                                            className={
                                                updateRoleForm.role && updateRoleForm.data.role !== role.key
                                                    ? 'opacity-50'
                                                    : ''
                                            }
                                        >
                                            {/* Role Name */}
                                            <div className="flex items-center">
                                                <div
                                                    className={`text-sm text-gray-600
                                                        ${updateRoleForm.data.role === role.key && 'font-semibold'}`}
                                                >
                                                    {role.name}
                                                </div>
                                                {updateRoleForm.data.role === role.key && (
                                                    <svg
                                                        className="ml-2 h-5 w-5 text-green-400"
                                                        fill="none"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                    )}
                </DialogModal.Content>

                <DialogModal.Footer>
                    <SecondaryButton onClick={() => setCurrentlyManagingRole(false)}>Cancel</SecondaryButton>

                    <Button
                        type="button"
                        onClick={updateRole}
                        className={`ml-2 ${updateRoleForm.processing ? 'opacity-25' : ''}`}
                        disabled={updateRoleForm.processing}
                    >
                        Save
                    </Button>
                </DialogModal.Footer>
            </DialogModal>

            {/* Leave Team Confirmation Modal */}
            <ConfirmationModal show={confirmingLeavingTeam} onClose={() => setConfirmingLeavingTeam(false)}>
                <ConfirmationModal.Title>Leave Team</ConfirmationModal.Title>

                <ConfirmationModal.Content>
                    Are you sure you would like to leave this team? This action cannot be undone.
                </ConfirmationModal.Content>

                <ConfirmationModal.Footer>
                    <SecondaryButton onClick={() => setConfirmingLeavingTeam(false)}>Cancel</SecondaryButton>

                    <DangerButton
                        onClick={leaveTeam}
                        className={`ml-2 ${leaveTeamForm.processing ? 'opacity-25' : ''}`}
                        disabled={leaveTeamForm.processing}
                    >
                        Leave
                    </DangerButton>
                </ConfirmationModal.Footer>
            </ConfirmationModal>

            {/* Remove Team Member Confirmation Modal */}
            <ConfirmationModal show={teamMemberBeingRemoved} onClose={() => setTeamMemberBeingRemoved(false)}>
                <ConfirmationModal.Title>Remove Team Member</ConfirmationModal.Title>

                <ConfirmationModal.Content>
                    Are you sure you would like to remove this person from the team?
                </ConfirmationModal.Content>

                <ConfirmationModal.Footer>
                    <SecondaryButton onClick={() => setTeamMemberBeingRemoved(false)}>Cancel</SecondaryButton>

                    <DangerButton
                        onClick={removeTeamMember}
                        className={`ml-2 ${removeTeamMemberForm.processing ? 'opacity-25' : ''}`}
                        disabled={removeTeamMemberForm.processing}
                    >
                        Leave
                    </DangerButton>
                </ConfirmationModal.Footer>
            </ConfirmationModal>
        </div>
    );
};

export default TeamMemberManager;
