import {createReducer} from '@reduxjs/toolkit'

const initialState = {
    annotations: []
};

function annotationExists(annotation, storedAnnotations) {
    return storedAnnotations.some(a => {
        return annotation.object === a.object && arraysContainSameElements(annotation.phenoTerms, a.phenoTerms)
    })
}

const arraysContainSameElements = (array1, array2) => array1.sort().join(',') === array2.sort().join(',');

export const phenotypeAnnotations = createReducer(initialState, {
    SET_PHENOTYPE_ANNOTS: (state, action) => {
        if (action.payload.annotations !== undefined) {
            state.annotations = action.payload.annotations
        }
    },
    ADD_PHENOTYPE_ANNOT: (state, action) => {
        let newAnnotation = {
            annotationId: Math.max(...state.annotations.map(a => a.annotationId), 0) + 1,
            object: action.payload.annotation.object,
            phenotypeTerms: action.payload.annotation.phenotypeTerms,
            anatomyTerms: action.payload.annotation.anatomyTerms,
            lifeStages: action.payload.annotation.lifeStages,
            geneticEntity: action.payload.annotation.object,
            evidence: action.payload.annotation.evidence,
            phenotypeStatement: action.payload.annotation.phenotypeStatement,
            dateAssigned: Date.now()
        };
        if (!annotationExists(newAnnotation, state.annotations)) {
            state.annotations.push(newAnnotation);
        }
    },
    DELETE_PHENOTYPE_ANNOT: (state, action) => {
        state.annotations = state.annotations.filter(a => a.annotationId !== action.payload.annotationId)
    },
    SET_OBJECT_PHENOTYPE_ANNOT: (state, action) => {
        state.annotations.every(a => {
            if (a.annotationId === action.payload.annotationId) {
                a.object = action.payload.object;
                return false
            } else {
                return true
            }
        })
    },
    ADD_PHENOTYPE_TERM_PHENOTYPE_ANNOT: (state, action) => {
        state.annotations.every(a => {
            if (a.annotationId === action.payload.annotationId) {
                a.phenotypeTerms = [...new Set([...a.phenotypeTerms, action.payload.phenotypeTerm])];
                return false
            } else {
                return true
            }
        })
    },
    REMOVE_PHENOTYPE_TERM_PHENOTYPE_ANNOT: (state, action) => {
        state.annotations.every(a => {
            if (a.annotationId === action.payload.annotationId) {
                let newPhenotypeTerms = new Set(a.phenotypeTerms);
                newPhenotypeTerms.delete(action.payload.phenotypeTerm);
                a.phenotypeTerms = [...newPhenotypeTerms];
                return false
            } else {
                return true
            }
        })
    },
    ADD_ANATOMY_TERM_PHENOTYPE_ANNOT: (state, action) => {
        state.annotations.every(a => {
            if (a.annotationId === action.payload.annotationId) {
                a.anatomyTerms = [...new Set([...a.anatomyTerms, action.payload.anatomyTerm])];
                return false
            } else {
                return true
            }
        })
    },
    REMOVE_ANATOMY_TERM_PHENOTYPE_ANNOT: (state, action) => {
        state.annotations.every(a => {
            if (a.annotationId === action.payload.annotationId) {
                let newAnatomyTerms = new Set(a.anatomyTerms);
                newAnatomyTerms.delete(action.payload.anatomyTerm);
                a.anatomyTerms = [...newAnatomyTerms];
                return false
            } else {
                return true
            }
        })
    },
    ADD_LIFE_STAGE_PHENOTYPE_ANNOT: (state, action) => {
        state.annotations.every(a => {
            if (a.annotationId === action.payload.annotationId) {
                a.lifeStages = [...new Set([...a.lifeStages, action.payload.lifeStage])];
                return false
            } else {
                return true
            }
        })
    },
    REMOVE_LIFE_STAGE_PHENOTYPE_ANNOT: (state, action) => {
        state.annotations.every(a => {
            if (a.annotationId === action.payload.annotationId) {
                let newLifeStages = new Set(a.lifeStages);
                newLifeStages.delete(action.payload.lifeStage);
                a.lifeStages = [...newLifeStages];
                return false
            } else {
                return true
            }
        })
    },
    SET_EVIDENCE_PHENOTYPE_ANNOT: (state, action) => {
        state.annotations.every(a => {
            if (a.annotationId === action.payload.annotationId) {
                a.evidence = action.payload.evidence;
                return false
            } else {
                return true
            }
        })
    }
});