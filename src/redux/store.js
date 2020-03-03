import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import rootReducer from "./reducers";
import {fetchEntities} from "./actions/textMinedEntitiesAction";

let store = createStore(rootReducer, applyMiddleware(thunk));
store.dispatch(fetchEntities(process.env.REACT_APP_FETCH_ENTITIES_API_ENDPOINT));

export default store;