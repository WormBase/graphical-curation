export const anatomyFunctionAnnotationHasPhenotype = annotation => annotation.phenotype !== undefined && annotation.phenotype !== '';

export const anatomyFunctionAnnotationHasAnatomyTerms = annotation => annotation.anatomyTerms.length > 0

export const anatomyFunctionAnnotationHasAssay = annotation => annotation.assay !== '';

export const anatomyFunctionAnnotationIsValid = annotation => anatomyFunctionAnnotationHasPhenotype(annotation) &&
    anatomyFunctionAnnotationHasAnatomyTerms(annotation) && annotation.evidence !== undefined &&
    anatomyFunctionAnnotationHasAssay(annotation)