import Layout from '../components/Layout';
import PopupLogin from '../components/PopupLogin';
import { useState, useEffect, useContext } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectCartItems,
  selectCartTotal,
  selectCartItemsCount,
  selectShippingFees,
} from '../store/cart/cart.selector';
import {
  clearItemFromCart,
  reset,
  addItem,
  removeItem,
  updateQuantity,
  limitItem,
  checkItemAll,
  checkItem,
  updatetestItem,
} from '../store/cart/cart.action';
import { customLogin } from '../store/login/action';
import { cleanEthic } from '../store/login/action';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { getSearchProduct } from '../store/product/action';
import { getCartItem, setCartItem, getToken } from '../localStorage/localStorage';
import { LangContext } from '../constants/langcontext';
import api from '../constants/api';
import { red } from '@material-ui/core/colors';

const AddToCart = ({
  cartItems,
  clearItem,
  total,
  count,
  addItem,
  removeItem,
  updateQuantity,
  limitItem,
  resetItem,
  checkItemAll,
  checkItem,
  updatetestItem,
}) => {
  const [loginmodal, setLoginModal] = useState(false);
  const [selectedCarts, setselectedCarts] = useState([]);
  const [deletebutton, setdeletebutton] = useState(false);
  const [selectCheck, setSelectCheck] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [emptyCart, setEmptycart] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [limitError, setLimitError] = useState(false);
  const dispatch = useDispatch();
  const { lang, language } = useContext(LangContext);

  const router = useRouter();

  const searchProduct = (search_value) => {
    dispatch(getSearchProduct(search_value));
  };

  const closeclick = () => {
    setLoginModal(false);
  };

  useEffect(() => {
    cartItems.map((item) => {
      testvarints(item.variants.id);
    });
  }, []);

  const testvarints = async (id) => {
    try {
      const res = await api.get(`/variant/${id}`);
      if (res.status === 200) {
        const rescart = cartItems.map((item) => {
          console.log(res.data);
          if (item.variants.id === res.data.id) {
            if (res.data.qty === 0) {
              return {
                ...item,
                actualbuy: false,
                variants: {
                  color: res.data.color,
                  id: res.data.id,
                  images: item.variants.images,
                  price: res.data.price,
                  size: res.data.size,
                  qty: res.data.qty,
                  weight: res.data.weight,
                },
              };
            } else {
              return {
                ...item,
                variants: {
                  color: res.data.color,
                  id: res.data.id,
                  images: item.variants.images,
                  price: res.data.price,
                  size: res.data.size,
                  qty: res.data.qty,
                  weight: res.data.weight,
                },
              };
            }
          } else {
            return { ...item };
          }
        });
        setCartItem(rescart);
        updatetestItem(rescart);

        console.log(rescart, 'rescart');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleclick = () => {
    const existingerror = cartItems.find((item) => isNaN(item.quantity) || item.quantity === null);
    if (cartItems.length !== 0) {
      if (existingerror) {
        cartItems.map((item) => {
          if (isNaN(item.quantity) || item.quantity === null) {
            limitItem(item, 'Item have to be one and more');
            setTimeout(() => {
              limitItem(item, null);
            }, 2000);
          }
        });
      } else {
        if (getToken() !== null) {
          router.push('/order/deliveryinformation');
        } else {
          setLoginModal(true);
        }
      }
    } else {
      enqueueSnackbar('Please add the product', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
      });
    }
  };
  useEffect(() => {
    const existcheck = cartItems.find((cart) => cart.actualbuy === true);
    if (!existcheck) {
      setdeletebutton(false);
      setSelectCheck(false);
    } else {
      setdeletebutton(true);
      setSelectCheck(true);
    }
  }, [cartItems]);

  useEffect(() => {
    if (cartItems.length === 0) {
      setEmptycart(true);
    } else {
      setEmptycart(false);
      setItemList([...cartItems]);
    }
  }, [cartItems]);

  const handleselectChange = (e) => {
    let checkedall = e.target.checked;
    const existcheck = cartItems.map((Item) => {
      if (Item.variants.qty !== 0) {
        return { ...Item, actualbuy: !Item.actualbuy };
      } else {
        return { ...Item };
      }
    });

    if (checkedall) {
      checkItemAll(true);
      setCartItem(existcheck);
    } else {
      checkItemAll(false);
      setCartItem(existcheck);
    }
  };
  const handleSelectOne = (event, checkitem) => {
    const existcheck = cartItems.find(
      (cart) =>
        cart.product_id === checkitem.product_id && cart.variants.id === checkitem.variants.id
    );
    let item;
    if (existcheck) {
      item = cartItems.map((Item) =>
        Item.product_id === checkitem.product_id && Item.variants.id === checkitem.variants.id
          ? { ...Item, actualbuy: !Item.actualbuy }
          : { ...Item }
      );
    } else {
      item = cartItems.map((Item) =>
        Item.product_id === checkitem.product_id && Item.variants.id === checkitem.variants.id
          ? { ...Item, actualbuy: true }
          : { ...Item }
      );
    }

    setCartItem(item);
    checkItem(checkitem);
  };

  useEffect(() => {
    let cart = getCartItem();
    if (cart !== null) {
      const existingItem = JSON.parse(cart).map((cartItem) => {
        console.log(cartItem);
        if (cartItem.actualbuy === undefined) {
          return { ...cartItem, actualbuy: false };
        } else {
          return { ...cartItem };
        }
      });
      setCartItem(existingItem);
    }
  }, [getCartItem]);

  const selectedDelete = () => {
    let cart = getCartItem();
    if (cart !== null) {
      const filter = JSON.parse(cart).filter((cartItem) => cartItem.actualbuy !== true);
      console.log(filter);
      setCartItem(filter);
      resetItem();
    }
  };

  let itemNumber = cartItems !== undefined ? Object.keys(cartItems).length : 0;

  const increaseItem = (val) => {
    let cart = getCartItem();
    const existingcart =
      cart !== null ? JSON.parse(cart).find((item) => item.product_id === val.product_id) : null;
    if (cart === null) {
      setCartItem([cartData]);
    } else if (existingcart) {
      const existingItem = JSON.parse(cart).map((cartItem) => {
        if (cartItem.product_id === val.product_id) {
          return { ...cartItem, quantity: val.quantity + 1 };
        } else {
          return { ...cartItem };
        }
      });
      setCartItem(existingItem);
    } else {
      const newItems = [...JSON.parse(cart), { ...val }];
      setCartItem(newItems);
    }
  };

  const clearLocalItem = (val, id) => {
    console.log(val, id, 'id');
    let cart = getCartItem();
    const deleteItem = JSON.parse(cart).filter(
      (cartItem) =>
        (cartItem.product_id !== val && cartItem.variants.id === id) ||
        (cartItem.product_id === val && cartItem.variants.id !== id)
    );
    console.log(deleteItem, 'deleteItem');
    setCartItem(deleteItem);
  };

  const DecreaseItem = (val) => {
    let cart = getCartItem();
    const existingcart =
      cart !== null
        ? JSON.parse(cart).find(
            (item) => item.product_id === val.product_id && item.variants.id === val.variants.id
          )
        : null;

    if (existingcart.quantity === 1) {
      const deleteItem = JSON.parse(cart).map((cartItem) => cartItem);
      setCartItem(deleteItem);
      limitItem(val, "Can't reduce");
      setTimeout(() => {
        limitItem(val, null);
      }, 2000);
    } else {
      const reduceQuantity = JSON.parse(cart).map((cartItem) =>
        cartItem.product_id === val.product_id && cartItem.variants.id === val.variants.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
      setCartItem(reduceQuantity);
    }
  };

  const handlequantity = (item, value) => {
    if (value <= item.variants.qty) {
      if (value === '') {
        limitItem(item, 'Item have to be one and more');
        setTimeout(() => {
          limitItem(item, null);
        }, 2000);
      }
      let cart = getCartItem();
      const existingcart =
        cart !== null
          ? JSON.parse(cart).find(
              (cart) => cart.product_id === item.product_id && cart.variants.id === item.variants.id
            )
          : null;
      if (existingcart) {
        const existingItem = JSON.parse(cart).map((cartItem) => {
          if (
            cartItem.product_id === item.product_id &&
            item.variants.id === cartItem.variants.id
          ) {
            return { ...cartItem, quantity: parseInt(value) };
          } else {
            return { ...cartItem };
          }
        });
        setCartItem(existingItem);
      } else {
        const newItems = [...JSON.parse(cart), { ...cart }];
        setCartItem(newItems);
      }

      updateQuantity(parseInt(value), item);
    } else {
      limitItem(item, 'Item is Limited');
      setTimeout(() => {
        limitItem(item, null);
      }, 2000);
    }
  };

  const gotbackproductDetail = (id) => {
    router.push(`/productdetail/${id}`);
  };
  console.log(count);

  return (
    <Layout searchProduct={searchProduct}>
      {loginmodal ? <PopupLogin customLogin={customLogin} closePopupLogin={closeclick} /> : null}

      <div className='addToCartContainer'>
        <div className='itemContainer'>
          {emptyCart === false ? (
            <div className='item_select'>
              <div className='select_checkbox'>
                <input
                  type='checkbox'
                  name='checkAll'
                  checked={selectCheck}
                  onChange={handleselectChange}
                />
                <label className='official'>
                  {lang.selectAll} ( {itemNumber} ITEM(S))
                </label>
              </div>
              {deletebutton === true ? (
                <div
                  className='select_trash'
                  style={{ color: 'red' }}
                  onClick={() => selectedDelete()}
                >
                  <i className='far fa-trash-alt' />
                  <label>{lang.delete}</label>
                </div>
              ) : (
                <div className='select_trash'>
                  <i className='far fa-trash-alt' />
                  <label>{lang.delete}</label>
                </div>
              )}
            </div>
          ) : (
            <div className='item_select'>
              {' '}
              <div className='no_product'>{lang.noProduct}</div>
            </div>
          )}

          <div>
            {/*
            <div className="itemList-title">
              <div className="itemList_des">
                <ul>
                  <li>
                    <input type="checkbox" />
                    <label >Easter Official Store</label>
                    <div className="ribbon">
                      <span>Official Store</span>
                    </div>
                  </li>
                  <li>
                    <p>Spend Ks 29,200 more enjoy free shipping for Standard delivery option</p>
                  </li>
                </ul>
              </div>
              <div className="time">
                <span>
                  Estimate Time: 25 July
                </span>
              </div>
  </div>*/}
            <div className='itemlistContainer'>
              <div className='itemlistscroll'>
                {cartItems === []
                  ? ''
                  : cartItems.map((item) => {
                      return (
                        <div className='item'>
                          <div className='item_check'>
                            <input
                              type='checkbox'
                              className='checkbox'
                              disabled={item.variants.qty === 0 ? true : false}
                              onChange={(event) => handleSelectOne(event, item)}
                              name={item.name_english}
                              checked={item.actualbuy === true ? true : false}
                            />
                            <i
                              className='far fa-trash-alt'
                              onClick={() => {
                                clearItem(item.product_id, item.variants.id);
                                clearLocalItem(item.product_id, item.variants.id);
                              }}
                            />
                          </div>
                          <div
                            className='itemDetail'
                            onClick={() => gotbackproductDetail(item.product_id)}
                          >
                            <div className='itemImage'>
                              <img
                                src={`${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}${item.variants.images[0].image_url}`}
                                alt=''
                              />
                            </div>
                            <div className='itemPara'>
                              <p>{`${
                                language === 'en' ? item.name_english : item.name_myanmar
                              }`}</p>
                              <span>{item.shop.name}</span>
                            </div>
                          </div>
                          {item.variants.qty === 0 ? (
                            <div className='out_of_stock'>
                              <p>Out Of Stocks</p>
                            </div>
                          ) : (
                            ''
                          )}
                          <div className='itemPrice'>
                            <div>
                              <h4>
                                Ks{' '}
                                {item.variants.price * (isNaN(item.quantity) ? 0 : item.quantity)}
                              </h4>
                              {/* <p className="cross">
                           ks 200,000 </p>*/}
                            </div>
                            {/* <p className="percentage">-25%</p>*/}
                          </div>

                          <div className='itemOrderDetail'>
                            <div className='itemCount'>
                              <div
                                className='minus'
                                onClick={() => {
                                  removeItem(item);
                                  DecreaseItem(item);
                                }}
                              >
                                <i className='fas fa-minus' />
                              </div>
                              <div className='count'>
                                <input
                                  min='1'
                                  id={item.product_id}
                                  onChange={(e) => {
                                    handlequantity(item, e.target.value);
                                  }}
                                  type='Number'
                                  value={item.quantity}
                                />
                              </div>
                              <div
                                className='plus'
                                onClick={() => {
                                  if (item.variants.qty > item.quantity) {
                                    addItem(item);
                                    increaseItem(item);
                                  } else {
                                    limitItem(item, `${lang.itemIsLimited}`);
                                    setTimeout(() => {
                                      limitItem(item, null);
                                    }, 2000);
                                  }
                                }}
                              >
                                <i className='fas fa-plus' />
                              </div>
                            </div>
                            {limitError ? (
                              <p
                                style={{
                                  fontSize: '11px',
                                  color: '#aa222a',
                                  padding: '4px',
                                  textAlign: 'center',
                                }}
                              >
                                Can't Reduce
                              </p>
                            ) : (
                              ''
                            )}
                            {item.limit ? (
                              <p
                                style={{
                                  fontSize: '11px',
                                  color: '#aa222a',
                                  padding: '4px',
                                  textAlign: 'center',
                                }}
                              >
                                {item.limit}
                              </p>
                            ) : (
                              ''
                            )}
                            <div className='itemCount_icon'>
                              <i
                                className='far fa-trash-alt bin'
                                onClick={() => {
                                  console.log(item.variants, 'variants');
                                  clearItem(item.product_id, item.variants.id);
                                  clearLocalItem(item.product_id, item.variants.id);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>
        </div>
        <div className='summaryContainer'>
          {/*<div className='perferedContainer'>
            <h4>Preferred Delivery Options</h4>
            <div className='options'>
              <div>
                <i className='fas fa-check-circle circle' />
              </div>
              <div className='option_check'>
                <p className='kyats'>ks 955 </p>
                <p className='standard'>Standard</p>
                <p className='date'>Get by 25-28 July 2020</p>
              </div>
            </div>
                  </div>*/}
          <div className='orderContainer'>
            <h3>{lang.orderSummary}</h3>
            <div className='amount'>
              <div className='amountCategory'>
                <p>
                  {lang.subtotal} ({count} Items)
                </p>
                <p>{total} Ks</p>
              </div>
              {/* <div className='amountCategory'>
                <p>Shipping Fees</p>
                <p>Ks 0</p>
              </div> */}
            </div>
            {/*  <div className="voucher_input">
              <input type="text" placeholder="Enter Voucher Code" />
              <button style={{ cursor: "pointer" }}>APPLY</button>
            </div>*/}
            <div className='Total'>
              <p>{lang.total}</p>
              <h3>Ks {total + 0}</h3>
            </div>
            <div className='checkout'>
              <button disabled={!selectCheck} style={{ cursor: 'pointer' }} onClick={handleclick}>
                {lang.proceed}
              </button>
            </div>
          </div>
        </div>
        <style jsx>{`
          .addToCartContainer {
            max-width: 1140px;
            margin: 0 auto;
            display: flex;
            color: #394358;
            font-family: inherit;
            padding: 30px 0px;
            min-height: 600px;
          }
          .no_product {
            width: 100%;
            text-align: center;
            padding: 10px;
            font-size: 20px;
            font-family: inherit;
            color: #394358;
          }
          * {
            margin: 0;
            padding: 0;
          }
          ul,
          li {
            list-style: none;
          }
          .itemContainer {
            width: 100%;
          }
          .item_select {
            display: flex;
            justify-content: space-between;
            border: 1px solid #cbcbcb;
            padding: 20px 16px;
            border-radius: 5px;
          }
          .item_select > * {
            font-size: 16px;
          }

          .itemList_des label {
            font-weight: bold;
            padding-left: 8px;
            font-size: 16px;
          }
          .itemList_des p {
            font-size: 12px;
            padding-top: 8px;
            padding-left: 20px;
          }
          .itemlistContainer {
            margin-top: 20px;
            border-radius: 8px;
          }

          .itemList-title {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #cbcbcb;
            padding: 20px 16px 20px 16px;
            margin-top: 20px;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            border: 0.5px solid rgb(203, 203, 203);
          }
          .bin {
            padding-left: 10px;
          }
          .time {
            display: flex;
            width: 137px;
          }
          .time span {
            align-self: flex-end;
            font-size: 12px;
            color: #394358;
          }
          .item {
            padding: 20px 16px 0px 16px;
            display: flex;
            justify-content: flex-start;
            border: 1px solid rgb(203, 203, 203);
            border-radius: 8px;
            margin-bottom: 9px;
            position: relative;
          }
          .itemDetail {
            display: flex;
            margin-right: 1%;
            width: 65%;
          }
          .item_check {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
          }
          .item_check i {
            display: none;
          }
          .itemImage {
            width: 20%;
            margin-left: 2%;
            text-align: center;
          }
          .itemImage img {
            width: 50%;
          }
          .itemPara {
            width: 70%;
          }
          .itemPara p {
            font-size: 15px;
            font-weight: 500;
            color: #272f3f;
            line-height: 1.2;
          }
          .itemPara span {
            font-size: 13px;
          }
          .select_trash {
            color: #8e9198;
            cursor: pointer;
          }
          .select_trash i {
            font-size: 16px;
          }
          .select_trash label {
            font-size: 14px;
            padding-left: 4px;
            cursor: pointer;
          }
          .minus {
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
          }
          .plus {
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
          }
          .minus,
          .plus {
            background-color: #f1f3f8;
            padding: 7px 10px;
            cursor: pointer;
          }
          .out_of_stock {
            font-size: 14px;
            font-weight: 600;
            color: #989898;
            position: absolute;
            left: 30px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            text-algin: center;
          }
          .count input {
            width: 40px;
            padding: 8px;
            outline: 0;
            text-align: center;
            border: 0.5px solid #e7e7e7;
          }
          .itemCount {
            display: flex;
            justify-content: flex-end;
          }
          .itemCount i {
            font-size: 12px;
          }
          .itemOrderDetail {
            margin-left: 7%;
            display: flex;
            flex-direction: column;
          }
          .itemPrice {
            width: 20%;
          }
          .itemPrice > * {
            margin-bottom: 4px;
          }
          .itemPrice h4 {
            font-size: 16px;
            color: #aa222a;
          }
          .percentage {
            font-size: 16px;
          }
          .cross {
            font-size: 15px;
            position: relative;
            display: inline-block;
            color: #cbcbcb;
          }
          .cross::before,
          .cross::after {
            content: '';
            width: 100%;
            position: absolute;
            right: 0;
            top: 50%;
          }
          .cross::before {
            border-bottom: 2px solid #cbcbcb;
            -webkit-transform: skewY(-10deg);
            transform: skewY(-10deg);
          }
          .itemCount_icon {
            text-align: end;
            margin-top: 5px;
            margin-bottom: 15px;
          }
          .official {
            padding-left: 8px;
          }

          .ribbon {
            background: #2d6ccd;
            width: auto;
            display: inline-block;
            font-size: 13px;
            margin: auto;
            position: relative;
            color: #fff;
            text-align: center;
            margin-left: 30px;
          }
          .ribbon:before {
            content: '';
            border: 8px solid #2d6ccd;
            border-left-color: transparent;
            border-left-width: 12px;
            position: absolute;
            top: 0;
            left: -20px;
          }
          .ribbon:after {
            content: '';
            border: 8px solid #2d6ccd;
            border-right-color: transparent;
            border-right-width: 12px;
            position: absolute;
            top: 0;
            right: -20px;
          }

          .summaryContainer {
            margin-left: 2%;
            width: 45%;
            display: flex;
            flex-direction: column;
          }
          .perferedContainer {
            padding: 21px 28px;
            border: 1px solid #cbcbcb;
            border-radius: 5px;
            display: flex;
            flex-direction: column;
          }

          .perferedContainer h4 {
            font-size: 16px;
          }
          .options {
            margin-top: 19px;
            width: 70%;
            display: flex;
            justify-content: flex-start;
            background-color: #f5f8ff;
            border: 1px solid #93b3e6;
            padding: 4% 5%;
            font-size: 14px;
            border-radius: 5px;
          }
          .options .circle {
            font-size: 24px;
            color: #2d6ccd;
          }
          .option_check {
            margin-left: 6%;
          }
          .option_check .kyats {
            font-size: 16px;
            font-weight: 600;
          }
          .option_check .standard,
          .option_check .date {
            font-size: 12px;
          }
          .orderContainer {
            padding: 21px 28px;
            border: 1px solid #cbcbcb;
            border-radius: 5px;
            display: flex;
            flex-direction: column;
          }
          .amount {
            margin-top: 20px;
          }
          .amountCategory > * {
            display: block;
          }
          .amountCategory {
            margin-bottom: 16px;
            display: flex;
            justify-content: space-between;
            color: #171717;
          }
          .voucher_input > * {
            display: block;
          }
          .voucher_input {
            margin-top: 10px;
            display: flex;
          }
          .voucher_input input {
            width: 100%;
            border: 1px solid #cbcbcb;
            padding: 12px;
            font-size: 14px;
            color: #7f7f7f;
          }
          .voucher_input button {
            color: #ffffff;
            width: 40%;
            font-size: 14px;
            font-weight: 600;
            background-color: #f58723;
            border: none;
            outline: none;
            padding: 14px;
            letter-spacing: 0.31px;
          }
          .Total {
            padding-top: 20px;
            border-top: 1px solid #cbcbcb;
            display: flex;
            justify-content: space-between;
          }
          .Total h3 {
            font-size: 18px;
            color: #aa222a;
          }
          .checkout {
            margin-top: 20px;
          }
          .checkout button:disabled,
          button[disabled] {
            background-color: #c7c7c7;
            color: #666666;
            cursor: not-allowed;
            pointer-events: none;
          }
          .checkbox[type='checkbox'][disabled] {
            cursor: not-allowed;
          }
          checkbox[disabled]:hover {
          }

          .checkout button {
            border: none;
            outline: none;
            width: 100%;
            color: #ffffff;
            padding: 14px 0px;
            border-radius: 5px;
            background-color: #aa222a;
            font-size: 16px;
            font-weight: 600;
            letter-spacing: 0.31px;
            cursor: pointer;
          }

          @media (max-width: 876px) {
            .addToCartContainer {
              max-width: 1140px;
              margin: 0 auto;
              display: flex;
              flex-direction: column;
              color: #394358;
              font-family: inherit;
              padding: 30px 0px;
            }
            .item_select label {
              font-size: 14px;
              padding-left: 5px;
            }
            .itemImage img {
              height: 150px;
            }
            .select_trash label {
              display: none;
            }
            .itemContainer {
              width: 90%;
              margin: 0 auto;
            }
            .itemList-title {
              border-radius: 8px;
            }
            .summaryContainer {
              margin-top: 20px;
              width: 90%;
              margin: 20px auto;
            }
            .itemList_des p {
              line-height: 1.2em;
              height: 1.7em;
              overflow: hidden;
            }

            .item:last-child {
              margin-right: 0;
            }
            .item {
              width: 50%;
              border-radius: 8px;
              border: 1px solid rgb(203, 203, 203);
              flex-direction: column;
              min-width: 250px;
              justify-content: center;
              padding: 10px;
              margin-right: 20px;
            }
            .time span {
              align-self: flex-start;
            }
            .item_check i {
              display: block;
            }
            .itemDetail {
              flex-direction: column;
              align-items: flex-start;
              width: 100%;
            }
            .itemImage {
              width: 100%;
              margin-bottom: 1em;
            }
            .itemImage img {
              width: 80%;
            }
            .itemPara p {
              line-height: 1.2em;
              height: 2.6em;
              overflow: hidden;
            }
            .itemPrice {
              width: 100%;
              display: flex;
              justify-content: space-between;
              margin: 10px 0;
            }

            .itemlistContainer {
              margin-top: 20px;
              width: 100%;
              height: 100%;
              overflow: hidden;
              border: none;
            }

            ::-webkit-scrollbar {
              display: none;
            }
            .itemlistscroll {
              display: flex;
              width: 100%;
              height: 100%;
              overflow-x: scroll;
              scrollbar-width: none;
              box-sizing: content-box;
            }
            .itemCount_icon {
              display: none;
            }
            .itemOrderDetail {
              margin-left: 0;
              display: flex;
              flex-direction: column;
            }
            @media (max-width: 476px) {
              .item {
                width: 50%;
              }
            }
          }
        `}</style>
      </div>
    </Layout>
  );
};
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
  count: selectCartItemsCount,
});
const mapDispatchProps = (dispatch) => ({
  clearItem: (item, id) => dispatch(clearItemFromCart(item, id)),
  resetItem: () => dispatch(reset()),
  addItem: (item) => dispatch(addItem(item)),
  removeItem: (item) => dispatch(removeItem(item)),
  updateQuantity: (item, id) => dispatch(updateQuantity(item, id)),
  limitItem: (id, value) => dispatch(limitItem(id, value)),
  checkItem: (item) => dispatch(checkItem(item)),
  checkItemAll: (item) => dispatch(checkItemAll(item)),
  cleanEthic: () => dispatch(cleanEthic()),
  updatetestItem: (item) => dispatch(updatetestItem(item)),
});

export default connect(mapStateToProps, mapDispatchProps)(AddToCart);
