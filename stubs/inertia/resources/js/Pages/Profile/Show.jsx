import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePage } from '@inertiajs/inertia-react';

import AppLayout from '@/Layout/AppLayout';
import SectionBorder from '@/Jetstream/SectionBorder';
import DeleteUserForm from '@/Pages/Profile/DeleteUserForm';
import LogoutOtherBrowserSessionsForm from '@/Pages/Profile/LogoutOtherBrowserSessionsForm';
import UpdateProfileInformationForm from '@/Pages/Profile/UpdateProfileInformationForm';
import UpdatePasswordForm from '@/Pages/Profile/UpdatePasswordForm';

const Show = () => {
    const { jetstream, sessions, user, errorBags } = usePage().props;
    const { t } = useTranslation();

    return (
        <AppLayout>
            <AppLayout.Header>
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {t('pages.profile.title')}
                </h2>
            </AppLayout.Header>
            <div>
                <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                    {jetstream.canUpdateProfileInformation && (
                        <React.Fragment>
                            <UpdateProfileInformationForm
                                user={user}
                                jetstream={jetstream}
                                errors={errorBags.updateProfileInformation}
                                className="mt-10 sm:mt-0"
                            />
                            <SectionBorder />
                        </React.Fragment>
                    )}

                    {jetstream.canUpdatePassword && (
                        <React.Fragment>
                            <UpdatePasswordForm
                                className="mt-10 sm:mt-0"
                                errors={errorBags.updatePassword}
                            />
                            <SectionBorder />
                        </React.Fragment>
                    )}

                    {jetstream.canManageTwoFactorAuthentication && null}

                    <LogoutOtherBrowserSessionsForm sessions={sessions} className="mt-10 sm:mt-0" />

                    {jetstream.hasAccountDeletionFeatures && (
                        <React.Fragment>
                            <SectionBorder />
                            <DeleteUserForm className="mt-10 sm:mt-0" />
                        </React.Fragment>
                    )}
                </div>
            </div>
        </AppLayout>
    );
};

export default Show;
