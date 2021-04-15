export const phenotypeAnnotationHasPhenotype = annotation => annotation.phenotype !== undefined && annotation.phenotype !== '';

export const phenotypeAnnotationHasAssay = annotation => annotation.assay !== undefined && annotation.assay !== '';

export const phenotypeAnnotationHasAlleles = annotation => annotation.alleles.length > 0;

export const phenotypeAnnotationHasGenes = annotation => annotation.genes.length > 0;

export const phenotypeAnnotationHasTransgenes = annotation => annotation.transgenes.length > 0;

export const phenotypeAnnotationHasAnatomyTerms = annotation => annotation.anatomyTerms.length > 0;

export const phenotypeAnnotationHasLifeStages = annotation => annotation.lifeStages.length > 0;

export const phenotypeAnnotationHasValidAssayOptions = annotation => {
    if (annotation.assay === 'RNAi' || annotation.assay === 'Other' || annotation.assay === 'Overexpression') {
        if (!phenotypeAnnotationHasGenes(annotation)) {
            return false;
        }
    }
    if (annotation.assay === 'Overexpression') {
        if (!phenotypeAnnotationHasTransgenes(annotation)) {
            return false;
        }
    }
    if (!phenotypeAnnotationHasAlleles(annotation) && !phenotypeAnnotationHasGenes(annotation)) {
        return false;
    }
    return true;
}

export const phenotypeAnnotationIsValid = annotation => phenotypeAnnotationHasPhenotype(annotation) &&
    phenotypeAnnotationHasAssay(annotation) && phenotypeAnnotationHasValidAssayOptions(annotation) &&
    annotation.evidence !== undefined

export function phenotypeAnnotationMissingFields(annotation) {
    let missingFields = [];
    if (!phenotypeAnnotationHasPhenotype(annotation)) {
        missingFields.push("Phenotype");
    }
    if (annotation.assay === 'RNAi' || annotation.assay === 'Other' || annotation.assay === 'Overexpression') {
        if (!phenotypeAnnotationHasGenes(annotation)) {
            missingFields.push("One or more genes, required by the selected assay")
        }
    } else {
        if (!phenotypeAnnotationHasGenes(annotation) && !phenotypeAnnotationHasAlleles(annotation)) {
            missingFields.push("At least an allele or a gene");
        }
    }
    if (annotation.assay === 'Overexpression') {
        if (!phenotypeAnnotationHasTransgenes(annotation)) {
            missingFields.push("One or more transgenes, required by the selected assay")
        }
    }
    return missingFields;
}