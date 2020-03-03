import { combineReducers } from "redux";
import expressionAnnotations from "./expressionAnnotationsReducer";
import fetchTextMinedEntities from "./fetchTextMinedEntitiesReducer";

export default combineReducers({expressionAnnotations, fetchTextMinedEntities});