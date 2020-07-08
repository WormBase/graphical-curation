export const SET_ACTIVE_ANNOTATION_TYPE = "SET_ACTIVE_ANNOTATION_TYPE";
export const SET_ACTIVE_VIEW = "SET_ACTIVE_VIEW";
export const SET_EXPRESSION_ANNOTATION_FOR_EDITING = "SET_EXPRESSION_ANNOTATION_FOR_EDITING";
export const UNSET_EXPRESSION_ANNOTATION_FOR_EDITING = "UNSET_EXPRESSION_ANNOTATION_FOR_EDITING";
export const SET_PHENOTYPE_ANNOTATION_FOR_EDITING = "SET_PHENOTYPE_ANNOTATION_FOR_EDITING";
export const UNSET_PHENOTYPE_ANNOTATION_FOR_EDITING = "UNSET_PHENOTYPE_ANNOTATION_FOR_EDITING";
export const SET_ANATOMY_FUNCTION_ANNOTATION_FOR_EDITING = "SET_ANATOMY_FUNCTION_ANNOTATION_FOR_EDITING";
export const UNSET_ANATOMY_FUNCTION_ANNOTATION_FOR_EDITING = "UNSET_ANATOMY_FUNCTION_ANNOTATION_FOR_EDITING";


export const setActiveAnnotationType = annotationType => ({
  type: SET_ACTIVE_ANNOTATION_TYPE,
  payload: { annotationType }
});

export const setActiveView = view => ({
  type: SET_ACTIVE_VIEW,
  payload: { view }
});

export const setExpressionAnnotationForEditing = annotation => ({
  type: SET_EXPRESSION_ANNOTATION_FOR_EDITING,
  payload: { annotation }
});

export const unsetExpressionAnnotationForEditing = () => ({
  type: UNSET_EXPRESSION_ANNOTATION_FOR_EDITING
});

export const setPhenotypeAnnotationForEditing = annotation => ({
  type: SET_PHENOTYPE_ANNOTATION_FOR_EDITING,
  payload: { annotation }
});

export const unsetPhenotypeAnnotationForEditing = () => ({
  type: UNSET_PHENOTYPE_ANNOTATION_FOR_EDITING
});

export const setAnatomyFunctionAnnotationForEditing = annotation => ({
  type: SET_ANATOMY_FUNCTION_ANNOTATION_FOR_EDITING,
  payload: { annotation }
});

export const unsetAnatomyFunctionAnnotationForEditing = () => ({
  type: UNSET_ANATOMY_FUNCTION_ANNOTATION_FOR_EDITING
});

