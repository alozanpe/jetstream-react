import React from 'react';
import PropTypes from 'prop-types';

const Title = () => null;
const Description = () => null;

const SectionTitle = ({ children }) => {
    const title = children.find((child) => child.type === Title);
    const description = children.find((child) => child.type === Description);

    return (
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
    );
};

SectionTitle.Title = Title;
SectionTitle.Description = Description;

SectionTitle.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default SectionTitle;
