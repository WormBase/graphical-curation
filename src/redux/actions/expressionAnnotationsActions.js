export const SET_EXPR_ANNOTS = "SET_EXPR_ANNOTS";
export const ADD_EXPR_ANNOT = "ADD_EXPR_ANNOT";
export const DELETE_EXPR_ANNOT = "DELETE_EXPR_ANNOT";
export const MODIFY_EXPR_ANNOT = "MODIFY_EXPR_ANNOT";


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

export const modifyExpressionAnnotation = (annotation) => ({
    type: MODIFY_EXPR_ANNOT,
    payload: {
        annotation
    }
});