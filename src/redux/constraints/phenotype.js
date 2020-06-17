export const phenotypeAnnotationHasObject = annotation => annotation.object !== undefined && annotation.object !== '';

export const phenotypeAnnotationHasPhenoTerms = annotation => annotation.phenotypeTerms.length > 0

export const phenotypeAnnotationHasAnatomyTerms = annotation => annotation.anatomyTerms.length > 0

export const phenotypeAnnotationHasLifeStages = annotation => annotation.lifeStages.length > 0

export const phenotypeAnnotationIsValid = annotation => phenotypeAnnotationHasObject(annotation) &&
    phenotypeAnnotationHasPhenoTerms(annotation) && (phenotypeAnnotationHasAnatomyTerms(annotation) ||
    phenotypeAnnotationHasLifeStages(annotation)) && annotation.evidence !== undefined