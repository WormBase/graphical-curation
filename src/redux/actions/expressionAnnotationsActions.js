export const SET_EXPR_ANNOTS = "SET_EXPR_ANNOTS";
export const ADD_EXPR_ANNOT = "ADD_EXPR_ANNOT";
export const DELETE_EXPR_ANNOT = "DELETE_EXPR_ANNOT";
export const SET_GENE_EXPR_ANNOT = "SET_GENE_EXPR_ANNOT";
export const ADD_WHEN_EXPRESSED_EXPR_ANNOT = "ADD_WHEN_EXPRESSED_EXPR_ANNOT";
export const REMOVE_WHEN_EXPRESSED_EXPR_ANNOT = "REMOVE_WHEN_EXPRESSED_EXPR_ANNOT";
export const SET_ASSAY_EXPR_ANNOT = "SET_ASSAY_EXPR_ANNOT";
export const SET_EVIDENCE_EXPR_ANNOT = "SET_EVIDENCE_EXPR_ANNOT";
export const ADD_WHERE_EXPRESSED_EXPR_ANNOT = "ADD_WHERE_EXPRESSED_EXPR_ANNOT";
export const REMOVE_WHERE_EXPRESSED_EXPR_ANNOT = "REMOVE_WHERE_EXPRESSED_EXPR_ANNOT";
export const ADD_CC_EXPR_ANNOT = "ADD_WHERE_EXPRESSED_EXPR_ANNOT";
export const REMOVE_CC_EXPR_ANNOT = "REMOVE_WHERE_EXPRESSED_EXPR_ANNOT";


export const setExpressionAnnotations = annotations => ({
   type: SET_EXPR_ANNOTS,
   payload: {
       annotations
   }
});

export const addExpressionAnnotation = (annotation) => ({
    type: ADD_EXPR_ANNOT,
    payload: {
        annotation
    }
});

export const deleteExpressionAnnotation = (annotationId) => ({
    type: DELETE_EXPR_ANNOT,
    payload: {
        annotationId
    }
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

export const removeWhenExpressedToExpressionAnnotation = (annotationId, whenExpressed) => ({
    type: REMOVE_WHEN_EXPRESSED_EXPR_ANNOT,
    payload: {
        annotationId: annotationId,
        whenExpressed: whenExpressed
    }
});

export const setAssayInExpressionAnnotation = (annotationId, assay) => ({
    type: SET_ASSAY_EXPR_ANNOT,
    payload: {
        annotationId: annotationId,
        gene: assay
    }
});

export const setEvidenceInExpressionAnnotation = (annotationId, evidence) => ({
    type: SET_EVIDENCE_EXPR_ANNOT,
    payload: {
        annotationId: annotationId,
        gene: evidence
    }
});

export const addWhereExpressedToExpressionAnnotation = (annotationId, whereExpressed) => ({
    type: ADD_WHERE_EXPRESSED_EXPR_ANNOT,
    payload: {
        annotationId: annotationId,
        whereExpressed: whereExpressed
    }
});

export const removeWhereExpressedToExpressionAnnotation = (annotationId, whereExpressed) => ({
    type: REMOVE_WHERE_EXPRESSED_EXPR_ANNOT,
    payload: {
        annotationId: annotationId,
        whereExpressed: whereExpressed
    }
});

export const addCCToExpressionAnnotation = (annotationId, cellularComponent) => ({
    type: ADD_CC_EXPR_ANNOT,
    payload: {
        annotationId: annotationId,
        cellularComponent: cellularComponent
    }
});

export const removeCCToExpressionAnnotation = (annotationId, cellularComponent) => ({
    type: REMOVE_CC_EXPR_ANNOT,
    payload: {
        annotationId: annotationId,
        cellularComponent: cellularComponent
    }
});