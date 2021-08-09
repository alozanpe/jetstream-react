import React, { useState } from 'react';
import { usePage, useForm } from '@inertiajs/inertia-react';

import ActionSection from '@/Jetstream/ActionSection';
import ConfirmationModal from '@/Jetstream/ConfirmationModal';
import DangerButton from '@/Jetstream/DangerButton';
import SecondaryButton from '@/Jetstream/SecondaryButton';

const DeleteTeamForm = () => {
    const { team } = usePage().props;
    const [confirmingTeamDeletion, setConfirmingTeamDeletion] = useState(false);

    const form = useForm();

    const confirmTeamDeletion = () => {
        setConfirmingTeamDeletion(true);
    };

    const deleteTeam = () => {
        form.delete(route('teams.destroy', team), {
            errorBag: 'deleteTeam',
        });
    };

    return (
        <ActionSection>
            <ActionSection.Title>Delete Team</ActionSection.Title>

            <ActionSection.Description>Permanently delete this team.</ActionSection.Description>

            <ActionSection.Content>
                <div className="max-w-xl text-sm text-gray-600">
                    Once a team is deleted, all of its resources and data will be permanently deleted. Before deleting
                    this team, please download any data or information regarding this team that you wish to retain.
                </div>

                <div className="mt-5">
                    <DangerButton onClick={confirmTeamDeletion}>Delete Team</DangerButton>
                </div>

                {/* Delete Team Confirmation Modal */}
                <ConfirmationModal show={confirmingTeamDeletion}>
                    <ConfirmationModal.Title>Delete Team</ConfirmationModal.Title>

                    <ConfirmationModal.Content>
                        Are you sure you want to delete this team? Once a team is deleted, all of its resources and data
                        will be permanently deleted.
                    </ConfirmationModal.Content>

                    <ConfirmationModal.Footer>
                        <SecondaryButton onClick={() => setConfirmingTeamDeletion(false)}>Cancel</SecondaryButton>

                        <DangerButton
                            className="ml-2"
                            onClick={deleteTeam}
                            className={`${form.processing ? 'opacity-25' : ''}`}
                            disabled={form.processing}
                        >
                            Delete Team
                        </DangerButton>
                    </ConfirmationModal.Footer>
                </ConfirmationModal>
            </ActionSection.Content>
        </ActionSection>
    );
};

export default DeleteTeamForm;
