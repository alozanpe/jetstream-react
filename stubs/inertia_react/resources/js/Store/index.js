import { combineReducers } from 'redux';

import appReducer from '@/Store/app/app-store';

export default combineReducers({
    app: appReducer,
});
