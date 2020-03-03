import axios from 'axios';

export const FETCH_ENTITIES_REQUEST = "FETCH_ENTITIES_REQUEST";
export const FETCH_ENTITIES_SUCCESS = "FETCH_ENTITIES_SUCCESS";
export const FETCH_ENTITIES_ERROR = "FETCH_ENTITIES_ERROR";

export const fetchEntities = apiEndpoint => {
  return dispatch => {
    dispatch(fetchEntitiesRequest());
    let testEntities = {
      genes: ['lin-12', 'daf-16'],
      anatomyTerms: ['tail', 'head'],
      lifeStages: ['embryo', 'adult']
    };

    dispatch(fetchEntitiesSuccess(testEntities));

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
