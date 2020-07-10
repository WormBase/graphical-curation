export const anatomyFunctionAnnotationHasPhenotype = annotation => annotation.phenotype !== undefined && annotation.phenotype !== '';

export const anatomyFunctionAnnotationHasGene = annotation => annotation.gene !== undefined && annotation.gene !== '';

export const anatomyFunctionAnnotationHasAnatomyTerms = annotation => annotation.anatomyTerms.length > 0

export const anatomyFunctionAnnotationIsValid = annotation => anatomyFunctionAnnotationHasPhenotype(annotation) &&
    anatomyFunctionAnnotationHasGene(annotation) && anatomyFunctionAnnotationHasAnatomyTerms(annotation) && annotation.evidence !== undefined