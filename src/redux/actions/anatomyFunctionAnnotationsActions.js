export const SET_ANATOMYFUNCTION_ANNOTS = "SET_ANATOMYFUNCTION_ANNOTS";
export const SAVE_ANATOMYFUNCTION_TMP_ANNOT = "SAVE_ANATOMYFUNCTION_TMP_ANNOT";
export const DELETE_ANATOMYFUNCTION_ANNOT = "DELETE_ANATOMYFUNCTION_ANNOT";
export const RESET_ANATOMYFUNCTION_TMP_ANNOT = "RESET_ANATOMYFUNCTION_TMP_ANNOT";
export const SET_ANATOMYFUNCTION_TMP_ANNOT_PHENOTYPE = "SET_ANATOMYFUNCTION_TMP_ANNOT_PHENOTYPE";
export const SET_ANATOMYFUNCTION_TMP_ANNOT_GENE = "SET_ANATOMYFUNCTION_TMP_ANNOT_GENE";
export const SET_ANATOMYFUNCTION_TMP_ANNOT_ANATOMY_TERMS = "SET_ANATOMYFUNCTION_TMP_ANNOT_ANATOMY_TERMS";
export const SET_ANATOMYFUNCTION_TMP_ANNOT_INVOLVED = "SET_ANATOMYFUNCTION_TMP_ANNOT_INVOLVED";
export const SET_ANATOMYFUNCTION_TMP_ANNOT_REMARKS = "SET_ANATOMYFUNCTION_TMP_ANNOT_REMARKS";
export const SET_ANATOMYFUNCTION_TMP_ANNOT_NOCTUAMODELS = "SET_ANATOMYFUNCTION_TMP_ANNOT_NOCTUAMODELS";
export const SET_ANATOMYFUNCTION_TMP_ANNOT_GENOTYPES = "SET_ANATOMYFUNCTION_TMP_ANNOT_GENOTYPES";
export const SET_ANATOMYFUNCTION_TMP_ANNOT_AUTHORSTATEMENTS = "SET_ANATOMYFUNCTION_TMP_ANNOT_AUTHORSTATEMENTS";
export const SET_ANATOMYFUNCTION_TMP_ANNOT_ASSAY = "SET_ANATOMYFUNCTION_TMP_ANNOT_ASSAY";
export const SET_ANATOMYFUNCTION_TMP_ANNOT_EVIDENCE = "SET_ANATOMYFUNCTION_TMP_ANNOT_EVIDENCE";
export const DISMISS_SAVED_STATUS = "DISMISS_SAVED_STATUS";
export const DISMISS_WRONG_ANNOTATION = "DISMISS_WRONG_ANNOTATION";
export const SET_ANATOMYFUNCTION_TMP_ANNOT = "SET_ANATOMYFUNCTION_TMP_ANNOT"



export const setAnatomyFunctionAnnotations = annotations => ({
   type: SET_ANATOMYFUNCTION_ANNOTS,
   payload: {
       annotations
   }
});

export const saveAnatomyFunctionTmpAnnotation = () => ({
    type: SAVE_ANATOMYFUNCTION_TMP_ANNOT
});

export const deleteAnatomyFunctionAnnotation = (annotationId) => ({
    type: DELETE_ANATOMYFUNCTION_ANNOT,
    payload: {
        annotationId
    }
});

export const setAnatomyFunctionTmpAnnotation = (annotation) => ({
    type: SET_ANATOMYFUNCTION_TMP_ANNOT,
    payload: {
        annotation
    }
});

export const resetAnatomyFunctionTmpAnnotation = () => ({
    type: RESET_ANATOMYFUNCTION_TMP_ANNOT
});

export const setAnatomyFunctionTmpAnnotationPhenotype = (phenotype) => ({
    type: SET_ANATOMYFUNCTION_TMP_ANNOT_PHENOTYPE,
    payload: {
        phenotype
    }
});

export const setAnatomyFunctionTmpAnnotationGene = (gene) => ({
    type: SET_ANATOMYFUNCTION_TMP_ANNOT_GENE,
    payload: {
        gene
    }
});

export const setAnatomyFunctionTmpAnnotationAnatomyTerms = (anatomyTerms) => ({
    type: SET_ANATOMYFUNCTION_TMP_ANNOT_ANATOMY_TERMS,
    payload: {
        anatomyTerms
    }
});

export const setAnatomyFunctionTmpAnnotationInvolved = (involved) => ({
    type: SET_ANATOMYFUNCTION_TMP_ANNOT_INVOLVED,
    payload: {
        involved
    }
});

export const setAnatomyFunctionTmpAnnotationRemarks = (remarks) => ({
    type: SET_ANATOMYFUNCTION_TMP_ANNOT_REMARKS,
    payload: {
        remarks
    }
});

export const setAnatomyFunctionTmpAnnotationNoctuaModels = (noctuaModels) => ({
    type: SET_ANATOMYFUNCTION_TMP_ANNOT_NOCTUAMODELS,
    payload: {
        noctuaModels
    }
});

export const setAnatomyFunctionTmpAnnotationGenotypes = (genotypes) => ({
    type: SET_ANATOMYFUNCTION_TMP_ANNOT_GENOTYPES,
    payload: {
        genotypes
    }
});

export const setAnatomyFunctionTmpAnnotationAuthorStatements = (authorStatements) => ({
    type: SET_ANATOMYFUNCTION_TMP_ANNOT_AUTHORSTATEMENTS,
    payload: {
        authorStatements
    }
});

export const setAnatomyFunctionTmpAnnotationAssay = (assay) => ({
    type: SET_ANATOMYFUNCTION_TMP_ANNOT_ASSAY,
    payload: {
        assay
    }
});

export const setAnatomyFunctionTmpAnnotationEvidence = (evidence) => ({
    type: SET_ANATOMYFUNCTION_TMP_ANNOT_EVIDENCE,
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