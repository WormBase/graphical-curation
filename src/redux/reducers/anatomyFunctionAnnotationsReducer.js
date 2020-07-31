import {createReducer} from '@reduxjs/toolkit'
import * as uuid from 'uuid'

const initialState = {
    annotations: []
};

function annotationExists(annotation, storedAnnotations) {
    return storedAnnotations.some(a => {
        return annotation.gene === a.gene && annotation.phenotype === a.phenotype &&
            arraysContainSameElements(annotation.anatomyTerms, a.anatomyTerms)
    })
}

const arraysContainSameElements = (array1, array2) => array1.sort().join(',') === array2.sort().join(',');

export const anatomyFunctionAnnotations = createReducer(initialState, {
    SET_ANATOMYFUNCTION_ANNOTS: (state, action) => {
        if (action.payload.annotations !== undefined) {
            state.annotations = action.payload.annotations
        }
    },
    ADD_ANATOMYFUNCTION_ANNOT: (state, action) => {
        let newAnnotation = {
            annotationId: uuid.v4(),
            assay: action.payload.annotation.assay,
            phenotype: action.payload.annotation.phenotype,
            gene: action.payload.annotation.gene,
            involved: action.payload.annotation.involved,
            anatomyTerms: action.payload.annotation.anatomyTerms,
            evidence: action.payload.annotation.evidence,
            remarks: action.payload.annotation.remarks.filter(r => r !== ''),
            noctuamodels: action.payload.annotation.noctuamodels.filter(n => n !== ''),
            genotypes: action.payload.annotation.genotypes.filter(g => g !== ''),
            authorstatements: action.payload.annotation.authorstatements.filter(a => a !== ''),
            dateAssigned: Date.now()
        };
        if (!annotationExists(newAnnotation, state.annotations)) {
            state.annotations.push(newAnnotation);
        }
    },
    DELETE_ANATOMYFUNCTION_ANNOT: (state, action) => {
        state.annotations = state.annotations.filter(a => a.annotationId !== action.payload.annotationId)
    },
    MODIFY_ANATOMYFUNCTION_ANNOT: (state, action) => {
        let modAnnotation = action.payload.annotation;
        modAnnotation.dateAssigned = Date.now();
        state.annotations.forEach((annotation, idx, object) => {
            if (annotation.annotationId === modAnnotation.annotationId) {
                object[idx] = modAnnotation;
            }
        });
    }
});