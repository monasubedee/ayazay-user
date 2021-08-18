import { createSelector } from 'reselect';

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector([selectCart], (cart) => cart.cartItems);

export const selectShippingFees = createSelector([selectCart], (cart) => cart.shippingFees);

export const selectCartItemsCount = createSelector([selectCartItems], (cartItems) => {
  const count = cartItems.reduce((accumalateQuantity, cartItems) => {
    const count = cartItems.actualbuy === true ? cartItems.quantity : 0;
    return accumalateQuantity + count;
  }, 0);
  return count;
});

export const selectItemCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.length === 0 ? 0 : cartItems.length
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((accumalateQuantity, cartItem) => {
    console.log(cartItem.quantity * cartItem.variants.price);
    const price = cartItem.actualbuy === true ? cartItem.quantity * cartItem.variants.price : 0;
    return accumalateQuantity + price;
  }, 0)
);
