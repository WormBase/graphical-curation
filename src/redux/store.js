import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import rootReducer from "./reducers";
import {fetchGenes, fetchAnatomyTerms, fetchLifeStages} from "./actions/textMinedEntitiesAction";

let store = createStore(rootReducer, applyMiddleware(thunk));
store.dispatch(fetchGenes(process.env.REACT_APP_FETCH_ENTITIES_API_ENDPOINT, 0, 3));
store.dispatch(fetchAnatomyTerms(process.env.REACT_APP_FETCH_ENTITIES_API_ENDPOINT, 0));
store.dispatch(fetchLifeStages(process.env.REACT_APP_FETCH_ENTITIES_API_ENDPOINT, 0));

export default store;