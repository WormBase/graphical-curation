import {createReducer} from '@reduxjs/toolkit';

const initialState = {
    genes: [],
    genesLoading: false,
    genesError: null,
    lifeStages: [],
    lifeStagesLoading: false,
    lifeStagesError: null,
    anatomyTerms: [],
    anatomyTermsLoading: false,
    anatomyTermsError: null
};

export const textMinedEntities = createReducer(initialState, {
    FETCH_GENES_REQUEST: (state, action) => {state.genesLoading = true},
    FETCH_GENES_SUCCESS: (state, action) => {
        state.genes = action.payload.genes.sort();
        state.genesLoading = false;
    },
    FETCH_GENES_ERROR: (state, action) => {state.genesError = action.payload.error},

    FETCH_ANATOMY_TERMS_REQUEST: (state, action) => {state.anatomyTermsLoading = true},
    FETCH_ANATOMY_TERMS_SUCCESS: (state, action) => {
        state.anatomyTerms = action.payload.anatomyTerms.sort();
        state.anatomyTermsLoading = false
    },
    FETCH_ANATOMY_TERMS_ERROR: (state, action) => {state.lifeStagesError = action.payload.error},

    FETCH_LIFE_STAGES_REQUEST: (state, action) => {state.lifeStagesLoading = true},
    FETCH_LIFE_STAGES_SUCCESS: (state, action) => {
        state.lifeStages = action.payload.lifeStages.sort();
        state.lifeStagesLoading = false
    },
    FETCH_LIFE_STAGES_ERROR: (state, action) => {state.lifeStagesError = action.payload.error}
});
