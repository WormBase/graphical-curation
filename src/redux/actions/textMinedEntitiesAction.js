import axios from 'axios';

export const FETCH_ENTITIES_REQUEST = "FETCH_ENTITIES_REQUEST";
export const FETCH_ENTITIES_SUCCESS = "FETCH_ENTITIES_SUCCESS";
export const FETCH_ENTITIES_ERROR = "FETCH_ENTITIES_ERROR";
export const ADD_GENE = "ADD_GENE";
export const ADD_ANATOMY_TERM = "ADD_ANATOMY_TERM";
export const ADD_LIFE_STAGE = "ADD_LIFE_STAGE";

export const fetchEntities = (apiEndpoint, articleId) => {
  return dispatch => {
    dispatch(fetchEntitiesRequest());
    axios
      .post(apiEndpoint + articleId)
      .then(res => {
        res.data.entities.GENE = res.data.entities.GENE.map((entity) => entity.value);
        res.data.entities.ANATOMY = res.data.entities.ANATOMY.map((entity) => entity.value);
        res.data.entities.OTHER = res.data.entities.OTHER.map((entity) => entity.value);
        res.data.entities.assays = ['In situ Hybridization', 'Immunohistochemistry', 'Reporter gene', 'Western Blot',
          'Northern blot', 'RT-PCR'];
        dispatch(fetchEntitiesSuccess(res.data.entities));
      })
      .catch(err => {
        dispatch(fetchEntitiesError(err.message));
      });
  };
};

const fetchEntitiesSuccess = entities => ({
  type: FETCH_ENTITIES_SUCCESS,
  payload: {
    entities
  }
});

const fetchEntitiesRequest = () => ({
  type: FETCH_ENTITIES_REQUEST
});

const fetchEntitiesError = error => ({
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

