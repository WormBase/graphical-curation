export const FETCH_EXPR_ANNOTS_REQUEST = "FETCH_EXPR_ANNOTS_REQUEST";
export const FETCH_EXPR_ANNOTS_SUCCESS = "FETCH_EXPR_ANNOTS_SUCCESS";
export const FETCH_EXPR_ANNOTS_ERROR = "FETCH_EXPR_ANNOTS_ERROR";


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
