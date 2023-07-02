import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILURE,
  PRODUCT_REQUEST,
  PRODUCT__SUCCESS,
  PRODUCT__FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_RESET,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_REVIEW_REQUEST,
  CREATE_PRODUCT_REVIEW_SUCCESS,
  CREATE_PRODUCT_REVIEW_FAILURE,
  CREATE_PRODUCT_REVIEW_RESET,
  TOP_RATED_PRODUCT_REQUEST,
  TOP_RATED_PRODUCT_SUCCESS,
  TOP_RATED_PRODUCT_FAILURE,
} from "../types/productTypes";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
      };
    case PRODUCT_LIST_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_REQUEST:
      return { loading: true, ...state };
    case PRODUCT__SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT__FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
      return { loading: true };
    case DELETE_PRODUCT_SUCCESS:
      return { loading: false, success: true };
    case DELETE_PRODUCT_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createProductReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return { loading: true };
    case CREATE_PRODUCT_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case CREATE_PRODUCT_FAILURE:
      return { loading: false, error: action.payload };
    case CREATE_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

export const updateProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
      return { loading: true };
    case UPDATE_PRODUCT_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case CREATE_PRODUCT_FAILURE:
      return { loading: false, error: action.payload };
    case CREATE_PRODUCT_RESET:
      return { product: {} };
    default:
      return state;
  }
};

export const createProductReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REVIEW_REQUEST:
      return { loading: true };
    case CREATE_PRODUCT_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case CREATE_PRODUCT_REVIEW_FAILURE:
      return { loading: false, error: action.payload };
    case CREATE_PRODUCT_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const topproductListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case TOP_RATED_PRODUCT_REQUEST:
      return { loading: true, products: [] };
    case TOP_RATED_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case TOP_RATED_PRODUCT_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
