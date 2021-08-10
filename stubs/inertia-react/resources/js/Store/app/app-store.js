import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
    name: 'app',
    initialState: {
        locale: window.localStorage.getItem('i18nextLng') || 'es_ES',
    },
    reducers: {
        changeLocale(state, action) {
            state.locale = action.payload;
        },
    },
});

export const { changeLocale } = appSlice.actions;

export default appSlice.reducer;
