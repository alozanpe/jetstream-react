import React from 'react';
import PropTypes from 'prop-types';

const Title = () => null;
const Description = () => null;
const Content = () => null;

const ActionSection = ({ children }) => {
    const title = children.find((child) => child.type === Title);
    const description = children.find((child) => child.type === Description);
    const content = children.find((child) => child.type === Content);

    return (
        <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium text-gray-900">
                        {title ? title.props.children : null}
                    </h3>

                    <p className="mt-1 text-sm text-gray-600">
                        {description ? description.props.children : null}
                    </p>
                </div>
            </div>

            <div className="mt-5 md:mt-0 md:col-span-2">
                <div className="px-4 py-5 sm:p-6 bg-white shadow sm:rounded-lg">
                    {content ? content.props.children : null}
                </div>
            </div>
        </div>
    );
};

ActionSection.Title = Title;
ActionSection.Description = Description;
ActionSection.Content = Content;

ActionSection.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default ActionSection;
