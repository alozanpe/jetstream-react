import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import DialogModal from '@/Jetstream/DialogModal';
import Button from '@/Jetstream/Button';
import Input from '@/Jetstream/Input';
import InputError from '@/Jetstream/InputError';
import SecondaryButton from '@/Jetstream/SecondaryButton';

const ConfirmPassword = ({ title, content, button, confirmed, children }) => {
    const { t } = useTranslation();
    const [password, setPassword] = useState('');
    const [formProcessing, setFormProcessing] = useState(false);
    const [confirmingPassword, setConfirmingPassword] = useState(false);
    const [errors, setErrors] = useState({ password: '' });

    const closeModal = () => {
        setConfirmingPassword(false);
        setPassword('');
    };

    const startConfirmingPassword = () => {
        axios.get(route('password.confirmation')).then((response) => {
            if (response.data.confirmed) {
                confirmed();
            } else {
                setConfirmingPassword(true);
            }
        });
    };

    const confirmPassword = () => {
        setFormProcessing(true);

        axios
            .post(route('password.confirm'), {
                password,
            })
            .then(() => {
                setFormProcessing(false);
                closeModal();
                confirmed();
            })
            .catch((error) => {
                setFormProcessing(false);
                setErrors({ password: error.response.data.errors.password[0] });
            });
    };

    return (
        <span>
            <span onClick={startConfirmingPassword}>{children}</span>

            <DialogModal show={confirmingPassword} onClose={closeModal}>
                <DialogModal.Title>{t(title)}</DialogModal.Title>
                <DialogModal.Content>
                    {t(content)}
                    <div className="mt-4">
                        <Input
                            id="password"
                            type="password"
                            className="mt-1 block w-3/4"
                            placeholder={t('pages.confirmPassword.password')}
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>
                </DialogModal.Content>
                <DialogModal.Footer>
                    <SecondaryButton
                        onClick={() => {
                            setConfirmingLogout(false);
                        }}
                    >
                        {t('app.nevermind')}
                    </SecondaryButton>

                    <Button
                        className={`${formProcessing ? 'opacity-25' : ''} ml-2`}
                        type="button"
                        onClick={() => confirmPassword()}
                        disabled={formProcessing}
                    >
                        {t(button)}
                    </Button>
                </DialogModal.Footer>
            </DialogModal>
        </span>
    );
};

ConfirmPassword.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    button: PropTypes.string,
    confirmed: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node), PropTypes.string]).isRequired,
};

ConfirmPassword.defaultProps = {
    title: 'pages.confirmPassword.title',
    content: 'pages.confirmPassword.content',
    button: 'pages.confirmPassword.button',
    confirmed: () => {},
};

export default ConfirmPassword;
