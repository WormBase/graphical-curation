export const expressionAnnotationHasObject = annotation =>
    annotation.whenExpressed.length + annotation.whereExpressed.length + annotation.cellularComponent.length > 0;

export const expressionAnnotationHasSubject = annotation => annotation.gene !== undefined && annotation.gene !== '';

export const expressionAnnotationHasAssay = annotation => annotation.assay !== undefined && annotation.assay !== '';

export const expressionAnnotationIsValid = annotation =>
    expressionAnnotationHasSubject(annotation) && expressionAnnotationHasObject(annotation) &&
    expressionAnnotationHasAssay(annotation) && annotation.evidence !== undefined;

export function expressionAnnotationMissingFields(annotation) {
    let missingFields = [];
    if (!expressionAnnotationHasSubject(annotation)) {
        missingFields.push("Gene");
    }
    if (!expressionAnnotationHasObject(annotation)) {
        missingFields.push("One or more anatomy terms, life stages or cellular components");
    }
    if (!expressionAnnotationHasAssay(annotation)) {
        missingFields.push("Method");
    }
    return missingFields;
}

export const expressionAnnotationNtoN = annotation => annotation.whenExpressed.length > 1 && (annotation.whereExpressed.length + annotation.cellularComponent.length > 1);
