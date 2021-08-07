import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { usePage } from '@inertiajs/inertia-react';

import FormSection from '@/Jetstream/FormSection';
import ActionSection from '@/Jetstream/ActionSection';
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
    const { jetstream } = usePage().props;
    const { t } = useTranslation();
    const [createApiTokenForm, setCreateApiTokenForm] = useState({
        name: '',
        permissions: defaultPermissions,
        recentlySuccessful: false,
        processing: false,
        errors: null,
    });
    const [updateApiTokenForm, setUpdateApiTokenForm] = useState({
        permission: [],
        processing: false,
    });
    const [deleteApiTokenForm, setDeleteApiTokenForm] = useState({
        processing: false,
    });
    const [displayingToken, setDisplayingToken] = useState(false);
    const [managingPermissionsFor, setManagingPermissionsFor] = useState(null);
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
        setManagingPermissionsFor(token);
    };

    const updateApiToken = () => {
        Inertia.put(
            route('api-tokens.update', managingPermissionsFor),
            { ...updateApiTokenForm },
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => setManagingPermissionsFor(null),
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
        <React.Fragment>
            {/* Generate API Token */}
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
            {tokens.length > 0 && (
                <div>
                    <SectionBorder />
                    <ActionSection>
                        <ActionSection.Title>
                            {t('pages.api.apiTokenManager.tokens.title')}
                        </ActionSection.Title>
                        <ActionSection.Description>
                            {t('pages.api.apiTokenManager.tokens.description')}
                        </ActionSection.Description>
                        <ActionSection.Content>
                            <div className="space-y-6">
                                {tokens.map((token) => (
                                    <div
                                        className="flex items-center justify-between"
                                        key={token.id}
                                    >
                                        <div>{token.name}</div>

                                        <div className="flex items-center">
                                            {token.last_used_ago && (
                                                <div className="text-sm text-gray-400">
                                                    {t('pages.api.apiTokenManager.tokens.lastUsed')}{' '}
                                                    {token.last_used_ago}
                                                </div>
                                            )}

                                            {availablePermissions.length > 0 && (
                                                <button
                                                    className="cursor-pointer ml-6 text-sm text-gray-400 underline"
                                                    onClick={() => {
                                                        manageApiTokenPermissions(token);
                                                    }}
                                                >
                                                    {t(
                                                        'pages.api.apiTokenManager.tokens.permissions'
                                                    )}
                                                </button>
                                            )}

                                            <button
                                                className="cursor-pointer ml-6 text-sm text-red-500"
                                                onClick={() => {
                                                    confirmApiTokenDeletion(token);
                                                }}
                                            >
                                                {t('pages.api.apiTokenManager.tokens.delete')}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ActionSection.Content>
                    </ActionSection>
                </div>
            )}

            {/* Token Value Modal */}
            {displayingToken && (
                <DialogModal show close={() => setDisplayingToken(false)}>
                    <DialogModal.Title>
                        {t('pages.api.apiTokenManager.displayingToken.title')}
                    </DialogModal.Title>
                    <DialogModal.Content>
                        <div>{t('pages.api.apiTokenManager.displayingToken.content')}</div>

                        {jetstream.flash.token && (
                            <div className="mt-4 bg-gray-100 px-4 py-2 rounded font-mono text-sm text-gray-500">
                                {jetstream.flash.token}
                            </div>
                        )}
                    </DialogModal.Content>
                    <DialogModal.Footer>
                        <SecondaryButton
                            text="app.close"
                            onClick={() => setDisplayingToken(false)}
                        />
                    </DialogModal.Footer>
                </DialogModal>
            )}

            {/* API Token Permissions Modal */}
            {managingPermissionsFor && (
                <DialogModal show close={() => setManagingPermissionsFor(null)}>
                    <DialogModal.Title>
                        {t('pages.api.apiTokenManager.managingPermissionsModal.title')}
                    </DialogModal.Title>
                    <DialogModal.Content>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {availablePermissions.map((permission) => (
                                <div key={permission}>
                                    <label className="flex items-center">
                                        <Checkbox
                                            value={updateApiTokenForm.permissions.contains(
                                                permission
                                            )}
                                        />
                                        <span className="ml-2 text-sm text-gray-600">
                                            {permission}
                                        </span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </DialogModal.Content>
                    <DialogModal.Footer>
                        <SecondaryButton
                            text="app.cancel"
                            onClick={() => setManagingPermissionsFor(null)}
                        />
                        <Button
                            text="app.save"
                            className={`${updateApiTokenForm.processing ? 'opacity-25' : ''} ml-2`}
                            disabled={updateApiTokenForm.processing}
                            onClick={() => updateApiToken()}
                        />
                    </DialogModal.Footer>
                </DialogModal>
            )}

            {/* Delete Token Confirmation Modal */}
            {apiTokenBeingDeleted && (
                <ConfirmationModal show close={() => setApiTokenBeingDeleted(null)}>
                    <ConfirmationModal.Title>
                        {t('pages.api.apiTokenManager.beingDeletedModal.title')}
                    </ConfirmationModal.Title>
                    <ConfirmationModal.Content>
                        {t('pages.api.apiTokenManager.beingDeletedModal.content')}
                    </ConfirmationModal.Content>
                    <ConfirmationModal.Footer>
                        <SecondaryButton
                            text="app.cancel"
                            onClick={() => setApiTokenBeingDeleted(null)}
                        />
                        <Button
                            text="app.delete"
                            className={`${deleteApiTokenForm.processing ? 'opacity-25' : ''} ml-2`}
                            disabled={deleteApiTokenForm.processing}
                            onClick={() => deleteApiToken()}
                        />
                    </ConfirmationModal.Footer>
                </ConfirmationModal>
            )}
        </React.Fragment>
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
