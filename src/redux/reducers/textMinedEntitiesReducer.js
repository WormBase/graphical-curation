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
    anatomyTermsError: null,
    assays: [],
    assaysLoading: false,
    assaysError: null
};

export const textMinedEntities = createReducer(initialState, {
    FETCH_GENES_REQUEST: (state, action) => {state.genesLoading = true},
    FETCH_GENES_SUCCESS: (state, action) => {
        state.genes = action.payload.genes.sort();
        state.genesLoading = false;
    },
    FETCH_GENES_ERROR: (state, action) => {
        state.genesLoading = false;
        state.genesError = action.payload.error;
    },
    ADD_GENE: (state, action) => {state.genes = [...state.genes, action.payload.gene].sort()},

    FETCH_ANATOMY_TERMS_REQUEST: (state, action) => {state.anatomyTermsLoading = true},
    FETCH_ANATOMY_TERMS_SUCCESS: (state, action) => {
        state.anatomyTerms = action.payload.anatomyTerms.sort();
        state.anatomyTermsLoading = false
    },
    FETCH_ANATOMY_TERMS_ERROR: (state, action) => {
        state.lifeStagesLoading = false;
        state.lifeStagesError = action.payload.error;
    },
    ADD_ANATOMY_TERM: (state, action) => {state.anatomyTerms = [...state.anatomyTerms, action.payload.anatomyTerm].sort()},

    FETCH_LIFE_STAGES_REQUEST: (state, action) => {state.lifeStagesLoading = true},
    FETCH_LIFE_STAGES_SUCCESS: (state, action) => {
        state.lifeStages = action.payload.lifeStages.sort();
        state.lifeStagesLoading = false
    },
    FETCH_LIFE_STAGES_ERROR: (state, action) => {
        state.lifeStagesLoading = false;
        state.lifeStagesError = action.payload.error;
    },
    ADD_LIFE_STAGE: (state, action) => {state.lifeStages = [...state.lifeStages, action.payload.lifeStage].sort()},

    FETCH_ASSAYS_REQUEST: (state, action) => {state.assaysLoading = true},
    FETCH_ASSAYS_SUCCESS: (state, action) => {
        state.assays = action.payload.assays.sort();
        state.assaysLoading = false
    },
    FETCH_ASSAYS_ERROR: (state, action) => {
        state.assaysLoading = false;
        state.assaysError = action.payload.error;
    }
});
