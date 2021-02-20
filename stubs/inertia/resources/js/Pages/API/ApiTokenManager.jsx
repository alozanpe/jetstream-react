import React from 'react';

import FormSection from '@/Jetstream/FormSection';
import Label from '@/Jetstream/Label';
import Input from '@/Jetstream/Input';
import InputError from '@/Jetstream/InputError';

const ApiTokenManager = ({ tokens, availablePermissions, defaultPermissions }) => {
    return (
        // Generate API Token
        <FormSection onSubmit={() => {}}>
            <FormSection.Title>Create API Token</FormSection.Title>
            <FormSection.Description>
                API tokens allow third-party services to authenticate with our application on your
                behalf.
            </FormSection.Description>
            <FormSection.Form>
                <div className="col-span-6 sm:col-span-4">
                    <Label htmlFor="name" value="Name" />
                    <Input id="name" type="text" className="mt-1 block w-full" />
                    <InputError message="createApiTokenForm.errors.name" className="mt-2" />
                </div>
            </FormSection.Form>
            <FormSection.Actions></FormSection.Actions>
        </FormSection>
    );
};

export default ApiTokenManager;
