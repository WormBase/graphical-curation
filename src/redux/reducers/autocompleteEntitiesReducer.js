import {createReducer} from '@reduxjs/toolkit';

const initialState = {
    autocompleteEntities: [],
    loading: false,
    error: null
};

export const autocompleteEntities = createReducer(initialState, {
    FETCH_AUTOCOMPLETE_ENTITIES_REQUEST: (state, action) => {state.loading = true},
    FETCH_AUTOCOMPLETE_ENTITIES_ERROR: (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
    },
    FETCH_AUTOCOMPLETE_ENTITIES_SUCCESS: (state, action) => {
        if (action.payload.entities !== undefined) {
            state.autocompleteEntities = action.payload.entities;
        }
        state.loading = false;
        state.error = null;
    },
    RESET_AUTOCOMPLETE_ENTITIES:  (state, action) => {
        state.autocompleteEntities = [];
    }
});
