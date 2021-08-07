import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { usePage } from '@inertiajs/inertia-react';

const ValidationErrors = ({ className }) => {
    const { errors } = usePage().props;
    const { t } = useTranslation();

    const hasErrors = useMemo(() => {
        return Object.keys(errors).length > 0;
    }, [errors]);

    if (hasErrors) {
        return (
            <div className={className}>
                <div className="font-medium text-red-600">{t('validationErrors.title')}</div>

                <ul className="mt-3 list-disc list-inside text-sm text-red-600">
                    {Object.keys(errors).map((key) => (
                        <li key={key}>{errors[key]}</li>
                    ))}
                </ul>
            </div>
        );
    }

    return null;
};

ValidationErrors.propTypes = {
    className: PropTypes.string,
};

ValidationErrors.defaultProps = {
    className: '',
};

export default ValidationErrors;
