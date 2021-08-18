import { number } from 'prop-types';
import { clearItemFromCart } from './cart.action';

export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) =>
      cartItem.product_id === cartItemToAdd.product_id &&
      cartItem.variants.id === cartItemToAdd.variants.id
  );
  console.log(existingCartItem);
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.product_id === cartItemToAdd.product_id &&
      cartItem.variants.id === cartItemToAdd.variants.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : { ...cartItem }
    );
  }
  if (cartItemToAdd.quantity) return [...cartItems, { ...cartItemToAdd }];
};

export const RemoveItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) =>
      cartItem.product_id === cartItemToRemove.product_id &&
      cartItem.variants.id === cartItemToRemove.variants.id
  );
  if (existingCartItem.quantity === 1) {
    return cartItems.map((cartItem) => cartItem);
  }
  return cartItems.map((cartItem) =>
    cartItem.product_id === cartItemToRemove.product_id &&
    cartItem.variants.id === cartItemToRemove.variants.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const addCartTocheckout = (cartItems, item) => {
  const existingItem = cartItems.find(
    (cartItem) =>
      cartItem.product_id === item.product_id && cartItem.variants.id === item.variants.id
  );

  console.log(existingItem);

  if (existingItem) {
    console.log(existingItem, 'in');
    return cartItems.map((cartItem) => {
      if (cartItem.product_id === item.product_id && cartItem.variants.id === item.variants.id) {
        console.log(item.quantity, 'number');
        return { ...cartItem, quantity: item.quantity };
      } else {
        return { ...cartItem };
      }
    });
  } else {
    if (cartItems.length === 0 || cartItems === null) {
      return [...cartItems, { ...item }];
    } else {
      const sameshop = cartItems.find((cartItem) => cartItem.shop.id === item.shop.id);
      if (sameshop) {
        return [...cartItems, { ...item }];
      } else {
        return [...cartItems];
      }
    }
  }
};

export const selectedcheckitem = (items, checkitem) => {
  const existingItem = items.find(
    (Item) => Item.product_id === checkitem.product_id && Item.variants.id === checkitem.variants.id
  );

  if (existingItem) {
    return items.map((Item) =>
      Item.product_id === checkitem.product_id && Item.variants.id === checkitem.variants.id
        ? { ...Item, actualbuy: !Item.actualbuy }
        : { ...Item }
    );
  } else {
    return items.map((Item) =>
      Item.product_id === checkitem.product_id && Item.variants.id === checkitem.variants.id
        ? { ...Item, actualbuy: true }
        : { ...Item }
    );
  }
};

export const selectedCheckItemAll = (items, checked) => {
  console.log(checked);
  if (checked === true) {
    return items.map((Item) => {
      if (Item.variants.qty !== 0) {
        return { ...Item, actualbuy: true };
      } else {
        return { ...Item };
      }
    });
  } else {
    return items.map((Item) => {
      if (Item.variants.qty !== 0) {
        return { ...Item, actualbuy: false };
      } else {
        return { ...Item };
      }
    });
  }
};
