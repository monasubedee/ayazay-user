import Layout from '../../components/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  getProductDetail,
  getProductcategory,
  getSimilarProduct,
} from '../../store/product/action';
import { useEffect, useState, useContext } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { clearItemFromCart, addItemtoCheckout, updateItem } from '../../store/cart/cart.action';
import ProductDetailLoading from '../../components/loading/productdetailoading';
import { useSnackbar } from 'notistack';
import { getSearchProduct } from '../../store/product/action';
import { getCartItem, setCartItem } from '../../localStorage/localStorage';
import Image from 'react-image-enlarger';
import AddCartpopup from '../../components/addCartpopup';
import { LangContext } from '../../constants/langcontext';

const ProductDetail = ({
  productDetail,
  productcatagory,
  addItemtoCheckout,
  getProductDetail,
  getProductcategory,
  cartItems,
  updateItem,
}) => {
  const { query } = useRouter();
  const dispatch = useDispatch();
  const [mainImg, setMainImg] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [sideProduct, setSideProduct] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const [limitError, setLimitError] = useState(null);
  const [variant, setVariant] = useState(null);
  const [zoomed, setZoomed] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [buyPopUp, setBuyPopUp] = useState(false);
  const router = useRouter();
  const [butttonDisable, setButtonDisable] = useState(false);
  const { lang, language } = useContext(LangContext);
  const { similarProducts } = useSelector((state) => state.product);

  useEffect(() => {
    getProductDetail(query.id);
  }, [query]);

  const searchProduct = (search_value) => {
    dispatch(getSearchProduct(search_value));
  };

  useEffect(() => {
    if (productcatagory !== null) {
      setSideProduct(productcatagory);
    }
  }, [productcatagory]);

  useEffect(() => {
    if (productDetail !== null) {
      setProduct(productDetail);
      console.log('product category is', productDetail.shop.id);
      localStorage.setItem('shop_id', productDetail.shop.id);
      setMainImg(null);
      setVariant(
        productDetail.variants.length > 1 ? productDetail.variants[1] : productDetail.variants[0]
      );
    }
  }, [productDetail]);

  useEffect(() => {
    let id = localStorage.getItem('shop_id');
    dispatch(getSimilarProduct(id));
  }, []);

  useEffect(() => {
    if (variant !== null) {
      if (variant.qty === 0) {
        setButtonDisable(true);
        setQuantity(1);
      } else {
        setButtonDisable(false);
      }
    }
  }, [variant]);

  useEffect(() => {
    if (product !== null) {
      if (product.shop.length !== 0) {
        getProductcategory(product.shop.id);
      }
      if (cartItems.length !== 0) {
        let existingcart = cartItems.find((cartItem) => cartItem.product_id === product.id);

        if (existingcart) {
          setQuantity(existingcart.quantity);
        }
      }
    }
  }, [product, cartItems]);

  const createMarkup = () => {
    return { __html: product.description_english };
  };

  const updateimg = (e) => {
    setMainImg(e.target.src);
  };
  const increase = () => {
    if (quantity < variant.qty) {
      setQuantity(quantity + 1);
    } else {
      setLimitError(`${lang.limited}`);
      setTimeout(() => {
        setLimitError(null);
      }, 2000);
    }
  };
  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const addtocart = () => {
    let newprodouctdetail = product;
    newprodouctdetail.quantity = quantity;
    let productdetail = newprodouctdetail.variants;
    if (Number.isNaN(quantity)) {
      setLimitError('Item have to be one and more');
      setTimeout(() => {
        setLimitError(null);
      }, 2000);
    } else {
      console.log(variant);
      const cartData = {
        product_id: newprodouctdetail.id,
        name_english: newprodouctdetail.name_english,
        name_myanmar: newprodouctdetail.name_myanmar,
        shop: newprodouctdetail.shop,
        variants: variant,
        quantity: quantity,
        limit: null,
      };

      let cart = getCartItem();
      const existingcart =
        cart !== null
          ? JSON.parse(cart).find(
            (item) =>
              item.product_id === cartData.product_id && item.variants.id === cartData.variants.id
          )
          : null;
      const sameshop =
        cart !== null ? JSON.parse(cart).find((item) => item.shop.id === cartData.shop.id) : null;
      if (cart === null) {
        callAddCart([cartData], cartData);
      } else if (existingcart) {
        const existingItem = JSON.parse(cart).map((cartItem) => {
          if (
            cartItem.product_id === cartData.product_id &&
            cartItem.variants.id === cartData.variants.id
          ) {
            return { ...cartItem, quantity: cartData.quantity };
          } else {
            return { ...cartItem };
          }
        });
        callAddCart(existingItem, cartData);
      } else if (sameshop) {
        const newItems = [...JSON.parse(cart), { ...cartData }];
        callAddCart(newItems, cartData);
      } else {
        if (JSON.parse(cart).length === 0) {
          callAddCart([cartData], cartData);
        } else {
          setPopUp(true);
        }
      }
    }
  };

  const updateAddtoCart = () => {
    let newprodouctdetail = product;
    newprodouctdetail.quantity = quantity;

    const cartData = {
      product_id: newprodouctdetail.id,
      name_english: newprodouctdetail.name_english,
      shop: newprodouctdetail.shop,
      variants: variant,
      quantity: quantity,
      limit: null,
    };
    setCartItem([cartData]);
    updateItem(cartData);
    setPopUp(false);
    enqueueSnackbar(`${lang.addedTheProduct}`, {
      variant: 'success',
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right',
      },
    });
  };

  const callAddCart = (newItem, addtocarItem) => {
    setCartItem(newItem);
    addItemtoCheckout(addtocarItem);
    enqueueSnackbar(`${lang.addedTheProduct}`, {
      variant: 'success',
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right',
      },
    });
  };

  const updatePrice = (event) => {
    event.preventDefault();
    const result = product.variants.find((item) => item.id === parseInt(event.currentTarget.id));
    if (result) {
      setVariant(result);
      setQuantity(1);
    }
  };

  const quantityChange = (e) => {
    if (e.target.value <= variant.qty) {
      if (e.target.value === '') {
        setLimitError('Item have to be one and more');
        setTimeout(() => {
          setLimitError(null);
        }, 2000);
      }
      setQuantity(parseInt(e.target.value));
    } else {
      setLimitError(`${lang.limited}`);
      setTimeout(() => {
        setLimitError(null);
      }, 2000);
    }
  };

  const buyNow = () => {
    let newprodouctdetail = product;
    newprodouctdetail.quantity = quantity;
    if (Number.isNaN(quantity)) {
      setLimitError('Items have to be one and more');
      setTimeout(() => {
        setLimitError(null);
      }, 2000);
    } else {
      const cartData = {
        product_id: newprodouctdetail.id,
        name_english: newprodouctdetail.name_english,
        shop: newprodouctdetail.shop,
        variants: variant,
        quantity: quantity,
        limit: null,
      };
      let cart = getCartItem();
      const existingcart =
        cart !== null
          ? JSON.parse(cart).find((item) => item.product_id === cartData.product_id)
          : null;
      const sameshop =
        cart !== null ? JSON.parse(cart).find((item) => item.shop.id === cartData.shop.id) : null;
      if (cart === null) {
        callAddCart([cartData], cartData);
        router.push('/addtocart');
      } else if (existingcart) {
        const existingItem = JSON.parse(cart).map((cartItem) => {
          if (cartItem.product_id === cartData.product_id) {
            return { ...cartItem, quantity: cartData.quantity };
          } else {
            return { ...cartItem };
          }
        });
        callAddCart(existingItem, cartData);
        router.push('/addtocart');
      } else if (sameshop) {
        const newItems = [...JSON.parse(cart), { ...cartData }];
        callAddCart(newItems, cartData);
        router.push('/addtocart');
      } else {
        if (JSON.parse(cart).length === 0) {
          callAddCart([cartData], cartData);
          router.push('/addtocart');
        } else {
          setBuyPopUp(true);
        }
      }
    }
  };

  const onFollow = () => {
    alert('Service is not avaliable');
  };

  const updatebuynow = () => {
    let newprodouctdetail = product;
    newprodouctdetail.quantity = quantity;
    const cartData = {
      product_id: newprodouctdetail.id,
      name_english: newprodouctdetail.name_english,
      shop: newprodouctdetail.shop,
      variants: variant,
      quantity: quantity,
      limit: null,
    };
    setCartItem([cartData]);
    updateItem(cartData);
    setBuyPopUp(false);
    router.push('/addtocart');
    enqueueSnackbar(`${lang.addedTheProduct}`, {
      variant: 'success',
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right',
      },
    });
  };

  return (
    <Layout searchProduct={searchProduct}>
      {popUp ? (
        <AddCartpopup
          Cancel={() => setPopUp(false)}
          title={lang.addToCart}
          AddtoCartUpdate={updateAddtoCart}
        />
      ) : null}
      {buyPopUp ? (
        <AddCartpopup
          Cancel={() => setBuyPopUp(false)}
          title={lang.buyNow}
          AddtoCartUpdate={updatebuynow}
        />
      ) : null}
      {product !== null ? (
        <div>
          <div className='productDetails_container'>
            <div className='productDetails_wrapper'>
              <div className='ProductDetails_image_container'>
                <p className='back'>
                  <Link href='/productlist'>
                    <a href='#'>
                      <i className='fa fa-angle-left' aria-hidden='true'></i>Back
                    </a>
                  </Link>
                </p>
                {/*
                <div className="Product_title">
                  <h1>{product.name_english}</h1>
                  <i className="fa fa-caret-down" aria-hidden="true"></i>
                </div> */}
                {/*<div className="Product_brand_container">
                  <div className="Product_Brand">
                    <p>
                      <img src="/images/top-brand.png" alt="top-brand" />
                      {product.name_english}
                    </p>
                  </div>
                  <div className="Product_feedback">
                    <p>
                      {" "}
                      <span>90%</span> Positive feedback
                    </p>
                  </div>
               </div>*/}
                <div className='Product_image'>
                  <Image
                    style={{
                      width: '100%',
                      maxWidth: '240px',
                      maxHeight: '290px',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)!important',
                    }}
                    zoomed={zoomed}
                    src={
                      mainImg
                        ? `${mainImg}`
                        : `${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}${variant !== undefined ? variant.images[0].image_url : null
                        }`
                    }
                    alt=''
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/OfficialStore.png';
                    }}
                    onClick={() => setZoomed(true)}
                    onRequestClose={() => setZoomed(false)}
                  />
                </div>
                <div className='Product_Design_sample'>
                  {variant.images.map((item, index) => {
                    return (
                      <div key={index} className='product_Design_item'>
                        <img
                          src={`${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}${item.image_url}`}
                          alt='#'
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/images/OfficialStore.png';
                          }}
                          onClick={updateimg}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className='Product_description'>
                <div className='Product_title'>
                  <h1>{language === 'en' ? product.name_english : product.name_myanmar}</h1>
                </div>
                <div className='Product_des_para'>
                  {/* <span dangerouslySetInnerHTML={createMarkup()} style={{textTransform:"capitalize"}}></span>*/}
                </div>
                <div className='Product_des_brand'>
                  <div>
                    <p>
                      {lang.brand} <span> {product.brand.name} </span>
                    </p>
                  </div>
                </div>
                <div className='Product_price'>
                  <div className='Product_actual_price'>
                    <p>Ks {variant.price}</p>
                  </div>
                  {/* <div className="Product_discount_container">
                    <div className="Product_discount">
                      <div className="Product_discount_price">
                        <p>ks </p>
                      </div>
                      <div className="Product_discount_percentage">
                        <p>-25 %</p>
                      </div>
                    </div>

                  </div>
                  {/*  <div className="Product_coupon_container">
                    <div className="Proudct_coupon">
                      <p>5,000 ks Coupon</p>
                    </div>
                  </div>*/}
                </div>
                <div className='Product_color_container'>
                  <div className='Product_spec_title'>
                    <p>{lang.color} :</p>
                  </div>
                  <div className='Proudct_image_color_spec'>
                    <p>{variant.color ? variant.color : 'N/A'}</p>
                  </div>
                </div>
                <div className='Product_color_container'>
                  <div className='Product_spec_title'>
                    <p>{lang.size} :</p>
                  </div>
                  <div className='Proudct_image_color_spec'>
                    <p>{variant.size ? variant.size : 'N/A'}</p>
                  </div>
                </div>
                <div className='Product_color_container'>
                  <div className='Product_spec_title'>
                    <p>{lang.weight} :</p>
                  </div>
                  <div className='Proudct_image_color_spec'>
                    <p>{variant.weight ? variant.weight : 'N/A'}</p>
                  </div>
                </div>
                <div className='Product_brand_spec'>
                  <div className='Product_spec_title'>
                    <p>{lang.product} :</p>
                  </div>
                  <div className='Proudct_image_color'>
                    <div className='Proudct__image_detail'>
                      {product.variants !== undefined
                        ? product.variants.map((item) => {
                          return (
                            <div
                              className={
                                item.id === variant.id
                                  ? 'product_spec_item_active'
                                  : 'product_spec_item'
                              }
                              key={item.id}
                              id={item.id}
                              onClick={updatePrice}
                            >
                              <img
                                src={`${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}${item.images[0].image_url}`}
                                alt='#'
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = '/images/OfficialStore.png';
                                }}
                              />
                            </div>
                          );
                        })
                        : null}
                    </div>
                  </div>
                </div>
                <div className='Product_quantity'>
                  <div className='Product_quantity_title'>
                    <p>{lang.quantity} :</p>
                  </div>
                  <div className='Product_quantity_container'>
                    <div className='Product_quantity_action'>
                      <div className='quantity_minus' onClick={decrease}>
                        <i className='fas fa-minus' />
                      </div>
                      <div className='quantiy_amount'>
                        <input onChange={quantityChange} min='1' type='Number' value={quantity} />
                      </div>
                      <div className='quantity_plus' onClick={increase}>
                        <i className='fas fa-plus' />
                      </div>
                    </div>
                    {limitError ? (
                      <div style={{ color: '#aa222a', padding: '10px' }}>{limitError}</div>
                    ) : (
                        ''
                      )}
                    {butttonDisable ? (
                      <div style={{ color: '#aa222a', padding: '10px' }}>Out of Stocks</div>
                    ) : (
                        ''
                      )}
                    <div className='Product_available'>
                      {/* <p>
                        Additional 5% off ( 10 pieces or more) 3494 pieces
                        available{" "}
                      </p>
                    */}
                    </div>
                  </div>
                </div>
                <div className='Proudct_purchase_container'>
                  <div className='Buy_cart'>
                    <button disabled={butttonDisable} className='Product_purchase' onClick={buyNow}>
                      {lang.buyNow}
                    </button>
                    <button disabled={butttonDisable} className='Product_cart' onClick={addtocart}>
                      <a>{lang.addToCart}</a>
                    </button>
                  </div>
                  <div className='Product_reac'>
                    <p className='pc_react'>
                      {' '}
                      <i className='far fa-heart' /> 157
                    </p>
                    <p className='mobile_react'>
                      ADD TO WISHLIST
                      <i className='far fa-heart' />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='Details_view_container'>
            <div className='Details_view_wrapper'>
              <div className='product_advertise'>
                <div className='product_advertise_img'>
                  <img
                    src={`${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}${product.shop.img_url}`}
                    alt='#'
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/OfficialStore.png';
                    }}
                  />
                </div>
                <div className='ad_purchase_container'>
                  <div className='ad_purchase'>
                    <div className='ad_purchase_brand'>
                      <div className='ad_logo'>
                        <img
                          src={`${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}${product.shop.img_url}`}
                          alt=''
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/images/OfficialStore.png';
                          }}
                        />
                      </div>
                      <div className='ad_brand_name'>
                        <p className='official_store'>{product.shop.name}</p>
                        <span>
                          {' '}
                          <img
                            className='square'
                            src='/images/top-brand.png'
                            alt='top-brand'
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/images/OfficialStore.png';
                            }}
                          />
                          {product.shop.type}
                        </span>
                        <p>
                          {' '}
                          <span>90%</span> {lang.positiveFeedback}
                        </p>
                        <p>
                          {' '}
                          <span>8.9K</span> {lang.followers}
                        </p>
                      </div>
                    </div>
                    <div className='ad_btn'>
                      <div className='ad_follow' onClick={onFollow} style={{ cursor: "pointer" }}>
                        <a href='#'>{lang.follow}</a>
                      </div>
                      <div className='ad_store'>
                        <Link href='/shopdetail/[id]' as={`/shopdetail/${product.shop.id}`}>
                          <a>{lang.goStore}</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='Details_des_container'>
                <div className='other_products_container'>
                  <div className='other_products_title'>
                    <h4>Other Products from {product.shop.name}</h4>
                  </div>
                  {Object.values(similarProducts) === null ||
                    Object.values(similarProducts).length === 0 ? (
                      <span style={{ paddingLeft: '20px' }}>{lang.noProducts}</span>
                    ) : (
                      <div className='other_product_list'>
                        {Object.values(similarProducts)[0]
                          .filter((item, index) => index < 4)
                          .map((item) => {
                            console.log('item is', item.id);

                            return (
                              <Link href={`/productdetail/${item.id}`}>
                                <div className='other_products_image_two'>
                                  <img
                                    src={`${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}${item.productImageVariants.length === 0
                                        ? null
                                        : item.productImageVariants[0].image_id.image_url
                                      }`}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = '/images/OfficialStore.png';
                                    }}
                                  />
                                  <div style={{marginTop:"5px"}}>
                                    <span style={{ fontSize:"14px", color: "#aa222a" }}>{item.productVariants[0].variant_id.price} Ks</span>
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                      </div>
                    )}
                  {/* {sideProduct === null || sideProduct.length === 0 ? <span style={{ paddingLeft:"20px"}}>{lang.noProducts}</span> : (
                    <div className='other_product_list'>
                      {sideProduct
                        .filter((item, index) => index < 4)
                        .map((item) => {
                          return (
                            <Link
                              href='/productdetail/[1]'
                              as={`/productdetail/${item.product_id.id}`}
                            >
                              <div className='other_products_image_two'>
                                <img
                                  src={`${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}${
                                    item.product_id.productImageVariants.length === 0
                                      ? null
                                      : item.product_id.productImageVariants[0].image_id.image_url
                                  }`}
                                  alt=''
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = '/images/OfficialStore.png';
                                  }}
                                />
                                <div className='other_Products_price'>
                                  <p>
                                    Ks{' '}
                                    {item.product_id.productVariants.length === 0
                                      ? null
                                      : item.product_id.productVariants[0].variant_id.price}{' '}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                    </div>
                    )} */}
                </div>

                <div className='details_review_container'>
                  <div className='Product_title'>
                    <h1 style={{ textTransform: 'capitalize' }}>
                      {language === 'en' ? product.name_english : product.name_myanmar}
                    </h1>
                  </div>
                  <div
                    style={{ fontSize: '16px', margin: '10px 0' }}
                    dangerouslySetInnerHTML={createMarkup()}
                  />
                  <div className='review_image'>
                    {product.variants[0].images.map((item, index) => {
                      return (
                        <div key={index} className='review_img'>
                          <img
                            src={`${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}${item.image_url}`}
                            alt='#'
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/images/OfficialStore.png';
                            }}
                            onClick={updateimg}
                          />
                        </div>
                      );
                    })}
                  </div>
                  {/*    <div className="review_title">
                    <p>Product Details :</p>
                  </div>
                  <div className="review_para">
                    <p>
                      {" "}
                      <strong>
                        Package Included: 1 x Watch Band with adapters (watch
                        not included)
                      </strong>
                    </p>
                    <p>
                      {productDetail.description_english}
                    </p>
                  </div>
                  <div className="review_image_wrapper">
                    <div className="review_image">
                      {productDetail.productImageVariants.map((item) => {
                        console.log(item.image_id.image_url)
                        return (
                          <div className="review_img" >
                            <img src={`${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}${item.image_id.image_url}`} alt="#" />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div className="review_des">
                    <h1>Product description</h1>
                    <p>
                      Superior Quality: 100% Genuine Leather Band – Premium soft
                      top genuine leather with fashionable craftsmanship, New
                      stylish design, comes with stainless steel polished
                      silver-coloured Classic buckle, anti-slip &amp;
                      sweat-absorbent.
                    </p>
                    <p>
                      {" "}
                      Fit Size: Fits 6.3"-7.9" (160mm-200mm) wrist, it can be
                      men's or women's, comfortable touch feeling on your wrist,
                      simple but attractive, look fantastic and giving a nice
                      professional look on any occasion.
                    </p>
                    <p>
                      {" "}
                      Warm Tips: The Real Color of this item may be slightly
                      different from the pictures shown on the website caused by
                      many factors. Such as brightness of your monitor and light
                      brightness. And because of the natural variability of the
                      Crazy Horse leather used in this band, the color may vary
                      somewhat. However the style, quality and the everything
                      else are all the same.
                    </p>
                  </div>*/}
                </div>
              </div>
            </div>
          </div>

          <style jsx>{`
          * {
            margin: 0;
            padding: 0;
            box- sizing: border-box;
          }
          body {
            font - family: "Montserrat";
          }
          a {
            text - decoration: none;
          }
          ul,
          li {
            list - style: none;
          }
          .row {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            width: 100%;
          }

          .column {
            display: flex;
            flex-direction: column;
            flex-basis: 100%;
            flex: 1;
          }
          .back {
            font-size: 12px;
            color: #272b35;
            display: none;
          }
          .back i {
            padding - right: 5px;
          }
          .productDetails_container {
            max-width: 1140px;
            margin: auto;
            padding: 36px 0px 63px 0px;
            color: #2d2d2d;
            margin: 0 auto;
          }
          .des_para{
            color:red !important;
          }
          .back{
              width:90px;
              display:none;
              background-color:#e4e9f0;
              border: none;
              padding: 15px;
              border-radius: 8px;
              text-align: center;
              text-decoration: none;
              font-size: 16px;
              margin: 4px 2px;
              color: #394358;
              cursor: pointer;
          }
          .square{
            padding-right:5px;
          }
          .back i{
            font-size:14px;
            padding-right:10px;
          }
          .productDetails_wrapper {
            display: flex;
            margin: 0 auto;
          }
          .product_advertise {
            display: flex;
            flex: 1 1;
            flex-direction: row;
            flex-wrap: wrap;
          }
          .product_advertise_img {
            display: flex;
            flex-direction: column;
            flex-basis: 100%;
            flex: 1;
          }
          .product_advertise_img img {
            height: 210px;
          }

          .ProductDetails_image_container {
            margin-right: 100px;
            width:30%;
          }
          .Product_title{
            display:flex;
          }
          .Product_title i{
           display:flex;
           align-items:center;
           font-size:20px;
           padding-left:10px;
          }
          .Product_title h1 {
            text-transform: capitalize;
            font-size: 23px;
            font-weight: 600;
            width:100%;
            line-height: 1.6em;
          }
          .Product_brand_container {
            display: flex;
            margin-top: 10px;
            margin-bottom: 28px;
          }
          .Product_Brand{
            margin-right:33px;
          }
          .Product_Brand img{
            padding-right:10px;
          }

          .Product_Brand p {
            font-size: 18px;
            font-weight: 500;
            min-width:max-content;
          }
          .Product_feedback p{
            font-size:18px;
            font-weight:500;
            min-width:max-content;
          }
          .Product_Brand i {
            margin-right: 5px;
          }
          .Product_feedback span {
            color: #f5a623;
          }
          .Product_image {
            width: auto;
            height: 300px;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            border: 1px solid #e8e8e8;
          }
          .cross{

          }
          .Product_image img {
            width:100%;
            max-width:240px;
            max-height:290px;
          }
          .Product_Design_sample {
            display: flex;
            overflow-x: scroll;
            overflow-y: hidden;
            scroll-behavior: smooth;
            margin-top: 21px;
          }
          ::-webkit-scrollbar {
               display: none;
          }
          .product_Design_item img {
            margin-right: 8px;
            cursor:pointer;
            width: 56px;
            height:56px;
            border: solid 1px #e8e8e8;
          }
          .mobile_react {
            display: none;
          }
          .Product_description {
            width: 60%;
          }
          .Product_des_para {
            font-size: 16px;
            font-weight: 500;
            line-height: 1.75;
            margin-bottom: 8px;
          }
          .Product_des_brand,
          .Product_des_brand span {
            font-size: 16px;
            font-weight: 600;
            color: #2a2a2a;
            margin-bottom: 24px;
          }
          .Product_des_brand span {
            color: #aa222a;
          }
          .Product_price {
            display: flex;
            margin-bottom: 24px;
          }
          .Product_discount_container {
            width: 175px;
            padding: 20px 16px 20px 20px;
            border: solid 1px #f3f3f3;
          }
          .Product_discount {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
          }
          .Product_discount_price p {
            text - decoration: line-through;
            font-size: 16px;
            font-weight: 600;
            color: #8d8d8d;
          }
          .Product_actual_price p {
            font-size: 24px;
            font-weight: 800;
            color: #aa222a;
          }
          .Product_coupon_container {
            margin-left: 36px;
            padding: 2px;
          }
          .Proudct_coupon {
            background: linear-gradient(108deg, #d54754 5%, #aa222a 115%);
            padding: 2px 12px;
            font-size: 14px;
            font-weight: 500;
            color: #ffffff;

          }
          .Product_color_title {
            font-size: 14px;
            font-weight: 500;
            color: #2a2a2a;
          }
          .Proudct_image_color {
            display: block;
            margin-top: 12px;
            margin-bottom: 24px;
          }
          .Proudct_image_color_detail{

          }
          .product_img img{
            width:50px;
            height:50px;
          }
          .product_color_item {
            margin-right: 8px;
          }
          .product_color_item img {
            width: 56px;
            border: solid 1px #f3f3f3;
          }
          .Product_brand_spec {
            margin-bottom: 24px;
          }
          .Product_spec_title {
            font-size: 16px;
            font-weight: 600;
            color: #989898;
            margin-bottom: 12px;
          }
          .product_spec_item {

            cursor:pointer;
            font-size: 16px;
            font-weight: 600;
            border-radius: 2px;
            border: solid 1px #e8e8e8;
            padding: 6px 8px;
            margin-right: 8px;
          }
          .Proudct_image_color_spec{
            text-transform:uppercase;
            margin:15px 0;
          }
          .Proudct__image_detail{
            width:100%;
            display: flex;
            overflow-x: scroll;
            overflow-y: hidden;
            -webkit-scroll-behavior: smooth;
            -moz-scroll-behavior: smooth;
            -ms-scroll-behavior: smooth;
            scroll-behavior: smooth;
          }
          .product_spec_item_active img,
          .product_spec_item img{
            width:50px;
            height:50px;
          }
          .product_spec_item_active{
            display:flex;
            flex-direction:column;
            border: solid 1px #aa222a;
            padding: 6px 8px;
            font-size: 16px;
            font-weight: 600;
            margin-right: 8px;
          }
          .Product_quantity {
            margin-bottom: 39px;
          }
          .Product_quantity_title p {
            font-weight: 500;
            color: #989898;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 12px;
          }
          .Product_quantity_container {
            display: flex;
          }
          .Product_quantity_action {
            display: flex;
            margin-right: 25px;
          }
          .quantiy_amount input{
            width:40px;
            margin: 8px 0px;
            padding:7px;
            outline:0;
            text-align:center;
            border:0.5px solid #e7e7e7;
          }
          .quantity_minus i{
            border-top-left-radius:5px;
            border-bottom-left-radius:5px;
          }
          .quantity_plus i{
            border-top-right-radius:5px;
            border-bottom-right-radius:5px;
          }
          .quantity_minus,
          .quantity_plus{
            position: relative;
            width: 50%;
            margin: 0 15px;
            font-size:16px;
          }
          .quantity_minus i,
          .quantity_plus i{
            background-color:#e7e7e7;
            padding:8px;
          }
          .quantity_minus i,
          .quantity_plus i,
          .quantiy_amount h5 {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            margin: 0;
          }

          .Proudct_purchase_container {
            display: flex;
          }
          .Buy_cart {
            display: flex;
          }
          .Product_purchase,
          .Product_cart {
            margin-right: 8px;
          }
          .Product_purchase:disabled{
            background-color: #c7c7c7;
            color: #666666;
            cursor: not-allowed;
            pointer-events: none;}
          .Product_cart:disabled{
            background-color: #c7c7c7;
            color: #666666;
            cursor: not-allowed;
            pointer-events: none;}


          .Product_cart,
          .Product_purchase {
            width: 180px;
            outline:0;
            box-shadow:none;
            border:none;
            padding: 17px;
            background-color: #aa222a;
            border-radius: 6px;
            font-size: 16px;
            font-weight: 600;
            letter-spacing: 0.75px;
            text-align: center;
            cursor:pointer;
          }
          .Product_cart,
          .Product_purchase  {
            color: #ffffff;
          }

          .Product_cart {
            background-color: #f58723;
          }

          .Product_reac {
            border-radius: 2px;
            border: solid 1px #e8e8e8;
          }
          .Product_reac p {
            padding: 16px 13px;
            font-weight:600;
          }

          .Details_view_container {
            padding: 30px 0px;
            background-color: #ececec;
          }
          .Details_view_wrapper {
            max-width: 1140px;
            margin: 0 auto;
          }
          .product_advertise {
            margin-bottom: 30px;
          }
          .Product_available p{
            font-size:14px;
            color:#8f8f8f;
            width:63%;
          }

          .ad_logo img {
            width: 100px;
            height:100px;
            margin-right: 24px;
          }
          .ad_purchase_container {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            flex: 1;
            background-color: #ffffff;
          }
          .ad_purchase_brand {
            display: flex;
          }

          .ad_purchase {
            padding: 48px;
            display: flex;
            justify-content: space-around;
          }

          .ad_follow {
            width: 180px;
            text-align: center;
            border-radius: 6px;
            border: solid 1px #aa222a;
            padding: 14px 0px;
          }
          .ad_follow a {
            color: #aa222a;
          }
          .ad_store {
            text-align: center;
            width: 180px;
            border-radius: 6px;
            background-color: #aa222a;
            padding: 14px 0px;
            margin-top: 8px;
          }
          .ad_store a {
            color: #ffffff;
          }

          .ad_brand_name {
            margin-right: 24px;
            width: 157px;
          }
          .ad_brand_name p {
            padding-top: 5px;
          }

          .ad_brand_name p:first-child {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 6px;
            color: #2d2d2d;
          }
          .official_store {
            font-size: 16px;
          }
          .ad_brand_name span {
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 8px;
          }
          .ad_brand_name span i {
            padding-right: 8px;
          }
          .ad_brand_name p {
            font-size: 14px;
            font-weight: 500;
            color: #989898;
          }
          .ad_brand_name p span {
            color: #2d2d2d;
          }

          .Details_des_container {
            display: flex;
          }
          .other_products_container,
          .details_review_container {
            background-color: #ffffff;
          }
          .other_products_container {
            width: 30%;
            padding-bottom: 34px;
            height: 100%;
            margin-right:30px;
          }
          .details_review_container {
            margin:0 auto;
            width: 100%;
            padding: 25px 40px 30px 40px;
          }
          .other_products_title h4 {
            font-size: 16px;
            font-weight: bold;
            margin-top: 20px;
            margin-bottom: 20px;
            padding: 0 20px;
          }
          .other_product_list {
            text-align: center;
          }
          .other_products_image {
            padding: 0 20px;
          }
          .other_products_image img {
            width: 80%;

            border: solid 1px #e8e8e8;
          }
          .other_products_image_two {
            padding: 0 20px;
            cursor:pointer;
          }
          .other_products_image_two img {
            width: 80%;
            height:150px;
            margin-top:7px;
            max-width:200px;
            border: solid 1px #e8e8e8;
          }
          .other_Products_price p {
            color: #aa222a;
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 20px;
            margin-top: 8px;
          }

          .review_title {
            margin-bottom: 24px;
            font-size: 16px;
            font-weight: 500;
            line-height: 1.75;
          }
          .review_para {
            font-size: 16px;
            font-weight: 500;
            line-height: 1.75;
            color: #2d2d2d;
          }

          .review_para p {
            margin-bottom: 24px;
          }
          .review_img{
            padding:20px;
          }
          .review_image img {
            width: 70%;

          }
          .review_des h1 {
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 24px;
          }
          .review_des p {
            font-size: 16px;
            font-weight: 500;
            margin-top: 24px;
            line-height: 1.75;
          }
          @media (max-width: 1155px) {
            .ad_brand_name {
              width: auto;
            }
          }
          @media (max-width: 1050px) {
            .Product_cart,
            .Product_purchase {
              width: auto;
            }
          }

          @media (max-width: 876px) {
            .ProductDetails_image_container {
              width:90%;
              margin:0 auto;
            }
            .back{
              display:block;
              margin-bottom:16px;
              font-size:14px;
            }
            .Product_image img{
              width:100%;
              max-width:330px;
            }

            .Product_description {
              width: 90%;
              margin: 20px 20px 30px 20px;
            }
            .product_advertise {
              margin: 0 20px 30px 20px;
            }
            .product_advertise_img {
              width: 100%;
              display: flex;
              flex-direction: column;
              flex-wrap: wrap;
              flex: 1 1 auto;
              background-color: #ffffff;
            }
            .ad_purchase_container {
              width: 100%;
              display: flex;
              flex-direction: column;
              flex-wrap: wrap;
              flex: 1 1 auto;
              background-color: #ffffff;
            }
            .product_advertise_img img {
              max-width: 100%;
            }
            .ad_purchase_container > * {
              max-width: 100%;
            }
            .ad_purchase {
              width: 100%;
              flex-direction: column;
              flex-wrap: wrap;
              width: auto;
              margin: 0 auto;
              padding: 50px 0px 30px 0px;
            }
            .ad_brand_name {
              margin-right: 0px;
            }
            .ad_btn {
              width: 100%;
              margin: 0 auto;
              display: flex;
              padding-top: 23px;
              font-size: 14px;
              font-weight: 600;
            }
            .ad_follow {
              width: 90%;
              margin-right: 5%;
            }
            .ad_store {
              width: 90%;
              margin-top: 0px;
            }
            .Details_des_container {
              width: 100%;
              margin: 0 auto;
              flex-direction: column-reverse;
            }
            .details_review_container {
              width: 95%;
              margin: 0 auto;
            }
            .other_products_container {
              margin-top: 20px;
              margin-left: auto;
              margin-right: auto;
              width: 95%;
              padding-bottom: 0px;
            }

            .other_products_image img {
              width: 100%;
              min-height: 150px;
              max-height:200px;
              padding-bottom: 10px;
            }
            .other_products_image_two{
              width:100%;
              padding:0;
            }
            .other_products_image_two img{
              width :100%;
            }
            .review_img img{
              width:100%;
            }

              @media screen and (min-width: 400px) {

                    .other_products_image_two{
                        flex: 0 1 calc(24% - 1em);
                    }
                }
                  @media screen and (min-width: 300px) {
                       .other_product_list {
                        margin:0 auto;
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-around;
                    }
                    .other_products_image_two{
                        flex: 0 1 calc(48% - 1em);
                    }
                }
            .other_Products_price {
              padding - bottom: 20px;
            }
            .other_Products_price p {
              font-size: 13px;
              font-weight: 600;
            }
            .productDetails_wrapper {
              display: flex;
              flex-direction:column;
              justify-content: center;
            }
          }
          @media(max-width:560px){
            .Product_Brand p,
            .Product_feedback p{
              min-width:100%;
            }
            .Product_title h1{
              max-width:100%;
            }
          }

          @media (max-width: 476px) {
            .Product_title h1 {
              font-size: 20px;
              font-weight: 800;
            }
            .Product_feedback p,
            .Product_Brand p {
              font-size: 14px;
              font-weight: 500;
            }
            .Product_cart {
              width: 60%;
            }
            .pc_react {
              display: none;
            }
            .mobile_react {
              display: block;
            }
            .mobile_react i {
              padding-left: 70px;
            }
            .Proudct_purchase_container {
              flex-direction: column;
            }
            .Buy_cart {
              margin-bottom: 10px;
            }
            .Product_purchase {
              width: 100%;
            }
            .Product_reac {
              text-align: center;
            }

            .productDetails_container {
              font-size: 14px;
              padding-bottom: 0px;
            }
            .Product_des_para {
              font-size: 14px;
              font-weight: 500;
            }
            .Product_des_brand,
            .Product_des_brand span {
              font-size: 14px;
              font-weight: 600;
            }
            .Product_discount_price p {
              font-size: 14px;
            }
            .product_advertise {
              margin: 0px;
            }
            .details_review_container {
              width: 100%;
            }
            .other_products_container {
              width: 100%;
            }
            .Details_view_container {
              padding-top: 10px;
              padding-bottom: 0px;
            }
            .Product_coupon_container {
              margin-left: 10px;
            }
            .Product_actual_price p {
              font-size: 20px;
            }
            .quantity_minus,
            .quantity_plus {
              border-radius: 50%;
              background-color: #e7e7e7;
              height: auto;
              width: auto;
              padding: 0px;
            }
            .quantity_minus i,
            .quantity_plus i {
              color: #2a2a2a;
            }

            .Product_cart,
            .Product_purchase {
              width: 50%;
              margin-bottom: 10px;
            }
            .review_image img {
              width: 100%;
            }
            .other_products_title h4 {
              padding: 0 12px;
            }
            .other_products_image {
              padding: 0px 7px;
            }
            .other_product_list{
              margin-bottom:20px;
            }
          }
          @media (max-width: 360px) {
              .back{
              display:block;

            }
            .review_title {
              margin-bottom: 12px;
            }
            .details_review_container {
              padding-left: 13px;
              padding-right: 13px;
            }
            .Product_cart {
              padding: 13px 4px;
              width: 153px;
            }
            .Product_Brand {
              padding-right: 16px;
              margin-right: 0px;
            }
            .productDetails_container {
              padding-top: 20px;
            }
            .review_para {
              font-size: 14px;
            }
            .review-para p {
              margin-bottom: 17px;
            }
            .review_des p {
              font-size: 14px;
              margin-top: 17px;
            }
            .other_products_container {
              margin-top: 0px;
            }
            .product_advertise {
              margin-bottom: 0px;
            }
          }
          @media (max-width: 320px) {
            .product_advertise {
              margin: 0 2px 30px 2px;
            }
            .other_Products_price p {
              font-size: 13px;
              font-weight: 600;
            }
          }
              @media screen and (min-width: 576px) {
            .review_image {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                text-align:center;
            }

            .review_img{
                flex: 0 1 calc(50% - 1em);
            }
           }
          `}</style>
        </div>
      ) : (
          <ProductDetailLoading />
        )}
    </Layout>
  );
};

const mapStateToprops = (state) => ({
  productDetail: state.product.productDetail,
  productcatagory: state.product.productcategory,
  cartItems: state.cart.cartItems,
});

const mapDispatchProps = (dispatch) => ({
  clearItem: (item) => dispatch(clearItemFromCart(item)),
  addItemtoCheckout: (item) => dispatch(addItemtoCheckout(item)),
  getProductDetail: (item) => dispatch(getProductDetail(item)),
  getProductcategory: (item) => dispatch(getProductcategory(item)),
  updateItem: (item) => dispatch(updateItem(item)),
});

export default connect(mapStateToprops, mapDispatchProps)(ProductDetail);
