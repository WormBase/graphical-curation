export const SET_EXPR_ANNOTS = "SET_EXPR_ANNOTS";
export const SAVE_EXPR_TMP_ANNOT = "SAVE_EXPR_TMP_ANNOT";
export const SET_EXPR_TMP_ANNOT = "SET_EXPR_TMP_ANNOT";
export const RESET_EXPR_TMP_ANNOT = "RESET_EXPR_TMP_ANNOT";
export const DELETE_EXPR_ANNOT = "DELETE_EXPR_ANNOT";
export const SET_EXPR_TMP_ANNOT_GENE = "SET_EXPR_TMP_ANNOT_GENE";
export const SET_EXPR_TMP_ANNOT_WHEN_EXPRESSED = "SET_EXPR_TMP_ANNOT_WHEN_EXPRESSED";
export const SET_EXPR_TMP_ANNOT_WHERE_EXPRESSED = "SET_EXPR_TMP_ANNOT_WHERE_EXPRESSED";
export const SET_EXPR_TMP_ANNOT_CELLULAR_COMPONENTS = "SET_EXPR_TMP_ANNOT_CELLULAR_COMPONENTS";
export const SET_EXPR_TMP_ANNOT_ASSAY = "SET_EXPR_TMP_ANNOT_ASSAY";
export const SET_EXPR_TMP_ANNOT_EVIDENCE = "SET_EXPR_TMP_ANNOT_EVIDENCE";
export const DISMISS_SAVED_STATUS = "DISMISS_SAVED_STATUS";
export const DISMISS_WRONG_ANNOTATION = "DISMISS_WRONG_ANNOTATION";


export const setExpressionAnnotations = annotations => ({
   type: SET_EXPR_ANNOTS,
   payload: {
       annotations
   }
});

export const saveExpressionTmpAnnotation = () => ({
    type: SAVE_EXPR_TMP_ANNOT
});

export const resetExpressionTmpAnnotation = () => ({
    type: RESET_EXPR_TMP_ANNOT
});

export const deleteExpressionAnnotation = (annotationId) => ({
    type: DELETE_EXPR_ANNOT,
    payload: {
        annotationId
    }
});

export const setExpressionTmpAnnotation = (annotation) => ({
    type: SET_EXPR_TMP_ANNOT,
    payload: {
        annotation
    }
});

export const setExpressionTmpAnnotationGene = (gene) => ({
    type: SET_EXPR_TMP_ANNOT_GENE,
    payload: {
        gene
    }
});

export const setExpressionTmpAnnotationWhenExpressed = (whenExpressed) => ({
    type: SET_EXPR_TMP_ANNOT_WHEN_EXPRESSED,
    payload: {
        whenExpressed
    }
});

export const setExpressionTmpAnnotationWhereExpressed = (whereExpressed) => ({
    type: SET_EXPR_TMP_ANNOT_WHERE_EXPRESSED,
    payload: {
        whereExpressed
    }
});

export const setExpressionTmpAnnotationCellularComponents = (cellularComponents) => ({
    type: SET_EXPR_TMP_ANNOT_CELLULAR_COMPONENTS,
    payload: {
        cellularComponents
    }
});

export const setExpressionTmpAnnotationAssay = (assay) => ({
    type: SET_EXPR_TMP_ANNOT_ASSAY,
    payload: {
        assay
    }
});

export const setExpressionTmpAnnotationEvidence = (evidence) => ({
    type: SET_EXPR_TMP_ANNOT_EVIDENCE,
    payload: {
        evidence
    }
});

export const dismissSavedStatus = () => ({
    type: DISMISS_SAVED_STATUS
});

export const dismissWrongAnnotation = () => ({
    type: DISMISS_WRONG_ANNOTATION
});