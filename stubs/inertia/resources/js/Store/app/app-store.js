import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
    name: 'app',
    initialState: {
        showModal: false,
    },
    reducers: {
        toggleModal(state) {
            state.showModal = !state.showModal;
        },
    },
});

export const { toggleModal } = appSlice.actions;

export default appSlice.reducer;
