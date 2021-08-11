import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Transition } from '@headlessui/react';

const Trigger = () => null;
const Content = () => null;

const Dropdown = ({ align, width, contentClasses, children }) => {
    const [open, setOpen] = useState(false);
    const trigger = children.find((child) => child.type === Trigger);
    const content = children.find((child) => child.type === Content);

    const widthClass = useMemo(() => {
        return {
            48: 'w-48',
        }[`${width}`];
    }, [width]);

    const alignmentClasses = useMemo(() => {
        if (align === 'left') {
            return 'origin-top-left left-0';
        } else if (align === 'right') {
            return 'origin-top-right right-0';
        } else {
            return 'origin-top';
        }
    }, [align]);

    return (
        <div className="relative">
            <div onClick={() => setOpen(!open)}>{trigger ? trigger.props.children : null}</div>

            {/* Full Screen Dropdown Overlay */}
            {open && <div className="fixed inset-0 z-40" onClick={() => setOpen(false)}></div>}

            <Transition
                show={open}
                as="div"
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                {open && (
                    <div
                        className={`absolute z-50 mt-2 rounded-md shadow-lg ${widthClass} ${alignmentClasses}`}
                        onClick={() => setOpen(false)}
                    >
                        <div className={`rounded-md ring-1 ring-black ring-opacity-5 ${contentClasses}`}>
                            {content ? content.props.children : null}
                        </div>
                    </div>
                )}
            </Transition>
        </div>
    );
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;

Dropdown.propTypes = {
    align: PropTypes.string,
    width: PropTypes.string,
    contentClasses: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node)]).isRequired,
};

Dropdown.defaultProps = {
    align: 'right',
    width: '48',
    contentClasses: 'py-1 bg-white',
};

export default Dropdown;
