import {createReducer} from '@reduxjs/toolkit'
import _ from "lodash";
import {createAnatomyFunctionAnnotation} from "../../annotationUtils";
import {anatomyFunctionAnnotationIsValid} from "../constraints/anatomyFunction";

const initialState = {
    annotations: [],
    tmpAnnotation: createAnatomyFunctionAnnotation(),
    savedStatus: null,
    wrongAnnotation: false,
    currentAction: 'Create',
};

function annotationIsDuplicate(annotation, storedAnnotations) {
    return storedAnnotations.some(a => {
        return annotation.gene === a.gene && annotation.phenotype === a.phenotype &&
            arraysContainSameElements(annotation.anatomyTerms, a.anatomyTerms)
    })
}

const arraysContainSameElements = (array1, array2) => array1.sort().join(',') === array2.sort().join(',');

export const anatomyFunctionAnnotations = createReducer(initialState, {
    SET_ANATOMYFUNCTION_ANNOTS: (state, action) => {
        if (action.payload.annotations !== undefined) {
            state.annotations = action.payload.annotations
        }
    },
    SAVE_ANATOMYFUNCTION_TMP_ANNOT: (state, action) => {
        if (anatomyFunctionAnnotationIsValid(state.tmpAnnotation)) {
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
    SET_ANATOMYFUNCTION_TMP_ANNOT: (state, action) => {
        state.tmpAnnotation = _.cloneDeep(action.payload.annotation);
        state.currentAction = 'Modify';
    },
    RESET_ANATOMYFUNCTION_TMP_ANNOT: (state, action) => {
        state.tmpAnnotation = createAnatomyFunctionAnnotation();
        state.currentAction = 'Create';
    },
    DELETE_ANATOMYFUNCTION_ANNOT: (state, action) => {
        state.annotations = state.annotations.filter(a => a.annotationId !== action.payload.annotationId)
    },
    SET_ANATOMYFUNCTION_TMP_ANNOT_PHENOTYPE: (state, action) => {
        state.tmpAnnotation.phenotype = _.cloneDeep(action.payload.phenotype);
    },
    SET_ANATOMYFUNCTION_TMP_ANNOT_GENE: (state, action) => {
        state.tmpAnnotation.gene = _.cloneDeep(action.payload.gene);
    },
    SET_ANATOMYFUNCTION_TMP_ANNOT_ANATOMY_TERMS: (state, action) => {
        state.tmpAnnotation.anatomyTerms = _.cloneDeep(action.payload.anatomyTerms);
    },
    SET_ANATOMYFUNCTION_TMP_ANNOT_INVOLVED: (state, action) => {
        state.tmpAnnotation.involved = _.cloneDeep(action.payload.involved);
    },
    SET_ANATOMYFUNCTION_TMP_ANNOT_REMARKS: (state, action) => {
        state.tmpAnnotation.remarks = _.cloneDeep(action.payload.remarks);
    },
    SET_ANATOMYFUNCTION_TMP_ANNOT_NOCTUAMODELS: (state, action) => {
        state.tmpAnnotation.noctuamodels = _.cloneDeep(action.payload.noctuaModels);
    },
    SET_ANATOMYFUNCTION_TMP_ANNOT_GENOTYPES: (state, action) => {
        state.tmpAnnotation.genotypes = _.cloneDeep(action.payload.genotypes);
    },
    SET_ANATOMYFUNCTION_TMP_ANNOT_AUTHORSTATEMENTS: (state, action) => {
        state.tmpAnnotation.authorstatements = _.cloneDeep(action.payload.authorStatements);
    },
    SET_ANATOMYFUNCTION_TMP_ANNOT_ASSAY: (state, action) => {
        state.tmpAnnotation.assay = _.cloneDeep(action.payload.assay);
    },
    SET_ANATOMYFUNCTION_TMP_ANNOT_EVIDENCE: (state, action) => {
        state.tmpAnnotation.evidence = _.cloneDeep(action.payload.evidence);
    },
    DISMISS_SAVED_STATUS: (state, action) => {
        state.savedStatus = null;
    },
    DISMISS_WRONG_ANNOTATION: (state, action) => {
        state.wrongAnnotation = false;
    },
});