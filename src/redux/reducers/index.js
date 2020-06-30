import { combineReducers } from "redux";
import {expressionAnnotations} from "./expressionAnnotationsReducer";
import {phenotypeAnnotations} from "./phenotypeAnnotationsReducer";
import {textMinedEntities} from "./textMinedEntitiesReducer";
import {anatomyFunctionAnnotations} from "./anatomyFunctionAnnotationsReducer";
import {internalState} from "./internalStateReducer";

export default combineReducers({expressionAnnotations, phenotypeAnnotations, textMinedEntities, anatomyFunctionAnnotations, internalState});