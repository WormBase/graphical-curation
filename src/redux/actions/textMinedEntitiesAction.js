  import axios from 'axios';

export const FETCH_GENES_REQUEST = "FETCH_GENES_REQUEST";
export const FETCH_GENES_SUCCESS = "FETCH_GENES_SUCCESS";
export const FETCH_GENES_ERROR = "FETCH_GENES_ERROR";

export const FETCH_ANATOMY_TERMS_REQUEST = "FETCH_ANATOMY_TERMS_REQUEST";
export const FETCH_ANATOMY_TERMS_SUCCESS = "FETCH_ANATOMY_TERMS_SUCCESS";
export const FETCH_ANATOMY_TERMS_ERROR = "FETCH_ANATOMY_TERMS_ERROR";

export const FETCH_LIFE_STAGES_REQUEST = "FETCH_LIFE_STAGES_REQUEST";
export const FETCH_LIFE_STAGES_SUCCESS = "FETCH_LIFE_STAGES_SUCCESS";
export const FETCH_LIFE_STAGES_ERROR = "FETCH_LIFE_STAGES_ERROR";

export const fetchGenes = apiEndpoint => {
  return dispatch => {
    dispatch(fetchGenesRequest());
    let genes = ['lin-12', 'daf-16', 'lin-2', 'daf-12', 'unc-119'];

   dispatch(fetchGenesSuccess(genes));

    // TODO uncomment this code and comment above when ready to fetch entities from API
    // axios
    //   .post(apiEndpoint)
    //   .then(res => {
    //     dispatch(fetchEntitiesSuccess(res.data));
    //   })
    //   .catch(err => {
    //     dispatch(fetchEntitiesError(err.message));
    //   });
  };
};

const fetchGenesSuccess = (genes, totalNum) => ({
  type: FETCH_GENES_SUCCESS,
  payload: {
    genes
  }
});

const fetchGenesRequest = () => ({
  type: FETCH_GENES_REQUEST
});

const fetchGenesError = error => ({
  type: FETCH_GENES_ERROR,
  payload: {
    error
  }
});

export const fetchAnatomyTerms = apiEndpoint => {
  return dispatch => {
    dispatch(fetchAnatomyTermsRequest());
    let anatomyTerms = ['tail', 'head', 'pharynx', 'vulva', 'gonad'];

    dispatch(fetchAnatomyTermsSuccess(anatomyTerms));

    // TODO uncomment this code and comment above when ready to fetch entities from API
    // axios
    //   .post(apiEndpoint)
    //   .then(res => {
    //     dispatch(fetchEntitiesSuccess(res.data));
    //   })
    //   .catch(err => {
    //     dispatch(fetchEntitiesError(err.message));
    //   });
  };
};

const fetchAnatomyTermsSuccess = anatomyTerms => ({
  type: FETCH_ANATOMY_TERMS_SUCCESS,
  payload: {
    anatomyTerms
  }
});

const fetchAnatomyTermsRequest = () => ({
  type: FETCH_ANATOMY_TERMS_REQUEST
});

const fetchAnatomyTermsError = error => ({
  type: FETCH_ANATOMY_TERMS_ERROR,
  payload: {
    error
  }
});

export const fetchLifeStages = (apiEndpoint) => {
  return dispatch => {
    dispatch(fetchLifeStagesRequest());
    let lifeStages = ['embryo', 'adult'];

    dispatch(fetchLifeStagesSuccess(lifeStages));

    // TODO uncomment this code and comment above when ready to fetch entities from API
    // axios
    //   .post(apiEndpoint)
    //   .then(res => {
    //     dispatch(fetchEntitiesSuccess(res.data));
    //   })
    //   .catch(err => {
    //     dispatch(fetchEntitiesError(err.message));
    //   });
  };
};

const fetchLifeStagesSuccess = lifeStages => ({
  type: FETCH_LIFE_STAGES_SUCCESS,
  payload: {
    lifeStages
  }
});

const fetchLifeStagesRequest = () => ({
  type: FETCH_LIFE_STAGES_REQUEST
});

const fetchLifeStagesError = error => ({
  type: FETCH_LIFE_STAGES_ERROR,
  payload: {
    error
  }
});

