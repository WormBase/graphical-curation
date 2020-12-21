import {expressionAnnotationIsValid} from "../constraints/expression";
import {createExpressionAnnotation} from "../../annotationUtils";

export const getExpressionState = store => store.expressionAnnotations;

export const getExpressionAnnotations = store => getExpressionState(store) ? getExpressionState(store).annotations : [];

export const getExpressionTmpAnnotation = store => getExpressionState(store) ? getExpressionState(store).tmpAnnotation : createExpressionAnnotation();

export const getWrongAnnotation = store => getExpressionState(store) ? getExpressionState(store).wrongAnnotation : []
export const getExpressionSavedStatus = store => getExpressionState(store) ? getExpressionState(store).savedStatus : null
export const getCurrentExpressionAction = store => getExpressionState(store) ? getExpressionState(store).currentAction : 'Create'

export const expressionAnnotationsValid = store => getExpressionState(store) ?
    getExpressionState(store).annotations.every(annotation => expressionAnnotationIsValid(annotation)) : false;