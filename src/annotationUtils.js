import * as uuid from 'uuid';

export const createAnatomyFunctionAnnotation = (phenotype = '', gene = '', anatomyTerms = [],
                                                assay = '', remarks = [], noctuamodels = [],
                                                genotypes = [], authorstatements = [],
                                                evidence = '') => {
    return {
        annotationId: uuid.v4(),
        phenotype: phenotype,
        gene: gene,
        anatomyTerms: anatomyTerms,
        involved: 'involved',
        assay: assay,
        remarks: remarks,
        noctuamodels: noctuamodels,
        genotypes: genotypes,
        authorstatements: authorstatements,
        evidence: evidence,
        dateAssigned: Date.now(),
    }
}

export const createExpressionAnnotation = (gene = '', whenExpressed = [], whereExpressed = [],
                                           cellularComponents = [], assay = '',
                                           evidence = '') => {
    return {
        annotationId: uuid.v4(),
        gene: gene,
        whenExpressed: whenExpressed,
        whereExpressed: whereExpressed,
        cellularComponent: cellularComponents,
        assay: assay,
        evidence: evidence,
        dateAssigned: Date.now(),
    }
}

export const createPhenotypeAnnotation = (object = '', phenotypeTerms = [], anatomyTerms = [],
                                          lifeStages = [], phenotypeStatement = '',
                                          evidence = '') => {
    return {
        annotationId: uuid.v4(),
        object: object,
        phenotypeTerms: phenotypeTerms,
        anatomyTerms: anatomyTerms,
        lifeStages: lifeStages,
        phenotypeStatement: phenotypeStatement,
        evidence: evidence,
        dateAssigned: Date.now(),
    }
}