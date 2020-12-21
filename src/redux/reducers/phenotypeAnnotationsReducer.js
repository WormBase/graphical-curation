import {createReducer} from '@reduxjs/toolkit'
import {phenotypeAnnotationIsValid, phenotypeAnnotationMissingFields} from "../constraints/phenotype";
import {createPhenotypeAnnotation} from "../../annotationUtils";

const initialState = {
    annotations: [],
    tmpAnnotation: createPhenotypeAnnotation(),
    savedStatus: null,
    wrongAnnotation: [],
    currentAction: 'Create',
};

function annotationIsDuplicate(annotation, storedAnnotations) {
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
    SAVE_PHENOTYPE_TMP_ANNOT: (state, action) => {
        if (phenotypeAnnotationIsValid(state.tmpAnnotation)) {
            let modAnnotation = _.cloneDeep(state.tmpAnnotation);
            modAnnotation.dateAssigned = Date.now();
            if (state.annotations.some(a => a.annotationId === state.tmpAnnotation.annotationId)) {
                state.annotations.forEach((annotation, idx, object) => {
                    if (annotation.annotationId === modAnnotation.annotationId) {
                        object[idx] = modAnnotation;
                    }
                });
                state.savedStatus = 'Modified';
            } else if (!annotationIsDuplicate(state.tmpAnnotation, state.annotations)) {
                state.annotations.push(modAnnotation);
                state.savedStatus = 'Created';
            }
            state.currentAction = 'Create';
        } else {
            state.wrongAnnotation = phenotypeAnnotationMissingFields(state.tmpAnnotation);
            console.log(state.wrongAnnotation);
        }
    },
    SET_PHENOTYPE_TMP_ANNOT: (state, action) => {
        state.tmpAnnotation = _.cloneDeep(action.payload.annotation);
        state.currentAction = 'Modify';
    },
    RESET_PHENOTYPE_TMP_ANNOT: (state, action) => {
        state.tmpAnnotation = createPhenotypeAnnotation();
        state.currentAction = 'Create';
    },
    DELETE_PHENOTYPE_ANNOT: (state, action) => {
        state.annotations = state.annotations.filter(a => a.annotationId !== action.payload.annotationId);
        state.savedStatus = 'Deleted';
    },
    SET_PHENOTYPE_TMP_ANNOT_OBJECT: (state, action) => {
        state.tmpAnnotation.object = _.cloneDeep(action.payload.object);
    },
    SET_PHENOTYPE_TMP_ANNOT_PHENOTYPE_TERMS: (state, action) => {
        state.tmpAnnotation.phenotypeTerms = _.cloneDeep(action.payload.phenotypeTerms);
    },
    SET_PHENOTYPE_TMP_ANNOT_ANATOMY_TERMS: (state, action) => {
        state.tmpAnnotation.anatomyTerms = _.cloneDeep(action.payload.anatomyTerms);
    },
    SET_PHENOTYPE_TMP_ANNOT_LIFE_STAGES: (state, action) => {
        state.tmpAnnotation.lifeStages = _.cloneDeep(action.payload.lifeStages);
    },
    SET_PHENOTYPE_TMP_ANNOT_PHENOTYPE_STATEMENT: (state, action) => {
        state.tmpAnnotation.phenotypeStatement = _.cloneDeep(action.payload.phenotypeStatement);
    },
    SET_PHENOTYPE_TMP_ANNOT_EVIDENCE: (state, action) => {
        state.tmpAnnotation.evidence = _.cloneDeep(action.payload.evidence);
    },
    DISMISS_SAVED_STATUS: (state, action) => {
        state.savedStatus = null;
    },
    DISMISS_WRONG_ANNOTATION: (state, action) => {
        state.wrongAnnotation = [];
    },
});