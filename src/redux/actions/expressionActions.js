export const ADD_EXPR_ANNOT = "ADD_EXPR_ANNOT";
export const DELETE_EXPR_ANNOT = "DELETE_EXPR_ANNOT";
export const SET_GENE_EXPR_ANNOT = "SET_GENE_EXPR_ANNOT";
export const ADD_WHEN_EXPRESSED_EXPR_ANNOT = "ADD_WHEN_EXPRESSED_EXPR_ANNOT";
export const REMOVE_WHEN_EXPRESSED_EXPR_ANNOT = "REMOVE_WHEN_EXPRESSED_EXPR_ANNOT";
export const SET_ASSAY_EXPR_ANNOT = "SET_ASSAY_EXPR_ANNOT";
export const SET_EVIDENCE_EXPR_ANNOT = "SET_EVIDENCE_EXPR_ANNOT";
export const ADD_WHERE_EXPRESSED_EXPR_ANNOT = "ADD_WHERE_EXPRESSED_EXPR_ANNOT";
export const REMOVE_WHERE_EXPRESSED_EXPR_ANNOT = "REMOVE_WHERE_EXPRESSED_EXPR_ANNOT";


export const addExpressionAnnotation = () => ({
    type: ADD_EXPR_ANNOT,
    payload: {}
});

export const deleteExpressionAnnotation = (annotationId) => ({
    type: DELETE_EXPR_ANNOT,
    payload: annotationId
});

export const setGeneInExpressionAnnotation = (annotationId, gene) => ({
    type: SET_GENE_EXPR_ANNOT,
    payload: {
        annotationId: annotationId,
        gene: gene
    }
});

export const addWhenExpressedToExpressionAnnotation = (annotationId, whenExpressed) => ({
    type: ADD_WHEN_EXPRESSED_EXPR_ANNOT,
    payload: {
        annotationId: annotationId,
        whenExpressed: whenExpressed
    }
});

export const setSiteOfAction = (checked, details) => ({
    type: SET_SITE_OF_ACTION,
    payload: {
        checked: checked,
        details: details
    }
});

export const toggleSiteOfAction = () => ({
    type: TOGGLE_SITE_OF_ACTION,
    payload: {}
});

export const setTimeOfAction = (checked, details) => ({
    type: SET_TIME_OF_ACTION,
    payload: {
        checked: checked,
        details: details
    }
});

export const toggleTimeOfAction = () => ({
    type: TOGGLE_TIME_OF_ACTION,
    payload: {}
});

export const setRnaseq = (checked, details) => ({
    type: SET_RNASEQ,
    payload: {
        checked: checked,
        details: details
    }
});

export const toggleRnaseq = () => ({
    type: TOGGLE_RNASEQ,
    payload: {}
});

export const setAdditionalExpr = details => ({
    type: SET_ADDITIONAL_EXPR,
    payload: {
        details
    }
});

export const setIsExpressionSavedToDB = () => ({
    type: SET_IS_EXPRESSION_SAVED_TO_DB,
    payload: {}
});