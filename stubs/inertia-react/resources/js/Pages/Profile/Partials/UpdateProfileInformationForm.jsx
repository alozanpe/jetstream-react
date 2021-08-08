import React, { useState, createRef } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { useForm, usePage } from '@inertiajs/inertia-react';
import { useTranslation } from 'react-i18next';

import FormSection from '@/Jetstream/FormSection';
import Label from '@/Jetstream/Label';
import Input from '@/Jetstream/Input';
import Button from '@/Jetstream/Button';
import SecondaryButton from '@/Jetstream/SecondaryButton';
import InputError from '@/Jetstream/InputError';
import ActionMessage from '@/Jetstream/ActionMessage';

const UpdateProfileInformationForm = () => {
    const { t } = useTranslation();
    const { user, jetstream } = usePage().props;
    const [photoPreview, setPhotoPreview] = useState(null);
    const photoRef = createRef();

    const form = useForm({
        _method: 'PUT',
        name: user.name,
        email: user.email,
        photo: null,
    });

    const clearPhotoFileInput = () => {
        if (photoRef.current.value) {
            photoRef.current.value = null;
        }
    };

    const updatePhotoPreview = () => {
        const reader = new FileReader();

        reader.onload = (e) => {
            setPhotoPreview(e.target.result);
        };

        reader.readAsDataURL(photoRef.current.files[0]);
    };

    const selectNewPhoto = () => {
        photoRef.current.click();
    };

    const deletePhoto = () => {
        Inertia.delete(route('current-user-photo.destroy'), {
            preserveScroll: true,
            onSuccess: () => {
                setPhotoPreview(null);
                clearPhotoFileInput();
            },
        });
    };

    const updateProfileInformation = (e) => {
        e.preventDefault();

        form.post(route('user-profile-information.update'), {
            errorBag: 'updateProfileInformation',
            preserveScroll: true,
            onSuccess: () => clearPhotoFileInput(),
        });
    };

    return (
        <FormSection onSubmit={updateProfileInformation}>
            <FormSection.Title>{t('pages.profile.updateProfileInformationForm.title')}</FormSection.Title>

            <FormSection.Description>
                {t('pages.profile.updateProfileInformationForm.description')}
            </FormSection.Description>

            <FormSection.Form>
                {/* Profile Photo */}
                {jetstream.managesProfilePhotos && (
                    <div className="col-span-6 sm:col-span-4">
                        {/* Profile Photo File Input */}
                        <input type="file" id="photo" className="hidden" ref={photoRef} onChange={updatePhotoPreview} />
                        <Label htmlFor="photo" value={t('pages.profile.updateProfileInformationForm.photo')} />

                        {/* Current Profile Photo */}
                        {!photoPreview && (
                            <div className="mt-2">
                                <img
                                    src={user.profile_photo_url}
                                    alt={user.name}
                                    className="rounded-full h-20 w-20 object-cover"
                                    alt="profile-img"
                                />
                            </div>
                        )}

                        {/* New Profile Photo Preview */}
                        {photoPreview && (
                            <div className="mt-2">
                                <span
                                    className="block rounded-full w-20 h-20"
                                    style={{
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center center',
                                        backgroundImage: `url('${photoPreview}')`,
                                    }}
                                ></span>
                            </div>
                        )}

                        <SecondaryButton
                            className="mt-2 mr-2"
                            type="button"
                            onClick={() => selectNewPhoto()}
                            text={t('pages.profile.updateProfileInformationForm.selectNew')}
                        />

                        {user.profile_photo_path && (
                            <SecondaryButton
                                type="button"
                                className="mt-2"
                                onClick={() => deletePhoto()}
                                text={t('pages.profile.updateProfileInformationForm.remove')}
                            />
                        )}

                        <InputError className="mt-2" message={form.errors.photo} />
                    </div>
                )}

                {/* Name */}
                <div className="col-span-6 sm:col-span-4">
                    <Label htmlFor="name" value={t('pages.profile.updateProfileInformationForm.name')} />
                    <Input
                        id="name"
                        type="text"
                        className="mt-1 block w-full"
                        autoComplete="name"
                        value={form.data.name}
                        onChange={(e) => form.setData('name', e.target.value)}
                    />
                    <InputError message={form.errors.name} className="mt-2" />
                </div>

                {/* Email */}
                <div className="col-span-6 sm:col-span-4">
                    <Label htmlFor="email" value={t('pages.profile.updateProfileInformationForm.email')} />
                    <Input
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={form.data.email}
                        onChange={(e) => form.setData('email', e.target.value)}
                    />
                    <InputError message={form.errors.email} className="mt-2" />
                </div>
            </FormSection.Form>

            <FormSection.Actions>
                <ActionMessage on={form.recentlySuccessful} className="mr-3">
                    {t('app.saved')}
                </ActionMessage>

                <Button
                    text={t('app.save')}
                    className={`${form.processing ? 'opacity-25' : ''}`}
                    disabled={form.processing}
                />
            </FormSection.Actions>
        </FormSection>
    );
};

export default UpdateProfileInformationForm;
