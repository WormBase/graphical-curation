export const FETCH_ENTITIES_REQUEST = "FETCH_ENTITIES_REQUEST";
export const FETCH_ENTITIES_SUCCESS = "FETCH_ENTITIES_SUCCESS";
export const FETCH_ENTITIES_ERROR = "FETCH_ENTITIES_ERROR";
export const ADD_GENE = "ADD_GENE";
export const ADD_ANATOMY_TERM = "ADD_ANATOMY_TERM";
export const ADD_LIFE_STAGE = "ADD_LIFE_STAGE";
export const ADD_GO_CELLULAR_COMPONENT = "ADD_GO_CELLULAR_COMPONENT";
export const ADD_GO_MOLECULAR_FUNCTION = "ADD_GO_MOLECULAR_FUNCTION";
export const ADD_GO_BIOLOGICAL_PROCESS = "ADD_GO_BIOLOGICAL_PROCESS";
export const ADD_VARIANT = "ADD_VARIANT";
export const ADD_PHENOTYPE_TERM = "ADD_PHENOTYPE_TERM";


export const fetchEntitiesSuccess = entities => ({
  type: FETCH_ENTITIES_SUCCESS,
  payload: {
    entities
  }
});

export const fetchEntitiesRequest = () => ({
  type: FETCH_ENTITIES_REQUEST
});

export const fetchEntitiesError = error => ({
  type: FETCH_ENTITIES_ERROR,
  payload: {
    error
  }
});

export const addGene = gene => ({
  type: ADD_GENE,
  payload: { gene }
});

export const addAnatomyTerm = anatomyTerm => ({
  type: ADD_ANATOMY_TERM,
  payload: { anatomyTerm }
});

export const addLifeStage = lifeStage => ({
  type: ADD_LIFE_STAGE,
  payload: { lifeStage }
});

export const addGOCellularComponent = GOCellularComponent => ({
  type: ADD_GO_CELLULAR_COMPONENT,
  payload: { GOCellularComponent }
});

export const addGOMolecularFunction = GOMolecularFunction => ({
  type: ADD_GO_MOLECULAR_FUNCTION,
  payload: { GOMolecularFunction }
});

export const addGOBiologicalProcess = GOBiologicalProcess => ({
  type: ADD_GO_BIOLOGICAL_PROCESS,
  payload: { GOBiologicalProcess }
});

export const addVariant = variant => ({
  type: ADD_VARIANT,
  payload: { variant }
});

export const addPhenotypeTerm = phenotypeTerm => ({
  type: ADD_PHENOTYPE_TERM,
  payload: { phenotypeTerm }
});

