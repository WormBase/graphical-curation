export const SET_PHENOTYPE_ANNOTS = "SET_PHENOTYPE_ANNOTS";
export const SAVE_PHENOTYPE_TMP_ANNOT = "SAVE_PHENOTYPE_TMP_ANNOT";
export const SET_PHENOTYPE_TMP_ANNOT = "SET_PHENOTYPE_TMP_ANNOT";
export const RESET_PHENOTYPE_TMP_ANNOT = "RESET_PHENOTYPE_TMP_ANNOT";
export const DELETE_PHENOTYPE_ANNOT = "DELETE_PHENOTYPE_ANNOT";
export const SET_PHENOTYPE_TMP_ANNOT_OBJECT = "SET_PHENOTYPE_TMP_ANNOT_OBJECT";
export const SET_PHENOTYPE_TMP_ANNOT_PHENOTYPE_TERMS = "SET_PHENOTYPE_TMP_ANNOT_PHENOTYPE_TERMS";
export const SET_PHENOTYPE_TMP_ANNOT_ANATOMY_TERMS = "SET_PHENOTYPE_TMP_ANNOT_ANATOMY_TERMS";
export const SET_PHENOTYPE_TMP_ANNOT_LIFE_STAGES = "SET_PHENOTYPE_TMP_ANNOT_LIFE_STAGES";
export const SET_PHENOTYPE_TMP_ANNOT_PHENOTYPE_STATEMENT = "SET_PHENOTYPE_TMP_ANNOT_PHENOTYPE_STATEMENT";
export const SET_PHENOTYPE_TMP_ANNOT_EVIDENCE = "SET_PHENOTYPE_TMP_ANNOT_EVIDENCE";
export const DISMISS_SAVED_STATUS = "DISMISS_SAVED_STATUS";
export const DISMISS_WRONG_ANNOTATION = "DISMISS_WRONG_ANNOTATION";


export const setPhenotypeAnnotations = annotations => ({
   type: SET_PHENOTYPE_ANNOTS,
   payload: {
       annotations
   }
});

export const savePhenotypeTmpAnnotation = () => ({
    type: SAVE_PHENOTYPE_TMP_ANNOT
});

export const resetPhenotypeTmpAnnotation = () => ({
    type: RESET_PHENOTYPE_TMP_ANNOT
});

export const deletePhenotypeAnnotation = (annotationId) => ({
    type: DELETE_PHENOTYPE_ANNOT,
    payload: {
        annotationId
    }
});

export const setPhenotypeTmpAnnotation = (annotation) => ({
    type: SET_PHENOTYPE_TMP_ANNOT,
    payload: {
        annotation
    }
});

export const setPhenotypeTmpAnnotationObject = (object) => ({
    type: SET_PHENOTYPE_TMP_ANNOT_OBJECT,
    payload: {
        object
    }
});

export const setPhenotypeTmpAnnotationPhenotypeTerms = (phenotypeTerms) => ({
    type: SET_PHENOTYPE_TMP_ANNOT_PHENOTYPE_TERMS,
    payload: {
        phenotypeTerms
    }
});

export const setPhenotypeTmpAnnotationAnatomyTerms = (anatomyTerms) => ({
    type: SET_PHENOTYPE_TMP_ANNOT_ANATOMY_TERMS,
    payload: {
        anatomyTerms
    }
});

export const setPhenotypeTmpAnnotationLifeStages = (lifeStages) => ({
    type: SET_PHENOTYPE_TMP_ANNOT_LIFE_STAGES,
    payload: {
        lifeStages
    }
});

export const setPhenotypeTmpAnnotationPhenotypeStatement = (phenotypeStatement) => ({
    type: SET_PHENOTYPE_TMP_ANNOT_PHENOTYPE_STATEMENT,
    payload: {
        phenotypeStatement
    }
});

export const setPhenotypeTmpAnnotationEvidence = (evidence) => ({
    type: SET_PHENOTYPE_TMP_ANNOT_EVIDENCE,
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