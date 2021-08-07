import React from 'react';
import PropTypes from 'prop-types';

import SectionTitle from '@/Jetstream/SectionTitle';

const Title = () => null;
const Description = () => null;
const Form = () => null;
const Actions = () => null;

const FormSection = ({ children, onSubmit }) => {
    const title = children.find((child) => child.type === Title);
    const description = children.find((child) => child.type === Description);
    const form = children.find((child) => child.type === Form);
    const actions = children.find((child) => child.type === Actions);

    return (
        <div className="md:grid md:grid-cols-3 md:gap-6">
            <SectionTitle>
                <SectionTitle.Title>{title ? title.props.children : null}</SectionTitle.Title>
                <SectionTitle.Description>
                    {description ? description.props.children : null}
                </SectionTitle.Description>
            </SectionTitle>

            <div className="mt-5 md:mt-0 md:col-span-2">
                <form onSubmit={onSubmit}>
                    <div className="shadow overflow-hidden sm:rounded-md">
                        <div className="px-4 py-5 bg-white sm:p-6">
                            <div className="grid grid-cols-6 gap-6">
                                {form ? form.props.children : null}
                            </div>
                        </div>

                        {!!actions && (
                            <div className="flex items-center justify-end px-4 py-3 bg-gray-50 text-right sm:px-6">
                                {actions ? actions.props.children : null}
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

FormSection.Title = Title;
FormSection.Description = Description;
FormSection.Form = Form;
FormSection.Actions = Actions;

FormSection.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default FormSection;
