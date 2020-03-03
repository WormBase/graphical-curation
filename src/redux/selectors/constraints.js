export const expressionAnnotationHasObject = annotation =>
    annotation.whenExpressed.length > 0 || annotation.whereExpressed.length > 0;

export const expressionAnnotationHasSubject = annotation => annotation.gene !== undefined;

export const expressionAnnotationIsValid = annotation =>
    expressionAnnotationHasSubject(annotation) && expressionAnnotationHasObject(annotation) &&
    annotation.assay !== undefined && annotation.evidence !== undefined;