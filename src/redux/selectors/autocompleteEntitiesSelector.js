export const getAutocompleteEntitiesState = store => store.autocompleteEntities;

export const getAutocompleteEntities = store => getAutocompleteEntitiesState(store) ? getAutocompleteEntitiesState(store).autocompleteEntities : [];
export const isAutocompleteLoading = store => getAutocompleteEntitiesState(store) ? getAutocompleteEntitiesState(store).loading : false;
export const getAutocompleteError = store => getAutocompleteEntitiesState(store) ? getAutocompleteEntitiesState(store).error : null;
