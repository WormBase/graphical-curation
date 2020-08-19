import {createReducer} from '@reduxjs/toolkit'
import {createExpressionAnnotation} from "../../annotationUtils";
import {expressionAnnotationIsValid} from "../constraints/expression";

const initialState = {
    annotations: [],
    tmpAnnotation: createExpressionAnnotation(),
    savedStatus: null,
    wrongAnnotation: false,
    currentAction: 'Create',
};

function annotationIsDuplicate(annotation, storedAnnotations) {
    return storedAnnotations.some(a => {
        return annotation.gene === a.gene &&
            arraysContainSameElements(annotation.whereExpressed, a.whereExpressed) &&
            arraysContainSameElements(annotation.whenExpressed, a.whenExpressed);
    })
}

const arraysContainSameElements = (array1, array2) => array1.sort().join(',') === array2.sort().join(',');

export const expressionAnnotations = createReducer(initialState, {
    SET_EXPR_ANNOTS: (state, action) => {
        if (action.payload.annotations !== undefined) {
            state.annotations = action.payload.annotations
        }
    },
    SAVE_EXPR_TMP_ANNOT: (state, action) => {
        if (expressionAnnotationIsValid(state.tmpAnnotation)) {
            if (state.annotations.some(a => a.annotationId === state.tmpAnnotation.annotationId)) {
                let modAnnotation = _.cloneDeep(state.tmpAnnotation);
                modAnnotation.dateAssigned = Date.now();
                state.annotations.forEach((annotation, idx, object) => {
                    if (annotation.annotationId === modAnnotation.annotationId) {
                        object[idx] = modAnnotation;
                    }
                });
                state.savedStatus = 'Modified';
            } else if (!annotationIsDuplicate(state.tmpAnnotation, state.annotations)) {
                state.annotations.push(_.cloneDeep(state.tmpAnnotation));
                state.savedStatus = 'Created';
            }
            state.currentAction = 'Create';
        } else {
            state.wrongAnnotation = true;
        }
    },
    SET_EXPR_TMP_ANNOT: (state, action) => {
        state.tmpAnnotation = _.cloneDeep(action.payload.annotation);
        state.currentAction = 'Modify';
    },
    RESET_EXPR_TMP_ANNOT: (state, action) => {
        state.tmpAnnotation = createExpressionAnnotation();
        state.currentAction = 'Create';
    },
    DELETE_EXPR_ANNOT: (state, action) => {
        state.annotations = state.annotations.filter(a => a.annotationId !== action.payload.annotationId);
        state.savedStatus = 'Deleted';
    },
    SET_EXPR_TMP_ANNOT_GENE: (state, action) => {
        state.tmpAnnotation.gene = _.cloneDeep(action.payload.gene);
    },
    SET_EXPR_TMP_ANNOT_WHERE_EXPRESSED: (state, action) => {
        state.tmpAnnotation.whereExpressed = _.cloneDeep(action.payload.whereExpressed);
    },
    SET_EXPR_TMP_ANNOT_WHEN_EXPRESSED: (state, action) => {
        state.tmpAnnotation.whenExpressed = _.cloneDeep(action.payload.whenExpressed);
    },
    SET_EXPR_TMP_ANNOT_CELLULAR_COMPONENTS: (state, action) => {
        state.tmpAnnotation.cellularComponent = _.cloneDeep(action.payload.cellularComponents);
    },
    SET_EXPR_TMP_ANNOT_ASSAY: (state, action) => {
        state.tmpAnnotation.assay = _.cloneDeep(action.payload.assay);
    },
    SET_EXPR_TMP_ANNOT_EVIDENCE: (state, action) => {
        state.tmpAnnotation.evidence = _.cloneDeep(action.payload.evidence);
    },
    DISMISS_SAVED_STATUS: (state, action) => {
        state.savedStatus = null;
    },
    DISMISS_WRONG_ANNOTATION: (state, action) => {
        state.wrongAnnotation = false;
    },
});