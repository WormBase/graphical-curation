import axios from 'axios';

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

export const fetchAutocompleteEntities = (autocomplete_endpoint, matchString) => {
  return dispatch => {
      dispatch(fetchAutocompleteEntitiesRequest());
      let apiEndpoint = autocomplete_endpoint + matchString;
      axios
          .get(apiEndpoint)
          .then(res => {
              if (res) {
                  dispatch(fetchAutocompleteEntitiesSuccess(getEntities(res.data)));
              } else {
                  dispatch(fetchAutocompleteEntitiesError("error"));
              }
          })
          .catch(err => {
              dispatch(fetchAutocompleteEntitiesError(err));
          });
  };
};

/**
 * transform the result of an autocomplete call into a list of entities.
 *
 * @param {string} autocompleteRes
 * @returns a list of entity objects
 */
export function getEntities(autocompleteRes) {
    const addInfoRegex = / \( ([^ ]+) \)( \[[^ ]+\])? $/;
    let value;
    let modId;
    let results = [];
    let splitStr;
    for (splitStr of autocompleteRes.split('\n').filter(s => s !== '')) {
        if (addInfoRegex.test(splitStr)) {
            modId = addInfoRegex.exec(splitStr)[1];
            modId = modId.replace(':', '');
            value = splitStr.replace(addInfoRegex, "");
            results.push({value: value, modId: modId});
        } else {
            results.push({value: splitStr, modId: ''});
        }
    }
    return results;
}