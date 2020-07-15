import {createReducer} from '@reduxjs/toolkit';

const initialState = {
    genes: [],
    lifeStages: [],
    anatomyTerms: [],
    assays: [],
    cellularComponents: [],
    variants: [],
    phenotypeTerms: [],
    loading: false,
    error: null
};

export const concatEntities = (initEntities, entity) => {
    if (initEntities.every (e => e.value !== entity.value)) {
        return [...initEntities, entity].sort();
    }
    return initEntities;
};

export const textMinedEntities = createReducer(initialState, {
    FETCH_ENTITIES_REQUEST: (state, action) => {state.loading = true},
    FETCH_ENTITIES_SUCCESS: (state, action) => {
        if (action.payload.entities !== undefined) {
            state.genes = action.payload.entities.GENE !== undefined ? action.payload.entities.GENE.sort() : [];
            state.lifeStages = action.payload.entities.LIFESTAGE !== undefined ? action.payload.entities.LIFESTAGE.sort() : [];
            state.anatomyTerms = action.payload.entities.ANATOMY !== undefined ? action.payload.entities.ANATOMY.sort() : [];
            state.assays = action.payload.entities.ASSAYS !== undefined ? action.payload.entities.ASSAYS.sort() : [];
            state.cellularComponents = action.payload.entities.GENEONTOLOGY !== undefined ? action.payload.entities.GENEONTOLOGY : [];
            state.phenotypeTerms = action.payload.entities.PHENOTERMS !== undefined ? action.payload.entities.PHENOTERMS : [];
            state.variants = action.payload.entities.VARIANT !== undefined ? action.payload.entities.VARIANT : [];
        }
        state.loading = false;
        state.error = null;
    },
    FETCH_ENTITIES_ERROR: (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
    },
    ADD_GENE: (state, action) => {state.genes = concatEntities(state.genes, action.payload.gene)},
    ADD_ANATOMY_TERM: (state, action) => {state.anatomyTerms = concatEntities(state.anatomyTerms, action.payload.anatomyTerm)},
    ADD_LIFE_STAGE: (state, action) => {state.lifeStages = concatEntities(state.lifeStages, action.payload.lifeStage)},
    ADD_CELLULAR_COMPONENT: (state, action) => {state.cellularComponents = concatEntities(state.cellularComponents, action.payload.cellularComponent)},
    ADD_PHENOTYPE_TERM: (state, action) => {state.phenotypeTerms = concatEntities(state.phenotypeTerms, action.payload.phenotypeTerm)},
    ADD_VARIANT: (state, action) => {state.variants = concatEntities(state.variants, action.payload.variant)},
});
