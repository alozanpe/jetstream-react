import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const ValidationErrors = ({ errors, className }) => {
    const { t } = useTranslation();

    if (Object.keys(errors).length > 0) {
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
    errors: PropTypes.shape({}),
    className: PropTypes.string,
};

ValidationErrors.defaultProps = {
    errors: {},
    className: '',
};

export default ValidationErrors;
