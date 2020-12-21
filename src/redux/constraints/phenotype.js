export const phenotypeAnnotationHasObject = annotation => annotation.object !== undefined && annotation.object !== '';

export const phenotypeAnnotationHasPhenoTerms = annotation => annotation.phenotypeTerms.length > 0

export const phenotypeAnnotationHasAnatomyTerms = annotation => annotation.anatomyTerms.length > 0

export const phenotypeAnnotationHasLifeStages = annotation => annotation.lifeStages.length > 0

export const phenotypeAnnotationIsValid = annotation => phenotypeAnnotationHasObject(annotation) &&
    phenotypeAnnotationHasPhenoTerms(annotation) && (phenotypeAnnotationHasAnatomyTerms(annotation) ||
    phenotypeAnnotationHasLifeStages(annotation)) && annotation.evidence !== undefined

export function phenotypeAnnotationMissingFields(annotation) {
    let missingFields = [];
    if (!phenotypeAnnotationHasObject(annotation)) {
        missingFields.push("Variant");
    }
    if (!phenotypeAnnotationHasPhenoTerms(annotation)) {
        missingFields.push("At least one phenotype term");
    }
    if (!(phenotypeAnnotationHasAnatomyTerms(annotation) || phenotypeAnnotationHasLifeStages(annotation))) {
        missingFields.push("One or more anatomy term or life stage");
    }
    return missingFields;
}