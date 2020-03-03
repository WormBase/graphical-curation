export const FETCH_ENTITIES_REQUEST = "FETCH_ENTITIES_REQUEST";
export const FETCH_ENTITIES_SUCCESS = "FETCH_ENTITIES_SUCCESS";
export const FETCH_ENTITIES_ERROR = "FETCH_ENTITIES_ERROR";


export const fetchEntitiesRequest = () => ({
    type: FETCH_ENTITIES_REQUEST,
    payload: {}
});

export const fetchEntitiesSuccess = entitiesData => ({
   type: FETCH_ENTITIES_SUCCESS,
   payload: {
       genes: entitiesData.genes,
       lifeStages: entitiesData.lifeStages,
       anatomyTerms: entitiesData.anatomyTerms
   }
});

export const fetchEntitiesError = () => ({
   type: FETCH_ENTITIES_ERROR,
   payload: {}
});
