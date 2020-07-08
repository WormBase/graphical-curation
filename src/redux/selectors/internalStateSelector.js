export const getInternalState = store => store.internalState;

export const getActiveAnnotationType = store => getInternalState(store) ? getInternalState(store).activeAnnotationType : null;
export const getActiveView = store => getInternalState(store) ? getInternalState(store).activeView : null;
export const getExpressionAnnotationForEditing = store => getInternalState(store) ? getInternalState(store).expressionAnnotationForEditing: null;
export const getPhenotypeAnnotationForEditing = store => getInternalState(store) ? getInternalState(store).phenotypeAnnotationForEditing: null;
export const getAnatomyFunctionAnnotationForEditing = store => getInternalState(store) ? getInternalState(store).anatomyFunctionAnnotationForEditing: null;
