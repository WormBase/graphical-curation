export const SET_ACTIVE_ANNOTATION_TYPE = "SET_ACTIVE_ANNOTATION_TYPE";
export const SET_ACTIVE_VIEW = "SET_ACTIVE_VIEW";


export const setActiveAnnotationType = annotationType => ({
  type: SET_ACTIVE_ANNOTATION_TYPE,
  payload: { annotationType }
});

export const setActiveView = view => ({
  type: SET_ACTIVE_VIEW,
  payload: { view }
});
