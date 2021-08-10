import { useCallback } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

import { changeLocale } from './app-store';

const useApp = () => {
    const dispatch = useDispatch();

    const app = useSelector((state) => state.app, shallowEqual);

    const doChangeLocale = useCallback(
        (locale) => {
            dispatch(changeLocale(locale));
        },
        [dispatch]
    );

    return {
        doChangeLocale,
        app,
    };
};

export default useApp;
