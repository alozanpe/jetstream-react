import { useCallback } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import { toggleModal } from './app-store';

const useApp = () => {
    const dispatch = useDispatch();

    const app = useSelector((state) => state.app, shallowEqual);

    const doToggleModal = useCallback(() => {
        document.body.style.overflow = app.showModal ? null : 'hidden';
        dispatch(toggleModal());
    }, [dispatch, app.showModal]);

    return {
        doToggleModal,
        app,
    };
};

export default useApp;
