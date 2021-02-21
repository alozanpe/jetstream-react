import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import useApp from '@/Store/app/app-actions';

const Modal = ({ children, maxWidth }) => {
    const { app } = useApp();
    const modalContainer = document.querySelector('#modalContainer');

    const getMaxWidthClass = () => {
        return {
            sm: 'sm:max-w-sm',
            md: 'sm:max-w-md',
            lg: 'sm:max-w-lg',
            xl: 'sm:max-w-xl',
            '2xl': 'sm:max-w-2xl',
        }[maxWidth];
    };

    if (app.showModal) {
        return ReactDOM.createPortal(
            <div className="fixed inset-0 overflow-y-auto px-4 py-6 sm:px-0">
                <div className="fixed inset-0 transform transition-all">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <div
                    className={`mb-6 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto ${getMaxWidthClass()}`}
                >
                    {children}
                </div>
            </div>,
            modalContainer
        );
    }

    return null;
};

Modal.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
    maxWidth: PropTypes.string,
};

Modal.defaultProps = {
    maxWidth: '2xl',
};

export default Modal;
