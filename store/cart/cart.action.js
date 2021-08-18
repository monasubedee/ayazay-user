import {
  ADD_ITEM,
  REMOVE_ITEM,
  CLEAR_ITEM_FROM_CART,
  INCREASE,
  DECREASE,
  RESET,
  ADD_ITEM_TO_CHECKOUT,
  UPDATE_QUANTITY,
  LIMIT_ITEM,
  UPDATE_ITEM,
  SHIPPING_FEES,
  CHECK_ITEM,
  CHECK_ITEM_ALL,
  UPDATE_TEST_ITEM,
} from './cart.types';

export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: item,
});
export const addItemtoCheckout = (item) => ({
  type: ADD_ITEM_TO_CHECKOUT,
  payload: item,
});

export const reset = () => ({
  type: RESET,
});

export const removeItem = (item) => ({
  type: REMOVE_ITEM,
  payload: item,
});

export const clearItemFromCart = (item, id) => ({
  type: CLEAR_ITEM_FROM_CART,
  payload: { item, id },
});

export const itemIncrease = (item) => ({
  type: INCREASE,
  payload: item,
});
export const itemDecrease = (item) => ({
  type: DECREASE,
  payload: item,
});

export const updateQuantity = (item, val) => ({
  type: UPDATE_QUANTITY,
  payload: { item, val },
});
export const limitItem = (item, value) => ({
  type: LIMIT_ITEM,
  payload: { item, value },
});

export const updateItem = (item) => ({
  type: UPDATE_ITEM,
  payload: item,
});

export const updatetestItem = (item) => ({
  type: UPDATE_TEST_ITEM,
  payload: item,
});

export const addShippingFees = (price) => ({
  type: SHIPPING_FEES,
  payload: price,
});

export const checkItem = (item) => ({
  type: CHECK_ITEM,
  payload: item,
});

export const checkItemAll = (item) => ({
  type: CHECK_ITEM_ALL,
  payload: item,
});
