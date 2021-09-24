import { createSlice } from "@reduxjs/toolkit";

const intialUiState = { isShown: false, notifications: null };

const uiSlice = createSlice({
    name: "ui",
    initialState: intialUiState,
    reducers: {
        toggleShow(state) {
            state.isShown = !state.isShown;
        },
        showNotifications(state, action) {
            state.notifications = {
                title: action.payload.title,
                status: action.payload.status,
                message: action.payload.message,
            };
        },
    },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
