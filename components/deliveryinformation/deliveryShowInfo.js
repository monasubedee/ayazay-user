import Link from 'next/link';
import { useContext } from 'react';
import { LangContext } from '../../constants/langcontext';
import { getCartItem, setCartItem } from '../../localStorage/localStorage';

const DeliveryShowInfo = (props) => {
  const { data, handleShowEdit, clearItem, useremail, clearOrder, orderDetail } = props;
  const { lang } = useContext(LangContext);

  const clearLocalItem = (val) => {
    const cart = getCartItem();
    const existingItem = JSON.parse(cart).map((cartItem) => {
      if (cartItem.product_id === val) {
        return { ...cartItem, actualbuy: false };
      } else {
        return { ...cartItem };
      }
    });
    setCartItem(existingItem);
    clearOrder(val);
  };
  return (
    <div className='showinfo_wrapper'>
      <div className='showinfo_ctn'>
        <div className='info_list'>
          <div className='info_ctn'>
            <div className='info_item'>
              <img className='icon_img' src='/images/location-pin.png' alt='location pin' />
            </div>
            <div className='info_item'>
              <h5>{data.name}</h5>
              <div className='info_address'>
                <p>
                  {data.address1}, {data.township}, {data.city}, {data.region}
                </p>
              </div>
            </div>
          </div>
          <div className='edit' onClick={handleShowEdit}>
            {lang.edit}
          </div>
        </div>
        <div className='info_list'>
          <div className='info_ctn'>
            <div className='info_item'>
              <img className='icon_img' src='/images/phone_icon.png' alt='location pin' />
            </div>
            <div className='info_item'>
              <h5 className='phone_no'>{data.phone_no}</h5>
            </div>
          </div>
          {/*<div className='edit'>Edit</div>*/}
        </div>
        {useremail ? (
          <div className='info_list'>
            <div className='info_ctn'>
              <div className='info_item'>
                <img className='icon_img' src='/images/email_icon.png' alt='location pin' />
              </div>
              <div className='info_item'>
                <h5>{useremail}</h5>
              </div>
            </div>
            {/**
            <div className='edit'>Edit</div> */}
          </div>
        ) : (
          ''
        )}

        <div>
          <div></div>
        </div>
      </div>
      {orderDetail.length === 0 ? (
        <div className='go_back_ctn'>
          <p>Please Go Back To add To Cart</p>
          <Link href='/addtocart'>
            <p className='go_back_btn'>Go Back</p>
          </Link>
        </div>
      ) : (
        <div className='show_product_ctn'>
          <span style={{ fontSize: '18px', color: '#394358', fontWeight: '600' }}>
            {lang.checkoutProducts}
          </span>
          <div className='cartList_ctn_gp'>
            <div className='cartList_ctn'>
              {orderDetail.map((item) => {
                console.log(item);
                return (
                  <div className='cart_list' key={item.variants.id}>
                    <div className='cartDetail'>
                      <div className='cart_Img'>
                        <img
                          src={`${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}${item.variants.images[0].image_url}`}
                          alt=''
                        />
                      </div>
                      <div className='itemPara'>
                        <span className='name'>{item.name_english}</span>
                        <span className='shop_name'>{item.shop.name}</span>
                      </div>

                      <div className='cart_price'> Ks {item.variants.price}</div>
                      <div className='quantity_trash'>
                        <div className='cart_quantity'> {item.quantity}</div>
                        <div
                          className='cart_trash'
                          onClick={() => {
                            clearLocalItem(item.product_id);
                          }}
                        >
                          <i className='far fa-trash-alt bin'></i>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {/* {cartItems.map((item) => {
                console.log(item);
                return (
                  <div className='cart_list' key={item.product_id}>
                    <div className='cartDetail'>
                      <div className='cart_Img'>
                        <img
                          src={`${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}${item.variants.images[0].image_url}`}
                          alt=''
                        />
                      </div>
                      <div className='itemPara'>
                        <h4>{item.name_english}</h4>
                        <span>{item.shop.name}</span>
                      </div>
                    </div>

                    <div className='cart_price'> Ks {item.variants.price}</div>
                    <div className='cart_quantity'> {item.quantity}</div>
                    <div
                      className='cart_trash'
                      onClick={() => {
                        clearItem(item.product_id);
                        clearLocalItem(item.product_id);
                      }}
                    >
                      <i className='far fa-trash-alt bin'></i>
                    </div>

                  </div>
                );
              })} */}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .showinfo_wrapper {
          width: 65%;
        }
        .showinfo_ctn {
          border: 1px solid #dcdcdc;
          border-radius: 8px;
          padding: 30px 25px;
          padding-left: 0px;
          padding-bottom: 4px;
        }
        .info_list {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .info_ctn {
          max-width: 500px;
          display: flex;
          font-family: inherit;
          color: #394958;
        }
        .info_address {
          font-size: 14px;
          display: flex;
          margin-top: 8px;
          text-transform: capitalize;
          line-height: 1.31;
          width: 100%;
        }
        .info_address p {
          width: 560px;
        }
        .icon_img {
          color: #394958;
          padding: 0 8px;
          width: 35px;
        }
        .edit {
          color: #f58723;
          text-transform: uppercase;
          font-weight: 600;
          cursor: pointer;
          font-size: 16px;
        }
        .quantity_trash {
          display: flex;
          padding-left: 80px;
          margin-top: -7px;
        }
        .info h4 {
          padding: 4px 0px;
        }
        .info_item {
          padding: 0 10px;
          padding-right: 0px;
        }
        .info_item h5 {
          font-size: 16px;
          margin-top: -2px;
          font-weight: 600;
          color: #394358;
        }
        .phone_no {
          font-size: 18px;
          margin-top: 1px;
          font-weight: 600;
          color: #394358;
        }
        .show_product_ctn {
          border: 1px solid #dcdcdc;
          border-radius: 8px;
          padding: 34px 25px;
          font-family: inherit;
          color: #394958;
          margin-top: 20px;
        }
        .go_back_ctn {
          border: 1px solid #dcdcdc;
          border-radius: 8px;
          padding: 30px 25px;
          font-family: inherit;
          text-align: center;
          color: #394958;
          foint-weight: 500;
          margin-top: 20px;
        }
        .go_back_btn {
          margin-top: 10px;
          padding: 10px;
          border: 1px solid #394958;
          cursor: pointer;
          border-radius: 4px;
        }
        .cart_list {
          display: flex;
          padding: 25px 0px;
          justify-content: space-between;
        }
        .cart_list {
          border-bottom: 1px solid #c7c7c7;
          border-radius: 4px;
          margin-top: 20px;
        }
        .cart_list:last-child {
          border: 0;
        }
        .cart_Img img {
          width: 75px;
          height: 75px;
        }
        .cartDetail {
          display: flex;
          padding-left: 10px;
          justify-content: space-around;
        }
        // .itemPara {
        //   max-width: 200px;
        //   min-width: 200px;
        //   margin: 0 20px;
        // }
        .itemPara {
          margin: 0 20px;
          display: flex;
          flex-direction: column;
        }
        .name {
          font-size: 14px;
          font-weight: 600;
          line-height: 1.36;
          color: #272f3f;
          width: 230px;
        }
        .itemPara > * {
          padding: 3px 1px;
        }
        .shop_name {
          font-size: 15px;
          line-height: 1.33;
          color: #5f6a7f;
        }
        .cart_price {
          color: #aa222a;
          font-size: 16px;
          font-weight: 800;
          padding-top: 3px;
          min-width: 100px;
        }
        .cart_trash {
          font-size: 16px;
          color: #272f3f;
          padding: 10px 20px;
          font-weight: 600;
          display: flex;
          justify-content: center;
        }
        .cart_quantity {
          padding: 10px 0px;
          padding-left: 1%;
          padding-right: 40px;
          font-size: 16px;
          font-weight: 600;
          display: flex;
          justify-content: center;
        }

        @media (max-width: 876px) {
          .showinfo_wrapper {
            width: 95%;
            margin: 0 auto;
          }
          .cart_list {
            flex-direction: column;
            justify-content: flex-start;
          }
          .itemPara {
            text-align: center;
          }
          .cart_price {
            text-align: center;
          }
        }
        @media (max-width: 720px) {
          .info_address p {
            width: 100%;
          }
        }

        @media (max-width: 665px) {
          .cartList_ctn {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-column-gap: 10px;
          }
          .cart_list {
            border-bottom: 0px;
            text-align: left;
            border: 1px solid #c7c7c7;
            padding: 0px;
            min-width: 100%;
          }
          .cart_list:last-child {
            border: 1px solid #c7c7c7;
          }
          .cart_Img img {
            width: 100%;
            height: 124px;
          }
          .cartDetail {
            flex-direction: column;
          }
          .itemPara {
            text-align: left;
            padding-left: 10px;
            margin: 0px;
          }
          .itemPara h4 {
            height: 43px;
          }
          .showinfo_ctn {
            padding-bottom: 0px;
            padding-left: 0px;
          }

          .cart_price {
            text-align: left;
            padding-left: 10px;
          }
          .quantity_trash {
            display: flex;
            justify-content: space-between;
            padding-left: 0px;
          }
          .cart_quantity,
          .cart_trash {
            font-size: 16px;
          }
          .cart_quantity {
            padding-left: 10px;
            padding-right: 0px;
          }

          .show_product_ctn {
            border: 0;
            padding-left: 0px;
            padding-right: 0px;
            overflow: hidden;
            margin-top: 0px;
            padding-top: 27px;
          }
        }
        @media (max-width: 568px) {
          .info_item p {
            font-size: 14px;
          }
        }
        @media (max-width: 420px) {
          .cart_price {
            font-size: 14px;
          }
          .itemPara h4 {
            font-size: 13px;
            width: 65%;
          }
          .itemPara span {
            font-size: 13px;
          }
          .cartList_ctn_gp{
            margin-top:10px;
          }
          .quantity_transh{
            padding-top:6px;
          }
          .edit{
            width:97px;
          }
        }
        @media (max-width: 360px) {
          .itemPara,
          .cart_price {
            padding-left: 5px;
          }
        }
      `}</style>
    </div>
  );
};

export default DeliveryShowInfo;
