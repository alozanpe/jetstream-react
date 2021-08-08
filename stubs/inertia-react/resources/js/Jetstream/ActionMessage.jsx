import React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';

const ActionMessage = ({ on, children, className }) => {
    const defaultStyle = {
        transition: `opacity 500ms ease-in`,
        opacity: 1,
    };

    const transitionStyles = {
        entering: { opacity: 0 },
        entered: { opacity: 1 },
        exiting: { opacity: 0.5 },
        exited: { opacity: 0 },
    };

    return (
        <div>
            <Transition
                in={on}
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
                        <div className={`text-sm text-gray-600 ${className}`}>{children}</div>
                    </div>
                )}
            </Transition>
        </div>
    );
};

ActionMessage.propTypes = {
    on: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node), PropTypes.string]).isRequired,
    className: PropTypes.string,
};

ActionMessage.defaultProps = {
    on: false,
    className: '',
};

export default ActionMessage;
