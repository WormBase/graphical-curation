import {createReducer} from '@reduxjs/toolkit';

const initialState = {
    genes: [],
    lifeStages: [],
    anatomyTerms: [],
    assays: [],
    anatomyFunctionAssays: [],
    GOCellularComponents: [],
    GOMolecularFunctions: [],
    GOBiologicalProcesses: [],
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
            state.anatomyFunctionAssays = action.payload.entities.ANATOMY_FUNCTION_ASSAYS !== undefined ? action.payload.entities.ANATOMY_FUNCTION_ASSAYS.sort() : [];
            state.GOCellularComponents = action.payload.entities.GOCC !== undefined ? action.payload.entities.GOCC : [];
            state.GOMolecularFunctions = action.payload.entities.GOMF !== undefined ? action.payload.entities.GOMF : [];
            state.GOBiologicalProcesses = action.payload.entities.GOBP !== undefined ? action.payload.entities.GOBP : [];
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
    ADD_GO_CELLULAR_COMPONENT: (state, action) => {state.GOCellularComponents = concatEntities(state.GOCellularComponents, action.payload.GOCellularComponents)},
    ADD_GO_MOLECULAR_FUNCTION: (state, action) => {state.GOMolecularFunctions = concatEntities(state.GOMolecularFunctions, action.payload.GOMolecularFunctions)},
    ADD_GO_BIOLOGICAL_PROCESS: (state, action) => {state.GOBiologicalProcesses = concatEntities(state.GOBiologicalProcesses, action.payload.GOBiologicalProcesses)},
    ADD_PHENOTYPE_TERM: (state, action) => {state.phenotypeTerms = concatEntities(state.phenotypeTerms, action.payload.phenotypeTerm)},
    ADD_VARIANT: (state, action) => {state.variants = concatEntities(state.variants, action.payload.variant)},
});
