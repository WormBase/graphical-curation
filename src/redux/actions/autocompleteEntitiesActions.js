export const FETCH_AUTOCOMPLETE_ENTITIES_REQUEST = "FETCH_AUTOCOMPLETE_ENTITIES_REQUEST";
export const FETCH_AUTOCOMPLETE_ENTITIES_SUCCESS = "FETCH_AUTOCOMPLETE_ENTITIES_SUCCESS";
export const FETCH_AUTOCOMPLETE_ENTITIES_ERROR = "FETCH_AUTOCOMPLETE_ENTITIES_ERROR";
export const RESET_AUTOCOMPLETE_ENTITIES = "RESET_AUTOCOMPLETE_ENTITIES";


export const fetchAutocompleteEntitiesRequest = () => ({
  type: FETCH_AUTOCOMPLETE_ENTITIES_REQUEST
});

export const fetchAutocompleteEntitiesSuccess = entities => ({
  type: FETCH_AUTOCOMPLETE_ENTITIES_SUCCESS,
  payload: {
    entities
  }
});

export const fetchAutocompleteEntitiesError = error => ({
  type: FETCH_AUTOCOMPLETE_ENTITIES_ERROR,
  payload: {
    error
  }
});

export const resetAutocompleteEntities = () => ({
  type: RESET_AUTOCOMPLETE_ENTITIES
});

export const fetchAutocompleteEntities = (autocompleteObj, entityType, matchString) => {
    return dispatch => {
        dispatch(fetchAutocompleteEntitiesRequest());
        autocompleteObj.searchEntities(entityType, matchString)
            .then(res => {
                if (res) {
                    dispatch(fetchAutocompleteEntitiesSuccess(res));
                } else {
                    dispatch(fetchAutocompleteEntitiesError("error"));
                }})
            .catch(err => {
                dispatch(fetchAutocompleteEntitiesError(err));
            });
    };
};