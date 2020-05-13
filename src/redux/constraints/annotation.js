export const expressionAnnotationHasObject = annotation =>
    annotation.whenExpressed.length + annotation.whereExpressed.length + annotation.cellularComponent.length > 0;

export const expressionAnnotationHasSubject = annotation => annotation.gene !== undefined && annotation.gene !== '';

export const expressionAnnotationHasAssay = annotation => annotation.assay !== undefined && annotation.assay !== '';

export const expressionAnnotationIsValid = annotation =>
    expressionAnnotationHasSubject(annotation) && expressionAnnotationHasObject(annotation) &&
    expressionAnnotationHasAssay(annotation) && annotation.evidence !== undefined;

export const expressionAnnotationNtoN = annotation => annotation.whenExpressed.length > 1 && (annotation.whereExpressed.length + annotation.cellularComponent.length > 1);

export const phenotypeAnnotationHasObject = annotation => annotation.object !== undefined && annotation.object !== '';

export const phenotypeAnnotationHasPhenoTerms = annotation => annotation.phenotypeTerms.length > 0

export const phenotypeAnnotationHasAnatomyTerms = annotation => annotation.anatomyTerms.length > 0

export const phenotypeAnnotationHasLifeStages = annotation => annotation.lifeStages.length > 0

export const phenotypeAnnotationIsValid = annotation => phenotypeAnnotationHasObject(annotation) &&
    phenotypeAnnotationHasPhenoTerms(annotation) && (phenotypeAnnotationHasAnatomyTerms(annotation) ||
    phenotypeAnnotationHasLifeStages(annotation)) && annotation.evidence !== undefined