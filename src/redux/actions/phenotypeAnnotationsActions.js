export const SET_PHENOTYPE_ANNOTS = "SET_PHENOTYPE_ANNOTS";
export const ADD_PHENOTYPE_ANNOT = "ADD_PHENOTYPE_ANNOT";
export const DELETE_PHENOTYPE_ANNOT = "DELETE_PHENOTYPE_ANNOT";
export const SET_OBJECT_PHENOTYPE_ANNOT = "SET_OBJECT_PHENOTYPE_ANNOT";
export const ADD_PHENOTYPE_TERM_PHENOTYPE_ANNOT = "ADD_PHENOTYPE_TERM_PHENOTYPE_ANNOT";
export const REMOVE_PHENOTYPE_TERM_PHENOTYPE_ANNOT = "REMOVE_PHENOTYPE_TERM_PHENOTYPE_ANNOT";
export const SET_EVIDENCE_PHENOTYPE_ANNOT = "SET_EVIDENCE_PHENOTYPE_ANNOT";
export const ADD_ANATOMY_TERM_PHENOTYPE_ANNOT = "ADD_ANATOMY_TERM_PHENOTYPE_ANNOT";
export const REMOVE_ANATOMY_TERM_PHENOTYPE_ANNOT = "REMOVE_ANATOMY_TERM_PHENOTYPE_ANNOT";
export const ADD_LIFE_STAGE_PHENOTYPE_ANNOT = "ADD_LIFE_STAGE_PHENOTYPE_ANNOT";
export const REMOVE_LIFE_STAGE_PHENOTYPE_ANNOT = "REMOVE_LIFE_STAGE_PHENOTYPE_ANNOT";


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

export const setObjectInPhenotypeAnnotation = (annotationId, object) => ({
    type: SET_OBJECT_PHENOTYPE_ANNOT,
    payload: {
        annotationId: annotationId,
        object: object
    }
});

export const addPhenotypeTermToPhenotypeAnnotation = (annotationId, phenotypeTerm) => ({
    type: ADD_PHENOTYPE_TERM_PHENOTYPE_ANNOT,
    payload: {
        annotationId: annotationId,
        whenExpressed: phenotypeTerm
    }
});

export const removePhenotypeTermToPhenotypeAnnotation = (annotationId, phenotypeTerm) => ({
    type: REMOVE_PHENOTYPE_TERM_PHENOTYPE_ANNOT,
    payload: {
        annotationId: annotationId,
        phenotypeTerm: phenotypeTerm
    }
});

export const addAnatomyTermToPhenotypeAnnotation = (annotationId, anatomyTerm) => ({
    type: ADD_ANATOMY_TERM_PHENOTYPE_ANNOT,
    payload: {
        annotationId: annotationId,
        whenExpressed: anatomyTerm
    }
});

export const removeAnatomyTermToPhenotypeAnnotation = (annotationId, anatomyTerm) => ({
    type: REMOVE_ANATOMY_TERM_PHENOTYPE_ANNOT,
    payload: {
        annotationId: annotationId,
        phenotypeTerm: anatomyTerm
    }
});

export const addLifeStageToPhenotypeAnnotation = (annotationId, LifeStage) => ({
    type: ADD_LIFE_STAGE_PHENOTYPE_ANNOT,
    payload: {
        annotationId: annotationId,
        whenExpressed: LifeStage
    }
});

export const removeLifeStageToPhenotypeAnnotation = (annotationId, LifeStage) => ({
    type: REMOVE_LIFE_STAGE_PHENOTYPE_ANNOT,
    payload: {
        annotationId: annotationId,
        phenotypeTerm: LifeStage
    }
});

export const setEvidencePhenotypeAnnotation = (annotationId, evidence) => ({
    type: SET_EVIDENCE_PHENOTYPE_ANNOT,
    payload: {
        annotationId: annotationId,
        evidence: evidence
    }
});