import {createReducer} from '@reduxjs/toolkit';

const initialState = {
    genes: [],
    lifeStages: [],
    anatomyTerms: [],
    isLoading: false,
    error: null
};

export const textMinedEntities = createReducer(initialState, {
    FETCH_ENTITIES_REQUEST: (state, action) => {state.isLoading = true},
    FETCH_ENTITIES_SUCCESS: (state, action) => {
        state.genes = action.payload.entities.genes;
        state.lifeStages = action.payload.entities.lifeStages;
        state.anatomyTerms = action.payload.entities.anatomyTerms;
        state.isLoading = false
    },
    FETCH_ENTITIES_ERROR: (state, action) => {state.error = action.payload.error},
});
