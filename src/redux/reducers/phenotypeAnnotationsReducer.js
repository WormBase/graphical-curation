import {createReducer} from '@reduxjs/toolkit'

const initialState = {
    annotations: []
};

function annotationExists(annotation, storedAnnotations) {
    return storedAnnotations.some(a => {
        return annotation.object === a.object && arraysContainSameElements(annotation.phenoTerms, a.phenoTerms)
    })
}

const arraysContainSameElements = (array1, array2) => array1.sort().join(',') === array2.sort().join(',');

export const phenotypeAnnotations = createReducer(initialState, {
    SET_PHENOTYPE_ANNOTS: (state, action) => {
        if (action.payload.annotations !== undefined) {
            state.annotations = action.payload.annotations
        }
    },
    ADD_PHENOTYPE_ANNOT: (state, action) => {
        let newAnnotation = {
            annotationId: Math.max(...state.annotations.map(a => a.annotationId), 0) + 1,
            object: action.payload.annotation.object,
            phenotypeTerms: action.payload.annotation.phenotypeTerms,
            anatomyTerms: action.payload.annotation.anatomyTerms,
            lifeStages: action.payload.annotation.lifeStages,
            evidence: action.payload.annotation.evidence,
            phenotypeStatement: action.payload.annotation.phenotypeStatement,
            dateAssigned: Date.now()
        };
        if (!annotationExists(newAnnotation, state.annotations)) {
            state.annotations.push(newAnnotation);
        }
    },
    DELETE_PHENOTYPE_ANNOT: (state, action) => {
        state.annotations = state.annotations.filter(a => a.annotationId !== action.payload.annotationId)
    },
    MODIFY_PHENOTYPE_ANNOT: (state, action) => {
        let modAnnotation = action.payload.annotation;
        modAnnotation.dateAssigned = Date.now();
        state.annotations.forEach((annotation, idx, object) => {
            if (annotation.annotationId === modAnnotation.annotationId) {
                object[idx] = modAnnotation;
            }
        });
    },
});