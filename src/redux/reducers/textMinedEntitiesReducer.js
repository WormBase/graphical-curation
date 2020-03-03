import {
    FETCH_ENTITIES_REQUEST,
    FETCH_ENTITIES_SUCCESS,
    FETCH_ENTITIES_ERROR
} from "../actions/textMinedEntitiesAction";


const initialState = {
    genes: [],
    lifeStages: [],
    anatomyTerms: [],
    isLoading: false,
    error: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_ENTITIES_REQUEST: {
            return {
                ...state,
                genes: state.genes,
                lifeStages: state.lifeStages,
                anatomyTerms: state.anatomyTerms,
                isLoading: true,
                error: state.error
            };
        }
        case FETCH_ENTITIES_SUCCESS: {
            return {
                ...state,
                genes: action.payload.entities.genes,
                lifeStages: action.payload.entities.lifeStages,
                anatomyTerms: action.payload.entities.anatomyTerms,
                isLoading: false,
                error: state.error
            };
        }
        case FETCH_ENTITIES_ERROR: {
            return {
                ...state,
                genes: state.genes,
                lifeStages: state.lifeStages,
                anatomyTerms: state.anatomyTerms,
                isLoading: false,
                error: action.payload.error
            };
        }
        default:
            return state;
    }
}
