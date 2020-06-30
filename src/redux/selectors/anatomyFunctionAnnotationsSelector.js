import {anatomyFunctionAnnotationIsValid} from "../constraints/anatomyFunction";

export const getAnatomyFunctionState = store => store.anatomyFunctionAnnotations;

export const getAnatomyFunctionAnnotations = store => getAnatomyFunctionState(store) ? getAnatomyFunctionState(store).annotations : [];

export const anatomyFunctionAnnotationsValid = store => getAnatomyFunctionState(store) ?
    getAnatomyFunctionState(store).annotations.every(annotation => anatomyFunctionAnnotationIsValid(annotation)) : false;