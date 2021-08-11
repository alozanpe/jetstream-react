import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import Modal from '@/Jetstream/Modal';

const Title = () => null;
const Content = () => null;
const Footer = () => null;

const DialogModal = forwardRef(({ children, show, maxWidth, onClose, closeable }, focusRef) => {
    const title = children.find((child) => child.type === Title);
    const content = children.find((child) => child.type === Content);
    const footer = children.find((child) => child.type === Footer);

    return (
        <Modal show={show} width={maxWidth} closeable={closeable} onClose={onClose} ref={focusRef}>
            <div className="px-6 py-4">
                <div className="text-lg">{title ? title.props.children : null}</div>

                <div className="mt-4">{content ? content.props.children : null}</div>
            </div>

            <div className="px-6 py-4 bg-gray-100 text-right">{footer ? footer.props.children : null}</div>
        </Modal>
    );
});

DialogModal.Title = Title;
DialogModal.Content = Content;
DialogModal.Footer = Footer;

DialogModal.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    maxWidth: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    closeable: PropTypes.bool,
};

DialogModal.defaultProps = {
    maxWidth: '2xl',
    show: false,
    closeable: true,
};

export default DialogModal;
