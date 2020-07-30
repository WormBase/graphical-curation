export const anatomyFunctionAnnotationHasPhenotype = annotation => annotation.phenotype !== undefined && annotation.phenotype !== '';

export const anatomyFunctionAnnotationHasGenes = annotation => annotation.genes.length > 0;

export const anatomyFunctionAnnotationHasAnatomyTerms = annotation => annotation.anatomyTerms.length > 0

export const anatomyFunctionAnnotationHasAssay = annotation => annotation.assay !== '';

export const anatomyFunctionAnnotationIsValid = annotation => anatomyFunctionAnnotationHasPhenotype(annotation) &&
    anatomyFunctionAnnotationHasGenes(annotation) && anatomyFunctionAnnotationHasAnatomyTerms(annotation) &&
    annotation.evidence !== undefined && anatomyFunctionAnnotationHasAssay(annotation)