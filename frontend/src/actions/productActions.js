import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_ADMIN_LIST_REQUEST,
  PRODUCT_ADMIN_LIST_SUCCESS,
  PRODUCT_ADMIN_LIST_FAIL,
  PRODUCT_ADMIN_DETAILS_REQUEST,
  PRODUCT_ADMIN_DETAILS_SUCCESS,
  PRODUCT_ADMIN_DETAILS_FAIL,
  PRODUCT_ADMIN_DELETE_REQUEST,
  PRODUCT_ADMIN_DELETE_SUCCESS,
  PRODUCT_ADMIN_DELETE_FAIL,
  PRODUCT_ADMIN_CREATE_REQUEST,
  PRODUCT_ADMIN_CREATE_SUCCESS,
  PRODUCT_ADMIN_CREATE_FAIL,
  PRODUCT_ADMIN_UPDATE_REQUEST,
  PRODUCT_ADMIN_UPDATE_SUCCESS,
  PRODUCT_ADMIN_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_TOP_RATED_REQUEST,
  PRODUCT_TOP_RATED_SUCCESS,
  PRODUCT_TOP_RATED_FAIL,
} from "../constants/productConstants";

export const listProducts =
  (search = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      let url = `/api/products/`;
      if (search !== "") {
        url = url + `${search}`;
      }

      const config = { headers: { "X-Requested-From-React": true } };
      const { data } = await axios.get(url, config);
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.error.detail
            ? error.response.data.error.detail
            : error.message,
      });
    }
  };

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_RATED_REQUEST });
    let url = `/api/products/top-rated/`;
    const config = { headers: { "X-Requested-From-React": true } };
    const { data } = await axios.get(url, config);
    dispatch({ type: PRODUCT_TOP_RATED_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_RATED_FAIL,
      payload:
        error.response && error.response.data.error.detail
          ? error.response.data.error.detail
          : error.message,
    });
  }
};

export const detailsProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const config = { headers: { "X-Requested-From-React": true } };
    const { data } = await axios.get(`/api/products/${id}`, config);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.error.detail
          ? error.response.data.error.detail
          : error.message,
    });
  }
};

export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "X-Requested-From-React": true,
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/products/${productId}/reviews/`,
        review,
        config
      );
      dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.error.detail
            ? error.response.data.error.detail
            : error.message,
      });
    }
  };

export const getProductAdminList =
  (search = "") =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_ADMIN_LIST_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "X-Requested-From-React": true,
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      let url = `/api/management/product/list/`;
      if (search !== "") {
        url = url + `${search}`;
      }
      console.log(url);
      const { data } = await axios.get(url, config);
      dispatch({ type: PRODUCT_ADMIN_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_ADMIN_LIST_FAIL,
        payload:
          error.response && error.response.data.error.detail
            ? error.response.data.error.detail
            : error.message,
      });
    }
  };

export const getProductAdminDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_ADMIN_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "X-Requested-From-React": true,
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/management/product/${id}/`, config);
    dispatch({ type: PRODUCT_ADMIN_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_ADMIN_DETAILS_FAIL,
      payload:
        error.response && error.response.data.error.detail
          ? error.response.data.error.detail
          : error.message,
    });
  }
};

export const deleteProductAdmin = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_ADMIN_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "X-Requested-From-React": true,
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(
      `/api/management/product/${id}/`,
      config
    );
    dispatch({ type: PRODUCT_ADMIN_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_ADMIN_DELETE_FAIL,
      payload:
        error.response && error.response.data.error.detail
          ? error.response.data.error.detail
          : error.message,
    });
  }
};

export const createProductAdmin = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_ADMIN_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "X-Requested-From-React": true,
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/management/product/list/`,
      {},
      config
    );
    dispatch({ type: PRODUCT_ADMIN_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_ADMIN_CREATE_FAIL,
      payload:
        error.response && error.response.data.error.detail
          ? error.response.data.error.detail
          : error.message,
    });
  }
};

export const updateProductAdmin = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_ADMIN_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "X-Requested-From-React": true,
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const formData = new FormData();
    for (let key in product) {
      if (key !== "image") {
        formData.append(key, product[key]);
      } else if (key === "image" && product[key] instanceof File) {
        formData.append("image", product[key]);
      }
    }

    const { data } = await axios.put(
      `/api/management/product/${product.id}/`,
      formData,
      config
    );
    dispatch({ type: PRODUCT_ADMIN_UPDATE_SUCCESS, payload: data });

    dispatch({ type: PRODUCT_ADMIN_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_ADMIN_UPDATE_FAIL,
      payload:
        error.response && error.response.data.error.detail
          ? error.response.data.error.detail
          : error.message,
    });
  }
};
