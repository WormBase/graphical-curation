import {createReducer} from '@reduxjs/toolkit';

const initialState = {
    activeAnnotationType: 'expression',
    activeView: 'annotator'
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
});
