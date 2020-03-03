import { combineReducers } from "redux";
import expressionAnnotationsReducer from "./expressionAnnotationsReducer";
import textMinedEntities from "./textMinedEntitiesReducer";

export default combineReducers({expressionAnnotationsReducer, textMinedEntities});