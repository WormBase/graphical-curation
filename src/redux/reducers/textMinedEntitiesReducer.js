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
    transgenes: [],
    strains : [],
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
            state.genes = action.payload.entities.GENE !== undefined ? action.payload.entities.GENE : [];
            state.lifeStages = action.payload.entities.LIFESTAGE !== undefined ? action.payload.entities.LIFESTAGE : [];
            state.anatomyTerms = action.payload.entities.ANATOMY !== undefined ? action.payload.entities.ANATOMY : [];
            state.assays = action.payload.entities.ASSAY !== undefined ? action.payload.entities.ASSAY : [];
            state.anatomyFunctionAssays = action.payload.entities.ANATOMY_FUNCTION_ASSAYS !== undefined ? action.payload.entities.ANATOMY_FUNCTION_ASSAYS : [];
            state.GOCellularComponents = action.payload.entities.GOCC !== undefined ? action.payload.entities.GOCC : [];
            state.GOMolecularFunctions = action.payload.entities.GOMF !== undefined ? action.payload.entities.GOMF : [];
            state.GOBiologicalProcesses = action.payload.entities.GOBP !== undefined ? action.payload.entities.GOBP : [];
            state.phenotypeTerms = action.payload.entities.PHENOTERMS !== undefined ? action.payload.entities.PHENOTERMS : [];
            state.variants = action.payload.entities.VARIANT !== undefined ? action.payload.entities.VARIANT : [];
            state.transgenes = action.payload.entities.TRANSGENES !== undefined ? action.payload.entities.TRANSGENES : [];
            state.strains = action.payload.entities.STRAIN !== undefined ? action.payload.entities.STRAIN : [];
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
    ADD_GO_CELLULAR_COMPONENT: (state, action) => {state.GOCellularComponents = concatEntities(state.GOCellularComponents, action.payload.GOCellularComponent)},
    ADD_GO_MOLECULAR_FUNCTION: (state, action) => {state.GOMolecularFunctions = concatEntities(state.GOMolecularFunctions, action.payload.GOMolecularFunction)},
    ADD_GO_BIOLOGICAL_PROCESS: (state, action) => {state.GOBiologicalProcesses = concatEntities(state.GOBiologicalProcesses, action.payload.GOBiologicalProcess)},
    ADD_PHENOTYPE_TERM: (state, action) => {state.phenotypeTerms = concatEntities(state.phenotypeTerms, action.payload.phenotypeTerm)},
    ADD_VARIANT: (state, action) => {state.variants = concatEntities(state.variants, action.payload.variant)},
    ADD_TRANSGENE: (state, action) => {state.transgenes = concatEntities(state.transgenes, action.payload.transgenes)},
    ADD_STRAIN: (state, action) => {state.strains = concatEntities(state.strains, action.payload.strain)},
});
