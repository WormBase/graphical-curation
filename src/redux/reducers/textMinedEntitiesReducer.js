import {createReducer} from '@reduxjs/toolkit';

const initialState = {
    genes: [],
    lifeStages: [],
    anatomyTerms: [],
    assays: [],
    loading: false,
    error: null
};

export const textMinedEntities = createReducer(initialState, {
    FETCH_ENTITIES_REQUEST: (state, action) => {state.loading = true},
    FETCH_ENTITIES_SUCCESS: (state, action) => {
        state.genes = action.payload.entities.GENE !== undefined ? action.payload.entities.GENE.sort() : [];
        state.lifeStages = action.payload.entities.OTHER !== undefined ? action.payload.entities.OTHER.sort() : [];
        state.anatomyTerms = action.payload.entities.ANATOMY !== undefined ? action.payload.entities.ANATOMY.sort() : [];
        state.assays = action.payload.entities.assays !== undefined ? action.payload.entities.assays.sort() : [];
        state.loading = false;
        state.error = null;
    },
    FETCH_ENTITIES_ERROR: (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
    },
    ADD_GENE: (state, action) => {state.genes = [...state.genes, action.payload.gene].sort()},
    ADD_ANATOMY_TERM: (state, action) => {state.anatomyTerms = [...state.anatomyTerms, action.payload.anatomyTerm].sort()},
    ADD_LIFE_STAGE: (state, action) => {state.lifeStages = [...state.lifeStages, action.payload.lifeStage].sort()}
});
