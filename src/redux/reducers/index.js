import { combineReducers } from "redux";
import {expressionAnnotations} from "./expressionAnnotationsReducer";
import {textMinedEntities} from "./textMinedEntitiesReducer";

export default combineReducers({expressionAnnotations, textMinedEntities});