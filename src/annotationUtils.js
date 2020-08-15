export const createAnatomyFunctionAnnotation = (phenotype = '', gene = '', anatomyTerms = [],
                                                assay = '', remarks = [], noctuamodels = [],
                                                genotypes = [], authorstatements = [],
                                                evidence = '') => {
    return {
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
    }
}

export const createExpressionAnnotation = (gene = '', whenExpressed = [], whereExpressed = [],
                                           cellularComponents = [], assay = '',
                                           evidence = '') => {
    return {
        gene: gene,
        whenExpressed: whenExpressed,
        whereExpressed: whereExpressed,
        cellularComponent: cellularComponents,
        assay: assay,
        evidence: evidence,
    }
}

export const createPhenotypeAnnotation = (object = '', phenotypeTerms = [], anatomyTerms = [],
                                          lifeStages = [], phenotypeStatement = '',
                                          evidence = '') => {
    return {
        object: object,
        phenotypeTerms: phenotypeTerms,
        anatomyTerms: anatomyTerms,
        lifeStages: lifeStages,
        phenotypeStatement: phenotypeStatement,
        evidence: evidence
    }
}