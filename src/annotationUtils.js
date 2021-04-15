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

export const createPhenotypeAnnotation = (phenotype = '', assay = 'RNAi', alleles = [],
                                          genes = [], transgenes = [], anatomyTerms = [],
                                          lifeStages = [], notObserved = false, phenotypeStatement = '',
                                          evidence = '') => {
    return {
        annotationId: uuid.v4(),
        phenotype: phenotype,
        assay: assay,
        alleles: alleles,
        genes: genes,
        transgenes: transgenes,
        anatomyTerms: anatomyTerms,
        lifeStages: lifeStages,
        notObserved: notObserved,
        phenotypeStatement: phenotypeStatement,
        evidence: evidence,
        dateAssigned: Date.now(),
    }
}