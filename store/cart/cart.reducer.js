import {
  ADD_ITEM,
  REMOVE_ITEM,
  CLEAR_ITEM_FROM_CART,
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
import {
  addItemToCart,
  RemoveItemFromCart,
  addCartTocheckout,
  selectedcheckitem,
  selectedCheckItemAll,
} from './cart.utils';

let cart;
let INITIAL_STATE = {
  cartItems: [],
  shippingFees: 0,
};
if (process.browser) {
  INITIAL_STATE = {
    cartItems:
      localStorage.getItem('cartItem') !== null ? JSON.parse(localStorage.getItem('cartItem')) : [],
  };
}

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CHECKOUT:
      return {
        ...state,
        cartItems: addCartTocheckout(state.cartItems, action.payload),
      };
    case ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload),
      };
    case REMOVE_ITEM:
      return {
        ...state,
        cartItems: RemoveItemFromCart(state.cartItems, action.payload),
      };
    case CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => {
          console.log('item to clear is', item);
          return (
            (item.product_id !== action.payload.item && item.variants.id !== action.payload.id) ||
            (item.product_id === action.payload.item && item.variants.id !== action.payload.id)
          );
        }),
      };
    case RESET:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.actualbuy !== true),
      };
    case LIMIT_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.map((cartItem) => {
          console.log(cartItem);
          if (
            cartItem.product_id === action.payload.item.product_id &&
            cartItem.variants.id === action.payload.item.variants.id
          ) {
            return { ...cartItem, limit: action.payload.value };
          } else {
            return cartItem;
          }
        }),
      };
    case UPDATE_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((cartItem) => {
          console.log(cartItem);
          if (
            cartItem.product_id === action.payload.val.product_id &&
            cartItem.variants.id === action.payload.val.variants.id
          ) {
            return { ...cartItem, quantity: action.payload.item };
          } else {
            return cartItem;
          }
        }),
      };
    case UPDATE_ITEM:
      return {
        ...state,
        cartItems: [action.payload],
      };
    case UPDATE_TEST_ITEM:
      return {
        ...state,
        cartItems: action.payload,
      };
    case SHIPPING_FEES:
      return {
        ...state,
        shippingFees: action.payload,
      };
    case CHECK_ITEM:
      return {
        ...state,
        cartItems: selectedcheckitem(state.cartItems, action.payload),
      };
    case CHECK_ITEM_ALL:
      return {
        ...state,
        cartItems: selectedCheckItemAll(state.cartItems, action.payload),
      };
    default:
      return state;
  }
};

export default cartReducer;
