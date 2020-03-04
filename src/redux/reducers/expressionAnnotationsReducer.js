import {createReducer} from '@reduxjs/toolkit'

const initialState = {
    annotations: [],
    isLoading: false,
    error: null
};

export const expressionAnnotations = createReducer(initialState, {
    FETCH_EXPR_ANNOTS_REQUEST: (state, action) => {state.isLoading = true},
    FETCH_EXPR_ANNOTS_SUCCESS: (state, action) => {state.annotations = action.payload.annotations},
    FETCH_EXPR_ANNOTS_ERROR: (state, action) => {
        state.isLoading = false;
        state.error = action.payload.error
    },
    ADD_EXPR_ANNOT: (state, action) => {
        state.annotations.push({
            annotationId: action.payload.annotationId,
            gene: undefined,
            whenExpressed: [],
            assay: undefined,
            evidence: undefined,
            whereExpressed: []
        })
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