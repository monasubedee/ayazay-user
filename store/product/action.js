import {
  GET_PRODUCT_DETAIL_ID,
  GET_PRODUCT_CATEGORY,
  GET_PRODUCT_CATEGORIES,
  GET_PRODUCT_BRANDS,
  GET_BRAND_PRODUCTS,
  GET_PRODUCT_SUBCATEGORY,
  LOAD_MORE,
  GET_SEARCH_PRODUCT,
  GET_SEARCH_PRODUCT_NAME, 
  GET_SIMILAR_PRODUCT
} from "./type";
import api from "../../constants/api";
import authapi from '../../constants/authApi';

export const getProductDetail = (id) => async (dispatch) => {
  console.log("RESPNHEHEE");

  const response = await api.get(`/customer/product/${id}`);
  console.log("RESPN", response);
  try {
    dispatch({
      type: GET_PRODUCT_DETAIL_ID,
      payload: response.data,
    });
  } catch (error) {
    console.log("ERRor", error);
    dispatch({
      type: GET_PRODUCT_DETAIL_ID_ERROR,
      payload: response.data,
    });
  }
};

export const getProductCategories = () => async (dispatch) => {
  const response = await api.get('/category');
  try {
    dispatch({
      type: GET_PRODUCT_CATEGORIES,
      payload: response.data
    });
  }
  catch (error) {
    console.log("error", error);
  }
}


export const getProductBrands = () => async (dispatch) => {
  const response = await api.get('/brand');
  try {
    dispatch({
      type: GET_PRODUCT_BRANDS,
      payload: response.data
    });
  }
  catch (err) {
    console.log("error", err);
  }
}

export const getBrandProducts = (id) => async (dispatch) => {
  const response = await api.get(`/product-brand?brand_id=${id}&limit=20&skip=0`)
  try {
    dispatch({
      type: GET_BRAND_PRODUCTS,
      payload: response.data
    })
  }
  catch (err) {
    console.log("error", err);
  }
}
export const getProductSubCategory = (id) => async (dispatch) => {
  const response = await api.get(`/category/${id}/subcategories`);

  try {
    dispatch({
      type: GET_PRODUCT_SUBCATEGORY,
      payload: response.data,
    });
  }
  catch (error) {
    console.log("error", error);
  }

}


export const getProductcategory = (id) => async (dispatch) => {
  console.log("category");

  const response = await api.get(`/product-category?category_id=${id}&limit=20&skip=0`);
  console.log(response)
  try {
    dispatch({
      type: GET_PRODUCT_CATEGORY,
      payload: response.data,
    });
  } catch (error) {
    console.log("ERRor", error);
    dispatch({
      type: GET_PRODUCT_DETAIL_ID_ERROR,
      payload: response.data,
    });
  }
};


export const getLoadMore = (id, skip) => async (dispatch) => {
  try {
    const response = await api.get(`/product-category?category_id=${id}&limit=20&skip=${skip}`);
    console.log(response)
    dispatch({
      type: LOAD_MORE,
      payload: response.data,
    });
  } catch (error) {
    console.log("ERRor", error);
  }
}

export const getSearchProduct = (search_value) => async (dispatch) => {
  let search = search_value.toLowerCase();
  try{
    const response = await api.get(`/product/search?filter=${search}`);
    dispatch({
      type: GET_SEARCH_PRODUCT,
      payload: response.data
    });

  }
  catch(err){
    console.log("error", err);
  }
}

export const getSearchProductName = (search) => async (dispatch) => {
  let search_value = search.toLowerCase();
  try{
    const response = await api.get(`/product/search?filter=${search_value}`);
    dispatch({
      type:GET_SEARCH_PRODUCT_NAME,
      payload:response.data
    });
  }
  catch(err){
    console.log("error", err);
  }
}

export const getSimilarProduct = (id) => async (dispatch) => {
  try{
    const response = await api.get(`/customer/${id}/product`);
    dispatch({
      type:GET_SIMILAR_PRODUCT,
      payload:response.data
    })
  }
  catch(err) {
    console.log("error",err);
  }
}

