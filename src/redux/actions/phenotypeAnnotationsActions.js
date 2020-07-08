export const SET_PHENOTYPE_ANNOTS = "SET_PHENOTYPE_ANNOTS";
export const ADD_PHENOTYPE_ANNOT = "ADD_PHENOTYPE_ANNOT";
export const DELETE_PHENOTYPE_ANNOT = "DELETE_PHENOTYPE_ANNOT";
export const MODIFY_PHENOTYPE_ANNOT = "MODIFY_PHENOTYPE_ANNOT";


export const setPhenotypeAnnotations = annotations => ({
   type: SET_PHENOTYPE_ANNOTS,
   payload: {
       annotations
   }
});

export const addPhenotypeAnnotation = (annotation) => ({
    type: ADD_PHENOTYPE_ANNOT,
    payload: {
        annotation
    }
});

export const deletePhenotypeAnnotation = (annotationId) => ({
    type: DELETE_PHENOTYPE_ANNOT,
    payload: {
        annotationId
    }
});

export const modifyPhenotypeAnnotation = (annotation) => ({
    type: MODIFY_PHENOTYPE_ANNOT,
    payload: {
        annotation
    }
});