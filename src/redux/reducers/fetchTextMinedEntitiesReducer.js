import {
    FETCH_ENTITIES_REQUEST,
    FETCH_ENTITIES_SUCCESS,
    FETCH_ENTITIES_ERROR
} from "../actions/fetchTextMinedEntitiesAction";


const initialState = {
    genes: [],
    lifeStages: [],
    anatomyTerms: [],
    isLoading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_ENTITIES_REQUEST: {
            return {
                ...state,
                genes: state.genes,
                lifeStages: state.lifeStages,
                anatomyTerms: state.anatomyTerms,
                isLoading: true
            };
        }
        default:
            return state;
    }
}
