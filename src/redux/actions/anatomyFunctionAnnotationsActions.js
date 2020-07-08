export const SET_ANATOMYFUNCTION_ANNOTS = "SET_ANATOMYFUNCTION_ANNOTS";
export const ADD_ANATOMYFUNCTION_ANNOT = "ADD_ANATOMYFUNCTION_ANNOT";
export const DELETE_ANATOMYFUNCTION_ANNOT = "DELETE_ANATOMYFUNCTION_ANNOT";
export const MODIFY_ANATOMYFUNCTION_ANNOT = "MODIFY_ANATOMYFUNCTION_ANNOT";

export const setAnatomyFunctionAnnotations = annotations => ({
   type: SET_ANATOMYFUNCTION_ANNOTS,
   payload: {
       annotations
   }
});

export const addAnatomyFunctionAnnotation = (annotation) => ({
    type: ADD_ANATOMYFUNCTION_ANNOT,
    payload: {
        annotation
    }
});

export const deleteAnatomyFunctionAnnotation = (annotationId) => ({
    type: DELETE_ANATOMYFUNCTION_ANNOT,
    payload: {
        annotationId
    }
});

export const modifyAnatomyFunctionAnnotation = (annotation) => ({
    type: MODIFY_ANATOMYFUNCTION_ANNOT,
    payload: {
        annotation
    }
});