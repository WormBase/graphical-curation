import { combineReducers } from "redux";
import {expressionAnnotationsReducer} from "./expressionAnnotationsReducer";
import {textMinedEntitiesReducer} from "./textMinedEntitiesReducer";

export default combineReducers({expressionAnnotationsReducer, textMinedEntitiesReducer});