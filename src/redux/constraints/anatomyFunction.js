export const anatomyFunctionAnnotationHasPhenotype = annotation => annotation.phenotype !== undefined && annotation.phenotype !== '';

export const anatomyFunctionAnnotationHasGene = annotation => annotation.gene !== undefined && annotation.gene !== '';

export const phenotypeAnnotationHasAnatomyTerms = annotation => annotation.anatomyTerms.length > 0

export const phenotypeAnnotationHasLifeStages = annotation => annotation.lifeStages.length > 0

export const phenotypeAnnotationIsValid = annotation => phenotypeAnnotationHasObject(annotation) &&
    phenotypeAnnotationHasPhenoTerms(annotation) && (phenotypeAnnotationHasAnatomyTerms(annotation) ||
    phenotypeAnnotationHasLifeStages(annotation)) && annotation.evidence !== undefined