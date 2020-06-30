import {createReducer} from '@reduxjs/toolkit';

const initialState = {
    activeAnnotationType: 'expression',
    activeView: 'annotator'
};

export const internalState = createReducer(initialState, {
    SET_ACTIVE_ANNOTATION_TYPE: (state, action) => {state.activeAnnotationType = action.payload.annotationType},
    SET_ACTIVE_VIEW: (state, action) => {state.activeView = action.payload.view}
});
