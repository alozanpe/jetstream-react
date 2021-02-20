import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';

const Trigger = () => null;
const Content = () => null;

const Dropdown = ({ align, contentClasses, children }) => {
    const [open, setOpen] = useState(false);
    const trigger = children.find((child) => child.type === Trigger);
    const content = children.find((child) => child.type === Content);

    const defaultStyle = {
        transition: `opacity 200ms ease-out`,
        opacity: 1,
    };

    const transitionStyles = {
        entering: { opacity: 0 },
        entered: { opacity: 1 },
        exiting: { opacity: 0.5 },
        exited: { opacity: 0 },
    };

    const closeOnEscape = (e) => {
        if (open && e.keyCode === 27) {
            setOpen(false);
        }
    };

    const getOpenClass = () => {
        if (align === 'left') {
            return 'origin-top-left left-0';
        } else if (align === 'right') {
            return 'origin-top-right right-0';
        } else {
            return 'origin-top';
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', closeOnEscape);

        return () => {
            document.removeEventListener('keydown', closeOnEscape);
        };
    }, []);

    return (
        <div className="relative">
            <div onClick={() => setOpen(!open)}>{trigger ? trigger.props.children : null}</div>

            {open && <div className="fixed inset-0 z-40" onClick={() => setOpen(false)}></div>}

            <Transition
                in={open}
                timeout={{
                    appear: 100,
                    enter: 300,
                    exit: 300,
                }}
            >
                {(state) => (
                    <div
                        style={{
                            ...defaultStyle,
                            ...transitionStyles[state],
                        }}
                    >
                        {open && (
                            <div
                                className={`absolute z-50 mt-2 rounded-md shadow-lg ${getOpenClass()}`}
                            >
                                <div
                                    className={`rounded-md ring-1 ring-black ring-opacity-5 ${contentClasses().join(
                                        ' '
                                    )}`}
                                >
                                    {content ? content.props.children : null}
                                </div>
                            </div>
                        )}
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
    contentClasses: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node)]).isRequired,
};

Dropdown.defaultProps = {
    align: 'right',
    contentClasses: () => ['py-1', 'bg-white'],
};

export default Dropdown;
