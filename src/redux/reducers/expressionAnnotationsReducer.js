import {
    ADD_EXPR_ANNOT,
    ADD_WHEN_EXPRESSED_EXPR_ANNOT, ADD_WHERE_EXPRESSED_EXPR_ANNOT,
    DELETE_EXPR_ANNOT, FETCH_EXPR_ANNOTS_ERROR, FETCH_EXPR_ANNOTS_REQUEST, FETCH_EXPR_ANNOTS_SUCCESS,
    REMOVE_WHEN_EXPRESSED_EXPR_ANNOT, REMOVE_WHERE_EXPRESSED_EXPR_ANNOT,
    SET_ASSAY_EXPR_ANNOT,
    SET_EVIDENCE_EXPR_ANNOT,
    SET_GENE_EXPR_ANNOT
} from "../actions/expressionAnnotationsActions";


const initialState = {
    annotations: [],
    isLoading: false,
    error: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_EXPR_ANNOTS_REQUEST: {
            return {
                ...state,
                annotations: state.annotations,
                isLoading: true,
                error: state.error
            };
        }
        case FETCH_EXPR_ANNOTS_SUCCESS: {
            return {
                ...state,
                annotations: action.payload.annotations,
                isLoading: false,
                error: null
            };
        }
        case FETCH_EXPR_ANNOTS_ERROR: {
            return {
                ...state,
                annotations: state.annotations,
                isLoading: false,
                error: action.payload.error
            };
        }
        case ADD_EXPR_ANNOT: {
            return {
                ...state,
                annotations: [...state.annotations, {
                    annotationId: Math.max(...state.annotations.map(a => a.annotationId), 1),
                    gene: undefined,
                    whenExpressed: [],
                    assay: undefined,
                    evidence: undefined,
                    whereExpressed: []
                }],
                isLoading: state.isLoading,
                error: state.error
            };
        }
        case DELETE_EXPR_ANNOT: {
            return {
                ...state,
                annotations: state.annotations.filter(a => a.annotationId !== action.payload.annotationId),
                isLoading: state.isLoading,
                error: state.error
            };
        }
        case SET_GENE_EXPR_ANNOT: {
            return {
                ...state,
                annotations: state.annotations.every(a => {
                    if (a.annotationId === action.payload.annotationId) {
                        a.gene = action.payload.gene;
                        return false
                    } else {
                        return true
                    }
                }),
                isLoading: state.isLoading,
                error: state.error
            }
        }
        case ADD_WHEN_EXPRESSED_EXPR_ANNOT: {
            return {
                ...state,
                annotations: state.annotations.every(a => {
                    if (a.annotationId === action.payload.annotationId) {
                        a.whenExpressed = [...new Set([...a.whenExpressed, action.payload.whenExpressed])];
                        return false
                    } else {
                        return true
                    }
                }),
                isLoading: state.isLoading,
                error: state.error
            }
        }
        case REMOVE_WHEN_EXPRESSED_EXPR_ANNOT: {
            return {
                ...state,
                annotations: state.annotations.every(a => {
                    if (a.annotationId === action.payload.annotationId) {
                        let newWhenExpressed = new Set(a.whenExpressed);
                        newWhenExpressed.delete(action.payload.whenExpressed);
                        a.whenExpressed = [...newWhenExpressed];
                        return false
                    } else {
                        return true
                    }
                }),
                isLoading: state.isLoading,
                error: state.error
            }
        }
        case SET_ASSAY_EXPR_ANNOT: {
            return {
                ...state,
                annotations: state.annotations.every(a => {
                    if (a.annotationId === action.payload.annotationId) {
                        a.assay = action.payload.assay;
                        return false
                    } else {
                        return true
                    }
                }),
                isLoading: state.isLoading,
                error: state.error
            }
        }
        case SET_EVIDENCE_EXPR_ANNOT: {
            return {
                ...state,
                annotations: state.annotations.every(a => {
                    if (a.annotationId === action.payload.annotationId) {
                        a.evidence = action.payload.evidence;
                        return false
                    } else {
                        return true
                    }
                }),
                isLoading: state.isLoading,
                error: state.error
            }
        }
        case ADD_WHERE_EXPRESSED_EXPR_ANNOT: {
            return {
                ...state,
                annotations: state.annotations.every(a => {
                    if (a.annotationId === action.payload.annotationId) {
                        a.whereExpressed = [...new Set([...a.whereExpressed, action.payload.whereExpressed])];
                        return false
                    } else {
                        return true
                    }
                }),
                isLoading: state.isLoading,
                error: state.error
            }
        }
        case REMOVE_WHERE_EXPRESSED_EXPR_ANNOT: {
            return {
                ...state,
                annotations: state.annotations.every(a => {
                    if (a.annotationId === action.payload.annotationId) {
                        let newWhereExpressed = new Set(a.whereExpressed);
                        newWhereExpressed.delete(action.payload.whereExpressed);
                        a.whereExpressed = [...newWhereExpressed];
                        return false
                    } else {
                        return true
                    }
                }),
                isLoading: state.isLoading,
                error: state.error
            }
        }
        default:
            return state;
    }
}
