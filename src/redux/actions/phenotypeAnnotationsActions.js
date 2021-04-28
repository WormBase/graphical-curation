export const SET_PHENOTYPE_ANNOTS = "SET_PHENOTYPE_ANNOTS";
export const SAVE_PHENOTYPE_TMP_ANNOT = "SAVE_PHENOTYPE_TMP_ANNOT";
export const SET_PHENOTYPE_TMP_ANNOT = "SET_PHENOTYPE_TMP_ANNOT";
export const RESET_PHENOTYPE_TMP_ANNOT = "RESET_PHENOTYPE_TMP_ANNOT";
export const DELETE_PHENOTYPE_ANNOT = "DELETE_PHENOTYPE_ANNOT";
export const SET_PHENOTYPE_TMP_ANNOT_PHENOTYPE = "SET_PHENOTYPE_TMP_ANNOT_PHENOTYPE";
export const SET_PHENOTYPE_TMP_ANNOT_ASSAY = "SET_PHENOTYPE_TMP_ANNOT_ASSAY";
export const SET_PHENOTYPE_TMP_ANNOT_ALLELES = "SET_PHENOTYPE_TMP_ANNOT_ALLELES";
export const SET_PHENOTYPE_TMP_ANNOT_GENES = "SET_PHENOTYPE_TMP_ANNOT_GENES";
export const SET_PHENOTYPE_TMP_ANNOT_TRANSGENES = "SET_PHENOTYPE_TMP_ANNOT_TRANSGENES";
export const SET_PHENOTYPE_TMP_ANNOT_ANATOMY_TERMS = "SET_PHENOTYPE_TMP_ANNOT_ANATOMY_TERMS";
export const SET_PHENOTYPE_TMP_ANNOT_LIFE_STAGES = "SET_PHENOTYPE_TMP_ANNOT_LIFE_STAGES";
export const SET_PHENOTYPE_TMP_ANNOT_STRAINS = "SET_PHENOTYPE_TMP_ANNOT_STRAINS";
export const SET_PHENOTYPE_TMP_ANNOT_PHENOTYPE_STATEMENT = "SET_PHENOTYPE_TMP_ANNOT_PHENOTYPE_STATEMENT";
export const SET_PHENOTYPE_TMP_ANNOT_EVIDENCE = "SET_PHENOTYPE_TMP_ANNOT_EVIDENCE";
export const SET_PHENOTYPE_TMP_ANNOT_NOT_OBSERVED = "SET_PHENOTYPE_TMP_ANNOT_NOT_OBSERVED";
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

export const setPhenotypeTmpAnnotationPhenotype = (phenotype) => ({
    type: SET_PHENOTYPE_TMP_ANNOT_PHENOTYPE,
    payload: {
        phenotype
    }
});

export const setPhenotypeTmpAnnotationAssay = (assay) => ({
    type: SET_PHENOTYPE_TMP_ANNOT_ASSAY,
    payload: {
        assay
    }
});

export const setPhenotypeTmpAnnotationNotObserved = (notObserved) => ({
    type: SET_PHENOTYPE_TMP_ANNOT_NOT_OBSERVED,
    payload: {
        notObserved
    }
});

export const setPhenotypeTmpAnnotationAlleles = (alleles) => ({
    type: SET_PHENOTYPE_TMP_ANNOT_ALLELES,
    payload: {
        alleles
    }
});

export const setPhenotypeTmpAnnotationGenes = (genes) => ({
    type: SET_PHENOTYPE_TMP_ANNOT_GENES,
    payload: {
        genes
    }
});

export const setPhenotypeTmpAnnotationTransgenes = (transgenes) => ({
    type: SET_PHENOTYPE_TMP_ANNOT_TRANSGENES,
    payload: {
        transgenes
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

export const setPhenotypeTmpAnnotationStrains = (strains) => ({
    type: SET_PHENOTYPE_TMP_ANNOT_STRAINS,
    payload: {
        strains
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