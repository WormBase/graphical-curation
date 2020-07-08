import {createReducer} from '@reduxjs/toolkit';

const initialState = {
    activeAnnotationType: 'expression',
    activeView: 'annotator',
    expressionAnnotationForEditing: null,
    phenotypeAnnotationForEditing: null,
    anatomyFunctionAnnotationForEditing: null
};

export const internalState = createReducer(initialState, {
    SET_ACTIVE_ANNOTATION_TYPE: (state, action) => {
        if (state.activeAnnotationType !== action.payload.activeAnnotationType) {
            state.expressionAnnotationForEditing = null;
            state.phenotypeAnnotationForEditing = null;
            state.anatomyFunctionAnnotationForEditing = null;
        }
        state.activeAnnotationType = action.payload.annotationType;
        },
    SET_ACTIVE_VIEW: (state, action) => {
        if (state.activeView === "annotator" && action.payload.view === "viewer") {
            state.expressionAnnotationForEditing = null;
            state.phenotypeAnnotationForEditing = null;
            state.anatomyFunctionAnnotationForEditing = null;
        }
        state.activeView = action.payload.view;
        },
    SET_EXPRESSION_ANNOTATION_FOR_EDITING: (state, action) => {state.expressionAnnotationForEditing = action.payload.annotation},
    UNSET_EXPRESSION_ANNOTATION_FOR_EDITING: (state, action) => {state.expressionAnnotationForEditing = null},
    SET_PHENOTYPE_ANNOTATION_FOR_EDITING: (state, action) => {state.phenotypeAnnotationForEditing = action.payload.annotation},
    UNSET_PHENOTYPE_ANNOTATION_FOR_EDITING: (state, action) => {state.phenotypeAnnotationForEditing = null},
    SET_ANATOMY_FUNCTION_ANNOTATION_FOR_EDITING: (state, action) => {state.anatomyFunctionAnnotationForEditing = action.payload.annotation},
    UNSET_ANATOMY_FUNCTION_ANNOTATION_FOR_EDITING: (state, action) => {state.anatomyFunctionAnnotationForEditing = null}
});
