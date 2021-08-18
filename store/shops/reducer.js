import {
  GET_SHOP,
  GET_SHOP_ERROR,
  GET_SHOP_ID_PRODUCT,
  GET_SHOP_ID_PRODUCT_ERROR,
  GET_SHOP_LIST,
  GET_LOAD_MORE,
} from './type';

const INITIAL_STATE = {
  shop: {},
  shopProducts: [],
  shopList: [],
  total: '',
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SHOP:
      return {
        ...state,
        shop: action.payload,
      };

    case GET_SHOP_ID_PRODUCT:
      return {
        ...state,
        shopProducts: [action.payload],
      };
    case GET_SHOP_LIST:
      return {
        ...state,
        shopList: action.payload.data,
        total: action.payload.total,
      };
    case GET_LOAD_MORE:
      return {
        ...state,
        shopList: [...state.shopList, ...action.payload.data],
      };

    default:
      return state;
  }
};

export default shopReducer;
