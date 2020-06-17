import {expressionAnnotationIsValid} from "../constraints/expression";

export const getExpressionState = store => store.expressionAnnotations;

export const getExpressionAnnotations = store => getExpressionState(store) ? getExpressionState(store).annotations : [];

export const expressionAnnotationsValid = store => getExpressionState(store) ?
    getExpressionState(store).annotations.every(annotation => expressionAnnotationIsValid(annotation)) : false;