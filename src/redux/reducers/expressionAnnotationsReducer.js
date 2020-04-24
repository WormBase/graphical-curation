import {createReducer} from '@reduxjs/toolkit'

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
    SET_EXPR_ANNOTS: (state, action) => {state.annotations = action.payload.annotations},
    ADD_EXPR_ANNOT: (state, action) => {
        let newAnnotation = {
            annotationId: Math.max(...state.annotations.map(a => a.annotationId), 0) + 1,
            gene: action.payload.annotation.gene,
            whenExpressed: action.payload.annotation.whenExpressed,
            assay: action.payload.annotation.assay,
            evidence: action.payload.annotation.evidence,
            whereExpressed: action.payload.annotation.whereExpressed,
            dateAssigned: Date.now()
        };
        if (!annotationExists(newAnnotation, state.annotations)) {
            state.annotations.push(newAnnotation);
        }
    },
    DELETE_EXPR_ANNOT: (state, action) => {
        state.annotations = state.annotations.filter(a => a.annotationId !== action.payload.annotationId)
    },
    SET_GENE_EXPR_ANNOT: (state, action) => {
        state.annotations.every(a => {
            if (a.annotationId === action.payload.annotationId) {
                a.gene = action.payload.gene;
                return false
            } else {
                return true
            }
        })
    },
    ADD_WHEN_EXPRESSED_EXPR_ANNOT: (state, action) => {
        state.annotations.every(a => {
            if (a.annotationId === action.payload.annotationId) {
                a.whenExpressed = [...new Set([...a.whenExpressed, action.payload.whenExpressed])];
                return false
            } else {
                return true
            }
        })
    },
    REMOVE_WHEN_EXPRESSED_EXPR_ANNOT: (state, action) => {
        state.annotations.every(a => {
            if (a.annotationId === action.payload.annotationId) {
                let newWhenExpressed = new Set(a.whenExpressed);
                newWhenExpressed.delete(action.payload.whenExpressed);
                a.whenExpressed = [...newWhenExpressed];
                return false
            } else {
                return true
            }
        })
    },
    SET_ASSAY_EXPR_ANNOT: (state, action) => {
        state.annotations.every(a => {
            if (a.annotationId === action.payload.annotationId) {
                a.assay = action.payload.assay;
                return false
            } else {
                return true
            }
        })
    },
    SET_EVIDENCE_EXPR_ANNOT: (state, action) => {
        state.annotations.every(a => {
            if (a.annotationId === action.payload.annotationId) {
                a.evidence = action.payload.evidence;
                return false
            } else {
                return true
            }
        })
    },
    ADD_WHERE_EXPRESSED_EXPR_ANNOT: (state, action) => {
        state.annotations.every(a => {
            if (a.annotationId === action.payload.annotationId) {
                a.whereExpressed = [...new Set([...a.whereExpressed, action.payload.whereExpressed])];
                return false
            } else {
                return true
            }
        })
    },
    REMOVE_WHERE_EXPRESSED_EXPR_ANNOT: (state, action) => {
        state.annotations.every(a => {
            if (a.annotationId === action.payload.annotationId) {
                let newWhereExpressed = new Set(a.whereExpressed);
                newWhereExpressed.delete(action.payload.whereExpressed);
                a.whereExpressed = [...newWhereExpressed];
                return false
            } else {
                return true
            }
        })
    }
});