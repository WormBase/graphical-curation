import { combineReducers } from "redux";
import {expressionAnnotations} from "./expressionAnnotationsReducer";
import {phenotypeAnnotations} from "./phenotypeAnnotationsReducer";
import {textMinedEntities} from "./textMinedEntitiesReducer";

export default combineReducers({expressionAnnotations, phenotypeAnnotations, textMinedEntities});