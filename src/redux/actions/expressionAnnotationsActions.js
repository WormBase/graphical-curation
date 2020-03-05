export const FETCH_EXPR_ANNOTS_REQUEST = "FETCH_EXPR_ANNOTS_REQUEST";
export const FETCH_EXPR_ANNOTS_SUCCESS = "FETCH_EXPR_ANNOTS_SUCCESS";
export const FETCH_EXPR_ANNOTS_ERROR = "FETCH_EXPR_ANNOTS_ERROR";
export const ADD_EXPR_ANNOT = "ADD_EXPR_ANNOT";
export const DELETE_EXPR_ANNOT = "DELETE_EXPR_ANNOT";
export const SET_GENE_EXPR_ANNOT = "SET_GENE_EXPR_ANNOT";
export const ADD_WHEN_EXPRESSED_EXPR_ANNOT = "ADD_WHEN_EXPRESSED_EXPR_ANNOT";
export const REMOVE_WHEN_EXPRESSED_EXPR_ANNOT = "REMOVE_WHEN_EXPRESSED_EXPR_ANNOT";
export const SET_ASSAY_EXPR_ANNOT = "SET_ASSAY_EXPR_ANNOT";
export const SET_EVIDENCE_EXPR_ANNOT = "SET_EVIDENCE_EXPR_ANNOT";
export const ADD_WHERE_EXPRESSED_EXPR_ANNOT = "ADD_WHERE_EXPRESSED_EXPR_ANNOT";
export const REMOVE_WHERE_EXPRESSED_EXPR_ANNOT = "REMOVE_WHERE_EXPRESSED_EXPR_ANNOT";


export const fetchExpressionAnnotations = apiEndpoint => {
  return dispatch => {
    dispatch(fetchExpressionAnnotationsRequest());

    let testExpressionAnnotations = [
        {
            annotationId: 1,
            gene: 'lin-12',
            whenExpressed: ['adult'],
            assay: '',
            evidence: '',
            whereExpressed: ['tail']
        },
        {
            annotationId: 2,
            gene: 'daf-16',
            whenExpressed: ['embryo'],
            assay: '',
            evidence: '',
            whereExpressed: ['head']
        }];

    dispatch(fetchExpressionAnnotationsSuccess(testExpressionAnnotations));

    // TODO uncomment this code and comment above when ready to fetch entities from API
    // axios
    //   .post(apiEndpoint)
    //   .then(res => {
    //     dispatch(fetchEntitiesSuccess(res.data));
    //   })
    //   .catch(err => {
    //     dispatch(fetchEntitiesError(err.message));
    //   });
  };
};

export const fetchExpressionAnnotationsRequest = () => ({
    type: FETCH_EXPR_ANNOTS_REQUEST,
    payload: {}
});

export const fetchExpressionAnnotationsSuccess = annotations => ({
   type: FETCH_EXPR_ANNOTS_SUCCESS,
   payload: {
       annotations
   }
});

export const fetchExpressionAnnotationsError = () => ({
   type: FETCH_EXPR_ANNOTS_ERROR,
   payload: {}
});


export const addExpressionAnnotation = (annotation) => ({
    type: ADD_EXPR_ANNOT,
    payload: {
        annotation
    }
});

export const deleteExpressionAnnotation = (annotationId) => ({
    type: DELETE_EXPR_ANNOT,
    payload: {
        annotationId
    }
});

export const setGeneInExpressionAnnotation = (annotationId, gene) => ({
    type: SET_GENE_EXPR_ANNOT,
    payload: {
        annotationId: annotationId,
        gene: gene
    }
});

export const addWhenExpressedToExpressionAnnotation = (annotationId, whenExpressed) => ({
    type: ADD_WHEN_EXPRESSED_EXPR_ANNOT,
    payload: {
        annotationId: annotationId,
        whenExpressed: whenExpressed
    }
});

export const removeWhenExpressedToExpressionAnnotation = (annotationId, whenExpressed) => ({
    type: REMOVE_WHEN_EXPRESSED_EXPR_ANNOT,
    payload: {
        annotationId: annotationId,
        whenExpressed: whenExpressed
    }
});

export const setAssayInExpressionAnnotation = (annotationId, assay) => ({
    type: SET_ASSAY_EXPR_ANNOT,
    payload: {
        annotationId: annotationId,
        gene: assay
    }
});

export const setEvidenceInExpressionAnnotation = (annotationId, evidence) => ({
    type: SET_EVIDENCE_EXPR_ANNOT,
    payload: {
        annotationId: annotationId,
        gene: evidence
    }
});

export const addWhereExpressedToExpressionAnnotation = (annotationId, whereExpressed) => ({
    type: ADD_WHERE_EXPRESSED_EXPR_ANNOT,
    payload: {
        annotationId: annotationId,
        whenExpressed: whereExpressed
    }
});

export const removeWhereExpressedToExpressionAnnotation = (annotationId, whereExpressed) => ({
    type: REMOVE_WHERE_EXPRESSED_EXPR_ANNOT,
    payload: {
        annotationId: annotationId,
        whenExpressed: whereExpressed
    }
});