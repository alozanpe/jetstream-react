import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { usePage, useForm } from '@inertiajs/inertia-react';

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

const ApiTokenManager = () => {
    const { jetstream, tokens, availablePermissions, defaultPermissions } = usePage().props;
    const { t } = useTranslation();
    const [displayingToken, setDisplayingToken] = useState(false);
    const [managingPermissionsFor, setManagingPermissionsFor] = useState(null);
    const [apiTokenBeingDeleted, setApiTokenBeingDeleted] = useState(null);
    const closeButtonRef = useRef();
    const cancelUpdateApiRef = useRef();
    const cancelDeleteApiButtonRef = useRef();

    const createApiTokenForm = useForm({
        name: '',
        permissions: defaultPermissions,
    });

    const updateApiTokenForm = useForm({
        permissions: [],
    });

    const deleteApiTokenForm = useForm();

    const createApiToken = (e) => {
        e.preventDefault();

        createApiTokenForm.post(route('api-tokens.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setDisplayingToken(true);
                createApiTokenForm.reset();
            },
        });
    };

    const updateApiToken = () => {
        updateApiTokenForm.put(route('api-tokens.update', managingPermissionsFor), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => setManagingPermissionsFor(null),
        });
    };

    const deleteApiToken = () => {
        deleteApiTokenForm.delete(route('api-tokens.destroy', apiTokenBeingDeleted), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => setApiTokenBeingDeleted(null),
        });
    };

    const manageApiTokenPermissions = (token) => {
        updateApiTokenForm.setData('permissions', token.abilities);
        setManagingPermissionsFor(token);
    };

    const confirmApiTokenDeletion = (token) => {
        setApiTokenBeingDeleted(token);
    };

    const onUpdatePermissions = (e, form = 'create') => {
        const apiTokenForm = form === 'create' ? createApiTokenForm : updateApiTokenForm;
        const prevPermissions = apiTokenForm.data.permissions;

        if (e.target.checked) {
            apiTokenForm.setData('permissions', prevPermissions.concat(e.target.id));
        } else {
            const index = prevPermissions.indexOf(e.target.id);

            if (index > -1) {
                prevPermissions.splice(index, 1);
            }

            apiTokenForm.setData('permissions', prevPermissions);
        }
    };

    return (
        <React.Fragment>
            {/* Generate API Token */}
            <FormSection onSubmit={createApiToken}>
                <FormSection.Title>{t('pages.api.apiTokenManager.title')}</FormSection.Title>

                <FormSection.Description>{t('pages.api.apiTokenManager.description')}</FormSection.Description>

                <FormSection.Form>
                    {/* Token Name */}
                    <div className="col-span-6 sm:col-span-4">
                        <Label htmlFor="name" value="Name" />
                        <Input
                            id="name"
                            type="text"
                            className="mt-1 block w-full"
                            value={createApiTokenForm.data.name}
                            autoFocus
                            onChange={(e) => createApiTokenForm.setData('name', e.target.value)}
                        />
                        <InputError message={createApiTokenForm.errors.name} className="mt-2" />
                    </div>
                    {/* Token Permissions */}
                    <div className="col-span-6" v-if="availablePermissions.length > 0">
                        <Label htmlFor="permissions" value="Permissions" />

                        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {availablePermissions.map((permission) => (
                                <label className="flex items-center" key={permission}>
                                    <Checkbox
                                        id={permission}
                                        checked={createApiTokenForm.data.permissions.includes(permission)}
                                        onChange={onUpdatePermissions}
                                    />
                                    <span className="ml-2 text-sm text-gray-600">{permission}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </FormSection.Form>

                <FormSection.Actions>
                    <ActionMessage on={createApiTokenForm.recentlySuccessful} className="mr-3">
                        {t('app.created')}
                    </ActionMessage>

                    <Button
                        className={createApiTokenForm.processing ? 'opacity-25 ml-2' : 'ml-2'}
                        disabled={createApiTokenForm.processing}
                    >
                        {t('app.create')}
                    </Button>
                </FormSection.Actions>
            </FormSection>

            {tokens.length > 0 && (
                <div>
                    <SectionBorder />

                    <ActionSection>
                        <ActionSection.Title>{t('pages.api.apiTokenManager.tokens.title')}</ActionSection.Title>

                        <ActionSection.Description>
                            {t('pages.api.apiTokenManager.tokens.description')}
                        </ActionSection.Description>

                        <ActionSection.Content>
                            <div className="space-y-6">
                                {tokens.map((token) => (
                                    <div className="flex items-center justify-between" key={token.id}>
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
                                                    {t('pages.api.apiTokenManager.tokens.permissions')}
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
            <DialogModal show={displayingToken} onClose={() => setDisplayingToken(false)} ref={closeButtonRef}>
                <DialogModal.Title>{t('pages.api.apiTokenManager.displayingToken.title')}</DialogModal.Title>

                <DialogModal.Content>
                    <div>{t('pages.api.apiTokenManager.displayingToken.content')}</div>

                    {jetstream.flash.token && (
                        <div className="mt-4 bg-gray-100 px-4 py-2 rounded font-mono text-sm text-gray-500">
                            {jetstream.flash.token}
                        </div>
                    )}
                </DialogModal.Content>

                <DialogModal.Footer>
                    <SecondaryButton ref={closeButtonRef} onClick={() => setDisplayingToken(false)}>
                        {t('app.close')}
                    </SecondaryButton>
                </DialogModal.Footer>
            </DialogModal>

            {/* API Token Permissions Modal */}
            <DialogModal
                show={managingPermissionsFor !== null}
                onClose={() => setManagingPermissionsFor(null)}
                ref={cancelUpdateApiRef}
            >
                <DialogModal.Title>{t('pages.api.apiTokenManager.managingPermissionsModal.title')}</DialogModal.Title>

                <DialogModal.Content>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {availablePermissions.map((permission) => (
                            <div key={permission}>
                                <label className="flex items-center">
                                    <Checkbox
                                        id={permission}
                                        checked={updateApiTokenForm.data.permissions.includes(permission)}
                                        onChange={(e) => onUpdatePermissions(e, 'update')}
                                    />
                                    <span className="ml-2 text-sm text-gray-600">{permission}</span>
                                </label>
                            </div>
                        ))}
                    </div>
                </DialogModal.Content>

                <DialogModal.Footer>
                    <SecondaryButton
                        className="mr-4"
                        ref={cancelUpdateApiRef}
                        onClick={() => setManagingPermissionsFor(null)}
                    >
                        {t('app.cancel')}
                    </SecondaryButton>
                    <Button
                        onClick={updateApiToken}
                        className={updateApiTokenForm.processing ? 'opacity-25' : ''}
                        disabled={updateApiTokenForm.processing}
                    >
                        {t('app.save')}
                    </Button>
                </DialogModal.Footer>
            </DialogModal>

            {/* Delete Token Confirmation Modal */}
            <ConfirmationModal
                show={apiTokenBeingDeleted !== null}
                onClose={() => setApiTokenBeingDeleted(null)}
                ref={cancelDeleteApiButtonRef}
            >
                <ConfirmationModal.Title>
                    {t('pages.api.apiTokenManager.beingDeletedModal.title')}
                </ConfirmationModal.Title>

                <ConfirmationModal.Content>
                    {t('pages.api.apiTokenManager.beingDeletedModal.content')}
                </ConfirmationModal.Content>

                <ConfirmationModal.Footer>
                    <SecondaryButton ref={cancelDeleteApiButtonRef} onClick={() => setApiTokenBeingDeleted(null)}>
                        {t('app.cancel')}
                    </SecondaryButton>
                    <Button
                        onClick={deleteApiToken}
                        className={deleteApiTokenForm.processing ? 'opacity-25 ml-2' : 'ml-2'}
                        disabled={deleteApiTokenForm.processing}
                    >
                        {t('app.delete')}
                    </Button>
                </ConfirmationModal.Footer>
            </ConfirmationModal>
        </React.Fragment>
    );
};

export default ApiTokenManager;
