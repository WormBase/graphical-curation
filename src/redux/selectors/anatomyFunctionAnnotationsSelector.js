import {anatomyFunctionAnnotationIsValid} from "../constraints/anatomyFunction";
import {createAnatomyFunctionAnnotation} from "../../annotationUtils";

export const getAnatomyFunctionState = store => store.anatomyFunctionAnnotations;

export const getAnatomyFunctionAnnotations = store => getAnatomyFunctionState(store) ? getAnatomyFunctionState(store).annotations : [];

export const getAnatomyFunctionTmpAnnotation = store => getAnatomyFunctionState(store) ? getAnatomyFunctionState(store).tmpAnnotation : createAnatomyFunctionAnnotation();

export const getWrongAnnotation = store => getAnatomyFunctionState(store) ? getAnatomyFunctionState(store).wrongAnnotation : []
export const getAnatomyFunctionSavedStatus = store => getAnatomyFunctionState(store) ? getAnatomyFunctionState(store).savedStatus : null
export const getCurrentAnatomyFunctionAction = store => getAnatomyFunctionState(store) ? getAnatomyFunctionState(store).currentAction : 'Create'

export const anatomyFunctionAnnotationsValid = store => getAnatomyFunctionState(store) ?
    getAnatomyFunctionState(store).annotations.every(annotation => anatomyFunctionAnnotationIsValid(annotation)) : false;