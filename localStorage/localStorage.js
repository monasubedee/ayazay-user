export const setStorageUserInfo = (userInfo) =>
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
export const getStorageUserInfo = () => localStorage.getItem('userInfo');
export const setToken = (token) => localStorage.setItem('userToken', token);
export const getToken = () => localStorage.getItem('userToken');
export const clearToken = () => localStorage.clearToken('userToken');
export const setSearchLocal = (search) =>
  localStorage.setItem('search items', JSON.stringify(search));
export const getSearchLocal = () => JSON.parse(localStorage.getItem('search items'));
export const clearUserToken = () => localStorage.removeItem('userToken');
export const clearUserInfo = () => localStorage.removeItem('userInfo');

export const getCartItem = () => localStorage.getItem('cartItem');
export const setCartItem = (cart) => localStorage.setItem('cartItem', JSON.stringify(cart));

export const getDelivaryaddress = () => localStorage.getItem('deliveryinfo');
export const setDelivaryaddress = (data) =>
  localStorage.setItem('deliveryinfo', JSON.stringify(data));
export const getTownshipId = () => localStorage.getItem('townshipId');
 export const setTownshipId = (id) => {
   localStorage.setItem('townshipId',JSON.stringify(id));
 }
 export const setShippingFees = (price) => localStorage.setItem('shippingFees',JSON.stringify(price));
export const getShippingFees = () => localStorage.getItem('shippingFees');
export const setVariantItem = (items) => localStorage.setItem('variantsItems',JSON.stringify(items));
export const getVariantItem = () => localStorage.getItem('variantsItems');
