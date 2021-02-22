import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import FormSection from '@/Jetstream/FormSection';
import Label from '@/Jetstream/Label';
import Input from '@/Jetstream/Input';
import InputError from '@/Jetstream/InputError';
import Button from '@/Jetstream/Button';
import ActionMessage from '@/Jetstream/ActionMessage';
import DialogModal from '@/Jetstream/DialogModal';
import ConfirmationModal from '@/Jetstream/ConfirmationModal';
import Checkbox from '@/Jetstream/Checkbox';
import SecondaryButton from '@/Jetstream/SecondaryButton';
import SectionBorder from '@/Jetstream/SectionBorder';

const ApiTokenManager = ({ tokens, availablePermissions, defaultPermissions }) => {
    const { t } = useTranslation();
    const [createApiTokenForm, setCreateApiTokenForm] = useState({
        name: '',
        permissions: defaultPermissions,
        recentlySuccessful: false,
        processing: false,
        errors: null,
    });
    const [updateApiTokenForm, setUpdateApiTokenForm] = useState({ permission: [] });
    const [deleteApiTokenForm, setDeleteApiTokenForm] = useState({});
    const [displayingToken, setDisplayingToken] = useState(false);
    const [managingPermissionsForm, setManagingPermissionsForm] = useState(null);
    const [apiTokenBeingDeleted, setApiTokenBeingDeleted] = useState(null);

    const createApiToken = () => {
        setCreateApiTokenForm({
            ...createApiTokenForm,
            processing: true,
        });

        Inertia.post(
            route('api-tokens.store'),
            {
                name: createApiToken.name,
                permission: createApiToken.permission,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setDisplayingToken(true);
                    setCreateApiTokenForm({
                        name: '',
                        permissions: defaultPermissions,
                        recentlySuccessful: true,
                    });
                },
                onError: (errors) => {
                    setCreateApiTokenForm({
                        ...createApiTokenForm,
                        errors,
                    });
                },
                onFinish: () => {
                    setCreateApiTokenForm({
                        ...createApiTokenForm,
                        processing: false,
                    });
                },
            }
        );
    };

    const manageApiTokenPermissions = (token) => {
        setUpdateApiTokenForm({ permission: token.abilities });
        setManagingPermissionsForm(token);
    };

    const updateApiToken = () => {
        Inertia.put(
            route('api-tokens.update', managingPermissionsFor),
            { ...updateApiTokenForm },
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => setManagingPermissionsForm(null),
            }
        );
    };

    const confirmApiTokenDeletion = (token) => {
        setApiTokenBeingDeleted(token);
    };

    const deleteApiToken = () => {
        Inertia.delete(route('api-tokens.destroy', apiTokenBeingDeleted), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => setApiTokenBeingDeleted(null),
        });
    };

    return (
        // Generate API Token
        <FormSection onSubmit={createApiToken}>
            <FormSection.Title>{t('pages.api.apiTokenManager.title')}</FormSection.Title>
            <FormSection.Description>
                {t('pages.api.apiTokenManager.description')}
            </FormSection.Description>
            <FormSection.Form>
                {/* Token Name */}
                <div className="col-span-6 sm:col-span-4">
                    <Label htmlFor="name" value="Name" />
                    <Input id="name" type="text" className="mt-1 block w-full" />
                    <InputError message={createApiTokenForm.errors?.name} className="mt-2" />
                </div>
                {/* Token Permissions */}
                <div className="col-span-6" v-if="availablePermissions.length > 0">
                    <Label htmlFor="permissions" value="Permissions" />

                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {availablePermissions.map((permission) => (
                            <label className="flex items-center" key={permission}>
                                <Checkbox
                                    id={permission}
                                    name={permission}
                                    value={createApiTokenForm.permissions.includes(permission)}
                                />
                                <span className="ml-2 text-sm text-gray-600">{permission}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </FormSection.Form>
            <FormSection.Actions>
                <ActionMessage on={createApiTokenForm.recentlySuccessful} className="mr-3">
                    Created.
                </ActionMessage>

                <Button
                    className={`${createApiTokenForm.processing ? 'opacity-25' : ''} ml-2`}
                    disabled={createApiTokenForm.processing}
                    text="app.create"
                />
            </FormSection.Actions>
        </FormSection>
    );
};

ApiTokenManager.propTypes = {
    tokens: PropTypes.arrayOf(PropTypes.string),
    availablePermissions: PropTypes.arrayOf(PropTypes.string),
    defaultPermissions: PropTypes.arrayOf(PropTypes.string),
};

ApiTokenManager.defaultProps = {
    tokens: [],
    availablePermissions: [],
    defaultPermissions: [],
};

export default ApiTokenManager;
