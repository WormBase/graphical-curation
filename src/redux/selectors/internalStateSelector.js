export const getInternalState = store => store.internalState;

export const getActiveAnnotationType = store => getInternalState(store) ? getInternalState(store).activeAnnotationType : null;
export const getActiveView = store => getInternalState(store) ? getInternalState(store).activeView : null;
