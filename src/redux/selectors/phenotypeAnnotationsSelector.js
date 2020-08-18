import {phenotypeAnnotationIsValid} from "../constraints/phenotype";
import {createPhenotypeAnnotation} from "../../annotationUtils";

export const getPhenotypeState = store => store.phenotypeAnnotations;

export const getPhenotypeAnnotations = store => getPhenotypeState(store) ? getPhenotypeState(store).annotations : [];

export const getPhenotypeTmpAnnotation = store => getPhenotypeState(store) ? getPhenotypeState(store).tmpAnnotation : createPhenotypeAnnotation();

export const getWrongAnnotation = store => getPhenotypeState(store) ? getPhenotypeState(store).wrongAnnotation : null
export const getPhenotypeSavedStatus = store => getPhenotypeState(store) ? getPhenotypeState(store).savedStatus : null
export const getCurrentPhenotypeAction = store => getPhenotypeState(store) ? getPhenotypeState(store).currentAction : 'Create'

export const phenotypeAnnotationsValid = store => getPhenotypeState(store) ?
    getPhenotypeState(store).annotations.every(annotation => phenotypeAnnotationIsValid(annotation)) : false;