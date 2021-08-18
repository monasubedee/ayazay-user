import { useRef, useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import Layout from '../../../components/Layout';
import { createStructuredSelector } from 'reselect';
import authapi from '../../../constants/authApi';
import {
  selectCartItems,
  selectCartTotal,
  selectCartItemsCount,
  selectShippingFees,
} from '../../../store/cart/cart.selector';
import { getShippingFees, getCartItem, setCartItem } from '../../../localStorage/localStorage';
import { useRouter } from 'next/router';
import MpuForm from '../../../components/payments/mpuForm';
import AyaPay from '../../../components/payments/ayaPay';
import AyaPayPopup from '../../../components/AyaPayPopup';
import { LangContext } from '../../../constants/langcontext';
import { useDispatch } from 'react-redux';
import { getSearchProduct } from '../../../store/product/action';

const visapayForm = () => {
  return (
    <form>
      <div className='visa_ctn'>
        <input className='visa_card' autoFocus autoComplete='off' placeholder='Name on Card' />
      </div>
      <div className='visa_ctn'>
        <input className='visa_card' autoComplete='off' placeholder='Card Number' />
      </div>
      <div className='visa_ctn'>
        <input autoComplete='off' placeholder='MM/YY' />
        <input autoComplete='off' placeholder='CVC' />
      </div>
      <style jsx>{`
        .visa_card {
          width: 100%;
        }
        .visa_ctn {
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }
        .visa_ctn input {
          padding: 20px;
          font-size: 15px;
          box-sizing: border-box;
          border-radius: 8px;
          border: solid 1px #cbcbcb;
          background-color: #f4f5f8;
          width: 40%;
          margin-left: 10px;
          outline: 0;
        }
        .visa_ctn input:first-child {
          width: 100% !important;
          margin-left: 0px;
        }
      `}</style>
    </form>
  );
};

const Payment = ({ total, count }) => {
  const { query } = useRouter();
  const [paymentMpu, setPaymentMpu] = useState();
  const [deliveryFee, setDeliveryFee] = useState(0);

  const dispatch = useDispatch();

  const searchProduct = (search_value) => {
    dispatch(getSearchProduct(search_value));
  };


  const actionUrl = process.env.NEXT_PUBLIC_REACT_APP_MPU_URL;
  const formRef = useRef(null);
  const [show, setShow] = useState(false);
  const [counter, setCounter] = useState(30 * 60);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const { lang } = useContext(LangContext);

  useEffect(() => {
    setMin(Math.floor(counter / 60));
    setSec(counter % 60);
    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  useEffect(() => {
    if (counter === 0) {
      setShow(true);
    }
  }, [counter]);

  useEffect(() => {
    var fee = Number(getShippingFees());
    setDeliveryFee(fee);
  }, []);

  const clickCancel = () => {
    setShow(false);
  };

  const checkoutClick = async () => {
    if (query.type === 'mpu') {
      const res = authapi
        .get(`/payment/mpu/request-hash?order_id=${query.id}`)
        .then((result) => {
          setPaymentMpu(result.data);
          formRef.current.submit();
        })
        .catch((error) => console.error('ERROR PAYMENT '.error));
    }
  };

  return (
    <Layout searchProduct={searchProduct}>
      {show ? <AyaPayPopup cancel={clickCancel} /> : ''}
      <div className='payment_container'>
        <div className='list_item'>
          <Link href='/addtocart'>
            <span className='item'>{lang.lists}</span>
          </Link>
          <Link href='/order/deliveryinformation'>
            <span className='item delivery'>{lang.deliveryInformation}</span>
          </Link>a
          <div className='payment_info'>
            <span className='item_active'>{lang.paymentInformation}</span>
          </div>
        </div>

        <div className='payment__type_container'>
          <div className='payment_type'>
            <h2 className='pay_title'>{lang.paymentInformation}</h2>
            <div className='notice'>
              Note: You only have {min} : {sec} minutes to process and after that, your order will
              be cancelled.
            </div>
            <div className='pay_container'>
              <div className='pay_choice'>
                <Link href={{ pathname: `/order/${query.id}/payment`, query: { type: 'mpu' } }}>
                  <div className={query.type === 'mpu' ? 'pay_img active' : 'pay_img'}>
                    <img src='/images/mpu.png' alt='mpu' />
                    <p className='mpu'>MPU</p>
                  </div>
                </Link>
              </div>
              {/* <div className='pay_choice'>
                <Link href={{ pathname: `/order/${query.id}/payment`, query: { type: 'visa' } }}>
                  <div className={query.type === 'visa' ? 'pay_img active' : 'pay_img'}>
                    <img src='/images/visa.png' alt='visa' />
                    <p>VISA/MASTER</p>
                  </div>
                </Link>
              </div> */}
              <div className='pay_choice'>
                <Link href={{ pathname: `/order/${query.id}/payment`, query: { type: 'ayapay' } }}>
                  <div className={query.type === 'ayapay' ? 'pay_img active' : 'pay_img'}>
                    <img src='/images/ayapay.png' alt='ayapay' />
                    <p>AYAPAY</p>
                  </div>
                </Link>
              </div>
            </div>
            <div>
              {query.type === 'visa' ? (
                <div>
                  <h2 className='pay_title'>Payment Info</h2>
                  <div className='visa_ctn'>{visapayForm()}</div>{' '}
                </div>
              ) : (
                ''
              )}
              {query.type === 'ayapay' ? (
                <div className='aya_pay'>
                  <AyaPay />
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
          <div className='summaryContainer'>
            <div className='orderContainer'>
              <h3>{lang.orderSummary}</h3>
              <div className='amount'>
                <div className='amountCategory'>
                  <p>
                    {lang.subtotal} ({count} Items)
                  </p>
                  <p>{total} Ks</p>
                </div>
                <div className='amountCategory'>
                  <p>{lang.shippingFees}</p>
                  <p>{deliveryFee} Ks</p>
                </div>
              </div>
              {/*  <div className="voucher_input">
              <input type="text" placeholder="Enter Voucher Code" />
              <button style={{ cursor: "pointer" }}>APPLY</button>
            </div>*/}
              <div className='Total'>
                <p>{lang.total}</p>
                <h3>Ks {total + deliveryFee}</h3>
              </div>
              <div>
                <button
                  id='click'
                  className='checkout'
                  disabled={query.type === 'ayapay' ? true : false}
                  style={{ cursor: 'pointer' }}
                  onClick={checkoutClick}
                >
                  {lang.checkout}
                </button>
              </div>
            </div>
          </div>
          {paymentMpu !== undefined ? (
            <MpuForm mpu={paymentMpu} formRef={formRef} actionUrl={actionUrl} />
          ) : (
            ''
          )}
        </div>
      </div>
      <style jsx>{`
        .payment_container {
          max-width: 1140px;
          margin: 0 auto;
          color: #394358;
          font-family: inherit;
          padding: 30px 0px;
        }

        .list_item {
          padding-top: 10px;
          font-size: 16px;
          text-transform: uppercase;
          font-weight: 600;
          cursor:pointer;
          display:flex;
          padding-bottom:25px;
        }
        .payment_info{
          padding-top:14px;
        }

        .item_active {
          color: #aa222a;
        }
        .notice{
          font-size:15px;
          color:#394358;
          border-radius:4px;
          background-color:#ffe09a;
          padding:14px 19px 15px 16px;
          margin-top:21px;
        }
        .item::after {
          content: '›';
          margin-left: 10px;
          font-size: 30px;
        }
        .list_item > * {
          margin-right: 10px;
        }
        .payment__type_container {
          display: Flex;
        }
        .payment_type {
          border: 1px solid #cbcbcb;
          width: 100%;
          border-radius: 5px;
          padding: 32px;
        }
        .pay_container {
          margin: 20px 0;
        }


        @media screen and (min-width: 200px) {
          .pay_container {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
          }
          .pay_img img {
            height:50px;
          }
          .pay_img{
            min-width:210px;
          }
        }
        @media screen and (min-width:476px){
          .pay_choice {
            flex: 0 1 calc(50% - 1em);
            margin:5px;
            max-width:210px;
          }
        }

        @media screen and (min-width: 1140px) {
           .pay_choice {
            flex: 0 1 calc(24% - 1em);
            margin:5px;
          }
           .pay_img img {
            height: 50px;
          }
        }
        .pay_img {
          border-radius: 4px;
          border: 1px solid #dcdcdc;
          display: flex;
          flex-direction: column;
          justify-content: center;
          algin-items: center;
          padding: 10px 40px;
          cursor:pointer;
        }
        .pay_img.active {
          border: 1px solid #aa222a;
        }
        .pay_img p {
          padding: 11px;
          text-align: center;
        }
        .pay_title {
          font-weight: 600;
          font-size: 20px;
        }
        .summaryContainer {
          margin-left: 2%;
          width: 40%;
          display: flex;
          flex-direction: column;
        }
        .orderContainer {
          padding: 32px;
          border: 1px solid #cbcbcb;
          border-radius: 5px;
          display: flex;
          flex-direction: column;
        }

        .mpu_btn {
          width: 100%;
          cursor:pointer;
          text-align: center;
          font-weight: 600;
          font-size: 16px;
          border: 2px solid #aa222a;
          padding: 16px;
          color: #aa222a;
          margin-top: 20px;
          border-radius: 5px;
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
        checkout:disabled,
        button[disabled]{
          background-color: #c7c7c7;
          color: #666666;
          cursor:not-allowed;
          pointer-events:none;
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
       .checkout{
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

        @media(max-width:530px){
          .list_item{
            flex-direction:column;
          }
          .item::after{
            margin-left:10px;
          }

        }

        @media (max-width: 876px) {
          .payment__type_container {
            flex-direction: column;
          }
          .pay_title{
            font-size:16px;
          }
          .payment_info{
            padding-top:8px;
          }
          .payment_type {
            width: 96%;
            margin: 0 auto;
            padding:24px;
          }
          .summaryContainer{
            width:96%;
            margin 20px auto;
          }
          .list_item{
            font-size:14px;
            margin-left:5px;
          }
          .item::after{
            font-size:24px;
          }
        }
        @media(max-width:786px){
          .payment_container{
            padding-top:7px;
          }
        }
        @media (max-width: 476px) {
          .list_item{
            margin-left:5px;
          }
          .pay_choice{
            width:100%;
            margin:5px;
          }

        }
      `}</style>
    </Layout>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
  count: selectCartItemsCount,
  shippingFees: selectShippingFees,
});

export default connect(mapStateToProps, null)(Payment);
