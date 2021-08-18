import {
  GET_SHOP,
  GET_SHOP_ERROR,
  GET_SHOP_ID_PRODUCT,
  GET_SHOP_ID_PRODUCT_ERROR,
  GET_SHOP_LIST,
  GET_LOAD_MORE,
} from './type';
import api from '../../constants/api';

export const getShop = (id) => async (dispatch) => {
  try {
    const response = await api.get(`/customer/shop/${id}`);

    dispatch({
      type: GET_SHOP,
      payload: response.data,
    });
  } catch (error) {
    console.log('ERROR ' + error);
  }
};

export const getShopIdProduct = (id) => async (dispatch) => {
  try {
    const response = await api.get(`customer/${id}/product`);
    dispatch({
      type: GET_SHOP_ID_PRODUCT,
      payload: response.data,
    });
  } catch (error) {}
};

export const getShopList = () => async (dispatch) => {
  try {
    const response = await api.get(`/customer/shop?skip=0&limit=20`);
    dispatch({
      type: GET_SHOP_LIST,
      payload: response.data,
    });
  } catch (err) {
    console.log('error', err);
  }
};

export const getShopmore = (skip) => async (dispatch) => {
  try {
    const response = await api.get(`/customer/shop?skip=${skip}&limit=20`);
    console.log(response.data);
    dispatch({
      type: GET_LOAD_MORE,
      payload: response.data,
    });
  } catch (err) {
    console.log('error', err);
  }
};
