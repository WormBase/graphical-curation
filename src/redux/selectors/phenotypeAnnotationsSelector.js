import {phenotypeAnnotationIsValid} from "../constraints/annotation";

export const getPhenotypeState = store => store.phenotypeAnnotations;

export const getPhenotypeAnnotations = store => getPhenotypeState(store) ? getPhenotypeState(store).annotations : [];

export const phenotypeAnnotationsValid = store => getPhenotypeState(store) ?
    getPhenotypeState(store).annotations.every(annotation => phenotypeAnnotationIsValid(annotation)) : false;