import React, { useState, createRef } from 'react';
import PropTypes from 'prop-types';
import { Inertia } from '@inertiajs/inertia';
import { useTranslation } from 'react-i18next';

import FormSection from '@/Jetstream/FormSection';
import Label from '@/Jetstream/Label';
import Input from '@/Jetstream/Input';
import Button from '@/Jetstream/Button';
import SecondaryButton from '@/Jetstream/SecondaryButton';
import InputError from '@/Jetstream/InputError';

const UpdateProfileInformationForm = ({ user, jetstream, errors }) => {
    const { t } = useTranslation();
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [photoPreview, setPhotoPreview] = useState(null);
    const photoRef = createRef();

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
            onSuccess: () => setPhotoPreview(null),
        });
    };

    const updateProfileInformation = (e) => {
        e.preventDefault();
        const data = new FormData();

        data.append('_method', 'PUT');
        data.append('name', name);
        data.append('email', email);
        data.append('photo', photoRef.current.files[0] || null);

        Inertia.post(route('user-profile-information.update'), data, {
            errorBag: 'updateProfileInformation',
            preserveScroll: true,
        });
    };

    return (
        <FormSection onSubmit={updateProfileInformation}>
            <FormSection.Title>
                {t('pages.profile.updateProfileInformationForm.title')}
            </FormSection.Title>
            <FormSection.Description>
                {t('pages.profile.updateProfileInformationForm.description')}
            </FormSection.Description>
            <FormSection.Form>
                {/* Profile Photo */}
                {jetstream.managesProfilePhotos && (
                    <div className="col-span-6 sm:col-span-4">
                        {/* Profile Photo File Input */}
                        <input
                            type="file"
                            id="photo"
                            className="hidden"
                            ref={photoRef}
                            onChange={updatePhotoPreview}
                        />
                        <Label
                            htmlFor="photo"
                            value={t('pages.profile.updateProfileInformationForm.photo')}
                        />
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

                        <InputError className="mt-2" message={errors.photo} />
                    </div>
                )}

                {/* Name */}
                <div className="col-span-6 sm:col-span-4">
                    <Label
                        htmlFor="name"
                        value={t('pages.profile.updateProfileInformationForm.name')}
                    />
                    <Input
                        id="name"
                        type="text"
                        className="mt-1 block w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                {/* Email */}
                <div className="col-span-6 sm:col-span-4">
                    <Label
                        htmlFor="email"
                        value={t('pages.profile.updateProfileInformationForm.email')}
                    />
                    <Input
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>
            </FormSection.Form>

            <FormSection.Actions>
                <Button text={t('app.save')} />
            </FormSection.Actions>
        </FormSection>
    );
};

UpdateProfileInformationForm.propTypes = {
    user: PropTypes.shape({}).isRequired,
    jetstream: PropTypes.shape({}).isRequired,
    errors: PropTypes.shape({}),
};

UpdateProfileInformationForm.defaultProps = {
    errors: {},
};

export default UpdateProfileInformationForm;
