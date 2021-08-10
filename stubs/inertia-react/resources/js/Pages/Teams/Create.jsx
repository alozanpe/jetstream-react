import React from 'react';

import AppLayout from '@/Layouts/AppLayout';
import CreateTeamForm from '@/Pages/Teams/Partials/CreateTeamForm';

const Create = () => {
    return (
    
        <AppLayout>
            <AppLayout.Header>
                <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                    Create Team
                </h2>
            </AppLayout.Header>
            
            <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <CreateTeamForm/>
            </div>
        </AppLayout>
    
    );
};

export default Create;