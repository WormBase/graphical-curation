export const expressionAnnotationHasObject = annotation =>
    annotation.whenExpressed.length > 0 || annotation.whereExpressed.length > 0;

export const expressionAnnotationHasSubject = annotation => annotation.gene !== undefined && annotation.gene !== '';

export const expressionAnnotationHasAssay = annotation => annotation.assay !== undefined && annotation.assay !== '';

export const expressionAnnotationIsValid = annotation =>
    expressionAnnotationHasSubject(annotation) && expressionAnnotationHasObject(annotation) &&
    expressionAnnotationHasAssay(annotation) && annotation.evidence !== undefined;

export const expressionAnnotationNtoN = annotation => annotation.whenExpressed.length > 1 && annotation.whereExpressed.length > 1;