import { combineReducers } from "redux";
import {expressionAnnotations} from "./expressionAnnotationsReducer";
import {phenotypeAnnotations} from "./phenotypeAnnotationsReducer";
import {textMinedEntities} from "./textMinedEntitiesReducer";
import {anatomyFunctionAnnotations} from "./anatomyFunctionAnnotationsReducer";

export default combineReducers({expressionAnnotations, phenotypeAnnotations, textMinedEntities, anatomyFunctionAnnotations});