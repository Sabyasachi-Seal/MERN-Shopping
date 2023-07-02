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
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_REVIEW_REQUEST,
  CREATE_PRODUCT_REVIEW_SUCCESS,
  CREATE_PRODUCT_REVIEW_FAILURE,
  TOP_RATED_PRODUCT_REQUEST,
  TOP_RATED_PRODUCT_SUCCESS,
  TOP_RATED_PRODUCT_FAILURE,
} from "../types/productTypes";
import axios from "axios";

export const listProducts =
  (keyword = "", page = "") =>
  async (dispatch) => {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    try {
      const { data } = await axios.get(
        `/api/products?keyword=${keyword}&page=${page}`
      );
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listProduct = (id) => async (dispatch) => {
  dispatch({ type: PRODUCT_REQUEST });
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({ type: PRODUCT__SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT__FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  dispatch({ type: DELETE_PRODUCT_REQUEST });
  const {
    userLogin: { userInfo },
  } = getState();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  try {
    await axios.delete(`/api/products/${id}`, config);
    dispatch({ type: DELETE_PRODUCT_SUCCESS });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const createProduct = () => async (dispatch, getState) => {
  dispatch({ type: CREATE_PRODUCT_REQUEST });
  const {
    userLogin: { userInfo },
  } = getState();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  try {
    const { data } = await axios.post(`/api/products`, {}, config);
    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProduct = (prod) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_PRODUCT_REQUEST });
  const {
    userLogin: { userInfo },
  } = getState();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  try {
    const { data } = await axios.put(`/api/products/${prod._id}`, prod, config);
    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    dispatch({ type: CREATE_PRODUCT_REVIEW_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    try {
      await axios.post(`/api/products/${productId}/reviews`, review, config);
      dispatch({ type: CREATE_PRODUCT_REVIEW_SUCCESS });
    } catch (error) {
      dispatch({
        type: CREATE_PRODUCT_REVIEW_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listTopratedProduct = (id) => async (dispatch) => {
  dispatch({ type: TOP_RATED_PRODUCT_REQUEST });
  try {
    const { data } = await axios.get(`/api/products/top`);
    dispatch({ type: TOP_RATED_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TOP_RATED_PRODUCT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
