import {createReducer} from '@reduxjs/toolkit'

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
            annotationId: Math.max(...state.annotations.map(a => a.annotationId), 0) + 1,
            phenotype: action.payload.annotation.phenotype,
            gene: action.payload.annotation.gene,
            involved: action.payload.annotation.involved,
            anatomyTerms: action.payload.annotation.anatomyTerms,
            evidence: action.payload.annotation.evidence,
            remark: action.payload.annotation.remark,
            noctuamodel: action.payload.annotation.noctuamodel,
            genotype: action.payload.annotation.genotype,
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