import {createReducer} from '@reduxjs/toolkit'
import * as uuid from 'uuid'

const initialState = {
    annotations: []
};

function annotationExists(annotation, storedAnnotations) {
    return storedAnnotations.some(a => {
        return annotation.gene === a.gene &&
            arraysContainSameElements(annotation.whereExpressed, a.whereExpressed) &&
            arraysContainSameElements(annotation.whenExpressed, a.whenExpressed);
    })
}

const arraysContainSameElements = (array1, array2) => array1.sort().join(',') === array2.sort().join(',');

export const expressionAnnotations = createReducer(initialState, {
    SET_EXPR_ANNOTS: (state, action) => {
        if (action.payload.annotations !== undefined) {
            state.annotations = action.payload.annotations
        }
    },
    ADD_EXPR_ANNOT: (state, action) => {
        let newAnnotation = {
            annotationId: uuid.v4(),
            gene: action.payload.annotation.gene,
            whenExpressed: action.payload.annotation.whenExpressed,
            assay: action.payload.annotation.assay,
            evidence: action.payload.annotation.evidence,
            whereExpressed: action.payload.annotation.whereExpressed,
            cellularComponent: action.payload.annotation.cellularComponent,
            dateAssigned: Date.now()
        };
        if (!annotationExists(newAnnotation, state.annotations)) {
            state.annotations.push(newAnnotation);
        }
    },
    DELETE_EXPR_ANNOT: (state, action) => {
        state.annotations = state.annotations.filter(a => a.annotationId !== action.payload.annotationId)
    },
    MODIFY_EXPR_ANNOT: (state, action) => {
        let modAnnotation = action.payload.annotation;
        modAnnotation.dateAssigned = Date.now();
        state.annotations.forEach((annotation, idx, object) => {
            if (annotation.annotationId === modAnnotation.annotationId) {
                object[idx] = modAnnotation;
            }
        });
    }
});