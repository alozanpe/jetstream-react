import React from 'react';
import { usePage } from '@inertiajs/inertia-react';

import AppLayout from "@/Layouts/AppLayout";
import SectionBorder from "@/Jetstream/SectionBorder";
import DeleteTeamForm from "@/Pages/Teams/Partials/DeleteTeamForm";
import UpdateTeamNameForm from "@/Pages/Teams/Partials/UpdateTeamNameForm";
import TeamMemberManager from "@/Pages/Teams/Partials/TeamMemberManager";

const Show = () => {
    const { team, availableRoles, permissions } = usePage().props;

    return (
        <AppLayout>
            <AppLayout.Header>
                <h2 class="font-semibold text-xl text-gray-800 leading-tight">Team Settings</h2>
            </AppLayout.Header>

            <div>
                <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                    <UpdateTeamNameForm team={team} permissions={permissions}/>

                    <TeamMemberManager
                        team={team}
                        availableRoles={availableRoles}
                        userPermissions={permissions}/>

                    {
                        (permissions.canDeleteTeam && !team.personal_team) &&
                        <>
                            <SectionBorder/>
                            <DeleteTeamForm team={team}/>
                        </>
                    }
                </div>
            </div>
        </AppLayout>
    );
};

export default Show;