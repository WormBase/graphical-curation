import {expressionAnnotationIsValid} from "./constraints";

export const getExpressionState = store => store.expression;

export const getExpressionAnnotations = store => getExpressionState(store) ? getExpressionState(store).annotations : [];

export const expressionAnnotationsValid = store => getExpressionState(store) ?
    getExpressionState(store).annotations.every(annotation => expressionAnnotationIsValid(annotation)) : false;