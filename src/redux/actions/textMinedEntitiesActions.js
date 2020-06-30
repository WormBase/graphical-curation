export const FETCH_ENTITIES_REQUEST = "FETCH_ENTITIES_REQUEST";
export const FETCH_ENTITIES_SUCCESS = "FETCH_ENTITIES_SUCCESS";
export const FETCH_ENTITIES_ERROR = "FETCH_ENTITIES_ERROR";
export const ADD_GENE = "ADD_GENE";
export const ADD_ANATOMY_TERM = "ADD_ANATOMY_TERM";
export const ADD_LIFE_STAGE = "ADD_LIFE_STAGE";
export const ADD_CELLULAR_COMPONENT = "ADD_CELLULAR_COMPONENT";
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

export const addCellularComponent = cellularComponent => ({
  type: ADD_CELLULAR_COMPONENT,
  payload: { cellularComponent }
});

export const addVariant = variant => ({
  type: ADD_VARIANT,
  payload: { variant }
});

export const addPhenotypeTerm = phenotypeTerm => ({
  type: ADD_PHENOTYPE_TERM,
  payload: { phenotypeTerm }
});

