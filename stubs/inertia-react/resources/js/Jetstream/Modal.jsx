import React, { forwardRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Transition } from '@headlessui/react';

const Modal = forwardRef(({ show, onClose, children, closeable, width }, focusRef) => {
    const handleClose = () => {
        if (!closeable) return null;
        onClose();
    };

    const maxWidthClass = useMemo(() => {
        return {
            sm: 'sm:max-w-sm',
            md: 'sm:max-w-md',
            lg: 'sm:max-w-lg',
            xl: 'sm:max-w-xl',
            '2xl': 'sm:max-w-2xl',
        }[width];
    }, [width]);

    return (
        <Transition show={show} as={React.Fragment}>
            <Dialog
                as="div"
                static
                className="fixed z-20 inset-0 overflow-y-auto"
                open={show}
                initialFocus={focusRef}
                onClose={handleClose}
            >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-20 transition-opacity backdrop-filter backdrop-blur-md" />
                    </Transition.Child>

                    <div className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </div>

                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-100"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        {show && (
                            <div
                                className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle ${maxWidthClass}`}
                            >
                                {children}
                            </div>
                        )}
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
});

Modal.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node), PropTypes.string]).isRequired,
    closeable: PropTypes.bool,
    width: PropTypes.string,
};

Modal.defaultProps = {
    show: false,
    onClose: () => {},
    closeable: false,
    width: '2xl',
};

export default Modal;
