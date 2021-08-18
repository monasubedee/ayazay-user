import Layout from '../../components/Layout';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Link from 'next/link';
import Loader from 'react-loader-spinner';
import {
  selectCartItems,
  selectCartTotal,
  selectCartItemsCount,
} from '../../store/cart/cart.selector';
import { reset, clearItemFromCart, addShippingFees } from '../../store/cart/cart.action';
import { useState, useEffect, useContext } from 'react';
import authapi from '../../constants/authApi';
import api from '../../constants/api';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import DeliveryInfo from '../../components/deliveryinformation/deliveryInfo';
import DeliveryShowInfo from '../../components/deliveryinformation/deliveryShowInfo';
import {
  getCartItem,
  getDelivaryaddress,
  setDelivaryaddress,
  getStorageUserInfo,
  getTownshipId,
  setTownshipId,
  setShippingFees,
  getToken,
} from '../../localStorage/localStorage';
import { LangContext } from '../../constants/langcontext';
import * as Yup from 'yup';
import { get } from 'js-cookie';
import { useDispatch } from 'react-redux';
import { getSearchProduct } from '../../store/product/action';

const filtertownship = (inputValue) => {
  return township.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()));
};

const DeliveryInfromation = ({ total, count, cartItems, reset, clearItem }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedTownship, setSelectedTownship] = useState(null);
  const [selectedType, setSelectedType] = useState('home');
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const [orderDetail, setOrderDetail] = useState([]);
  const [useremail, setUserEmail] = useState('');
  const [data, setData] = useState(null);
  const [arrayAddress, setArrayAddress] = useState(null);
  const [edit, setEdit] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [typeError, setTypeError] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [cityOptions, setCityOptions] = useState([]);
  const [regionOptions, setRegionOptions] = useState(null);
  const [townshipOptions, setTownShipOptions] = useState([]);
  const [addressType, setAddressType] = useState();
  const [deliveryFee, setDeliveryFee] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [date, setDate] = useState('');
  const [day, setLastDay] = useState('');
  const [loadingDeli, setLoadingDeli] = useState(false);
  const [town, setTownship] = useState(0);
  const [deliMessage, setDeliMessage] = useState('');
  const { lang } = useContext(LangContext);
  const [address_id, setAddressId] = useState();
  const initialValues = {
    name: '',
    phone_no: '',
    addressOne: '',
  };

  const dispatch = useDispatch();

  const searchProduct = (search_value) => {
    dispatch(getSearchProduct(search_value));
  };

  const fetchlocation = async () => {
    try {
      const res = await api.get('/location/regions');
      if (res.status === 200) {
        setRegionOptions(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deliveryFees = async () => {
    var id = JSON.parse(getTownshipId());
    var ID = Number(id);
    var shop_id;
    JSON.parse(getCartItem()).map((item, i) => {
      shop_id = item.shop.id;
    });
    const Token = getToken();
    const headers = { headers: { Authorization: `Bearer ${Token}` } };
    try {
      let response = await api.get(
        `/delivery-option/delivery-fee?shop_id=${shop_id}&township_id=${ID}`,
        headers
      );
      if (response.status === 200) {
        setDeliveryFee(response.data);
        setDeliMessage('');
        // addShippingFees(response.data.price);
        setShippingFees(response.data.price);
        console.log(response, 'res');
        let date = new Date();
        let month = date.toLocaleString('en-us', { month: 'long' });
        let year = date.getFullYear();
        let day = date.getDate();
        let lastDay = day + response.data.duration;
        setDate(day);
        setLastDay(lastDay);
        setMonth(month);
        setYear(year);
      }
    } catch (error) {
      console.log(error.response);
      if (error.response) {
        setDeliMessage(error.response.data.message);
      }
    }
  };
  useEffect(() => {
    setLoadingDeli(true);
    setTimeout(() => {
      deliveryInformation();
      deliveryFees();
      fetchlocation();
    }, 3000);
  }, []);

  useEffect(() => {
    const userInfo = getStorageUserInfo();
    if (JSON.parse(userInfo) !== null && show === true) {
      setUserEmail(JSON.parse(userInfo).email);
    }
  }, [show]);

  const deliveryInformation = async () => {
    const Token = getToken();
    const headers = { headers: { Authorization: `Bearer ${Token}` } };

    try {
      let response = await api.get('/customer/delivery-info', headers);
      console.log("response is", response);
      let userInfo = getStorageUserInfo();
      if (response.data.result.length > 0 && JSON.parse(userInfo) !== null) {
        setTownshipId(response.data.result[0].township_id);
        setAddressId(response.data.result[0].id);
        deliveryFees();
        setData(response.data.result[0]);
        setAddressType(response.data.result[0].id);
        setShow(response.data.result[0].show);
        setArrayAddress(response.data.result);
        setShow(true);
        setUserEmail(JSON.parse(userInfo).email);
        setDeliveryInfo(JSON.parse(userInfo).id);
      }
      setLoadingDeli(false);
    } catch (error) {
      console.log(error);
      setLoadingDeli(false);
    }
  };

  const onSubmit = async (values) => {
    if (typeError && selectedType.length === 0) {
      return false;
    }
    const dataaddress = {
      name: values.name,
      phone_no: values.phone_no,
      address1: values.addressOne,
      type: selectedType,
      region: selectedRegion,
      city: selectedCity,
      township: selectedTownship,
      townId: town,
    };
    const Token = getToken();
    const headers = { headers: { Authorization: `Bearer ${Token}` } };
    try {
      const response = await api.post('/delivery-info', dataaddress, headers);
      if (response.status === 201) {
        let newdata = dataaddress;
        newdata.show = true;
        newdata.id = response.data.id;

        if (data === null) {
          setDelivaryaddress([newdata]);
          setArrayAddress([newdata]);
        } else {
          setDelivaryaddress([...arrayAddress, newdata]);
          setArrayAddress([...arrayAddress, newdata]);
        }
        if (edit === true) {
          setEditShow(true);
          setEdit(false);
        } else {
          setData(newdata);
        }
        setDeliveryInfo(response.data.id);
        setShow(true);
        enqueueSnackbar('Successfully fill delivery Information', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
        });

        setCityOptions([]);
        setTownShipOptions([]);
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar(`${refillDelivery}`, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
      });
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('This field is required!')
      .min(2, 'Too Short!')
      .max(50, 'Too Long!'),
    phone_no: Yup.number()
      .typeError('It must be a number')
      .required('This field is required!')
      .positive('It must a number'),
    addressOne: Yup.string()
      .required('This field is required!')
      .min(5, 'Too Short!')
      .max(100, 'Too Long!'),
  });

  const typeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const gettownshipbyId = async (id) => {
    try {
      const res = await api.get(`/location/townships?regionId=${id}`);
      if (res.status === 200) {
        setCityOptions(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getwardsbyid = async (id) => {
    setTownshipId(id);
    setTownship(id);
    try {
      const res = await api.get(`/location/wards?townshipId=${id}`);
      if (res.status === 200) {
        setTownShipOptions(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSelectCity = async (e) => {
    const select = e.currentTarget;
    const id = select.children[select.selectedIndex].id;
    if (id) {
      getwardsbyid(id);
      setSelectedCity(e.currentTarget.value);
    } else {
      setTownShipOptions([]);
    }
  };
  const handleSelectRegion = (e) => {
    const select = e.currentTarget;
    const id = select.children[select.selectedIndex].id;
    if (id) {
      gettownshipbyId(id);
      setSelectedRegion(e.currentTarget.value);
    } else {
      setCityOptions([]);
      setTownShipOptions([]);
    }
  };
  const handleSelectTownship = (e) => {
    setSelectedTownship(e.currentTarget.value);
  };
  useEffect(() => {
    let cart = getCartItem();
    if (cart !== null) {
      let results = JSON.parse(cart).filter((item) => {
        if (item.actualbuy === true) {
          return {
            qty: item.quantity,
            price: item.variants.price,
            remark: 'string',
            product_name: item.name_english,
            product_id: item.product_id,
            variant_id: item.variants.id,
          };
        }
      });
      console.log(results);
      setOrderDetail(results);
    }
  }, []);

  const handlePlaceOrder = async () => {
    if (orderDetail.length !== 0 && deliveryInfo !== null) {
      const lastorderdetail = orderDetail.map((item) => {
        return {
          qty: item.quantity,
          price: item.variants.price,
          remark: 'string',
          product_name: item.name_english,
          product_id: item.product_id,
          variant_id: item.variants.id,
        };
      });

      const data = {
        shop_id: orderDetail[0].shop.id,
        delivery_option_id: deliveryFee.id,
        total_amount: total + deliveryFee.price,
        total_qty: count,
        delivery_info_id: addressType,
        order_details: lastorderdetail,
      };

      const Token = getToken();
      const headers = { headers: { Authorization: `Bearer ${Token}` } };
      try {
        const response = await api.post('/order', data, headers);

        if (response.status === 201) {
          router.push(`/order/${response.data.order_id}/payment?type=mpu`);
        }
      } catch (error) {
        console.log('error is', error.response);
      }
    } else {
      enqueueSnackbar('Please fill the delivery information', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
      });
    }
  };
  const clearOrder = (val) => {
    const deleteItem = orderDetail.filter((order) => order.product_id !== val);
    setOrderDetail(deleteItem);
  };

  const popupdetailinfo = () => {
    const closebtn = () => {
      setEdit(false);
    };
    return (
      <div className='main_container'>
        <div className='container' id='pop'>
          <div className='popup_container'>
            <div className='contentTitle'>
              <DeliveryInfo
                Values={initialValues}
                regionOptions={regionOptions}
                cityOptions={cityOptions}
                townshipOptions={townshipOptions}
                handleSubmit={onSubmit}
                validationSchema={validationSchema}
                handleSelectTownship={handleSelectTownship}
                handleSelectRegion={handleSelectRegion}
                handleSelectCity={handleSelectCity}
                typeChange={typeChange}
                selectedType={selectedType}
                closebtn={closebtn}
              />
            </div>
          </div>
        </div>
        <style jsx>{`
          .main_container {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            bottom: 0;
            z-index: 10000;
            left: 0;
            background-color: rgba(0, 0, 0, 0.5);
          }
          .container {
            position: fixed;
            top: 45%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-family: 'Montserrat';
          }
          .popup_container {
            display: flex;
            flex-direction: column;
            background-color: #ffffff;
            width: 100%;
            color: #394358;
            border-radius: 8px;
          }
          @media (max-width: 476px) {
            .container {
              top: 50%;
              height: 90vh;
              overflow-y: scroll;
            }
            .container::-webkit-scrollbar {
              display: none;
            }
            .container {
              scrollbar-width: none;
            }
          }
        `}</style>
      </div>
    );
  };

  const popupaddress = () => {
    const addaddress = () => {
      setEditShow(!editShow);
      setEdit(!edit);
    };
    const addressChange = (e) => {
      setAddressType(parseInt(e.target.value));
    };
    const savehandle = () => {
      const filteraddress = arrayAddress.find((item) => item.id === addressType);
      console.log(filteraddress);
      setTownshipId(
        filteraddress.township_id === undefined ? filteraddress.townId : filteraddress.township_id
      );
      setAddressId(filteraddress.id);
      // setTownshipId(filteraddress.townId);
      deliveryFees();
      setData(filteraddress);
      setEditShow(false);
    };

    let id = JSON.parse(localStorage.getItem('townshipId'));

    return (
      <div className='main_container'>
        <div className='container' id='pop'>
          <div className='popup_container'>
            <div className='contentTitle'>
              <h4>{lang.billingAddress}</h4>
            </div>
            <div className='well'>
              <div className='row row_title'>
                <div className='block_inline title_1'> {lang.fullName} </div>
                <div className='block_inline title address'> {lang.address} </div>
                <div className='block_inline title'> {lang.phone} </div>
              </div>
              <div className='scroll'>
                {arrayAddress !== null &&
                  arrayAddress.map((item) => {
                    let address = `${item.address1},${item.region},${item.city}`;
                    return (
                      <div className='address_ctn' key={item.id}>
                        <label className='input_ctn'>
                          <input
                            onChange={addressChange}
                            type='radio'
                            className='input_radio'
                            value={item.id}
                            checked={addressType === item.id}
                          />
                          <div className='row'>
                            <div className='block_inline'>{item.name} </div>
                            <div className='block_inline address'> {address} </div>
                            <div className='block_inline border'>
                              {item.phone_no}
                              <div
                                className={
                                  item.id === address_id ? 'block_inline_show' : 'refuse_show'
                                }
                              >
                                Default Billing Address
                              </div>
                            </div>
                          </div>
                        </label>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className='bottom_ctn'>
              <div onClick={addaddress} className='add_address'>
                + {lang.addNewAddress}
              </div>
              <div className='btn_ctn'>
                <div className='close_btn' onClick={() => setEditShow(false)}>
                  <button>{lang.cancel}</button>
                </div>
                <div className='save_btn'>
                  <button onClick={savehandle}>{lang.save}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          .main_container {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            bottom: 0;
            z-index: 10000;
            left: 0;
            background-color: rgba(0, 0, 0, 0.5);
          }
          .contentTitle {
            padding: 20px 0;
            padding-top: 6px;
          }
          .container {
            position: fixed;
            top: 45%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-family: 'Montserrat';
          }
          .popup_container {
            display: flex;
            flex-direction: column;
            background-color: #ffffff;
            padding: 20px;
            width: 100%;
            color: #394358;
            border-radius: 8px;
          }
          .add_address {
            color: #f58723;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            padding: 16px;
            display: flex;
          }
          .scroll {
            overflow-y: scroll;
            height: 180px;
            scroll-behavior: smooth;
            padding-top: 7px;
            scrollbar-width: none;
          }
          .scroll::-webkit-scrollbar {
            display: none;
          }
          .well {
            width: 100%;
          }
          .bottom_ctn {
            display: flex;
            justify-content: space-between;
          }
          .btn_ctn {
            display: flex;
          }
          .row {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
          }
          .input_ctn {
            width: 100%;
            display: flex;
            align-items: center;
          }
          .input_ctn > input {
            width: 30px;
          }

          .input_ctn > input + div {
            cursor: pointer;
            border: 2px solid transparent;
          }
          .input_ctn > input:checked + div {
            background: #fafafa;
          }
          .input_ctn label {
            color: #666;
            font-weight: normal;
            cursor: pointer;
          }
          .block_inline {
            min-width: 150px;
            width: 100%;
            padding: 20px;
            font-size: 12px;
          }
          .block_inline_show {
            min-width: 120px;
            padding-top: 4px;
            color: #f58723;
            width: 130px;
            font-size: 10px;
          }
          .refuse_show {
            display: none;
          }

          .address {
            width: 400px;
          }
          .row_title {
            color: #707070;
          }
          .title {
            background: #fafafa;
            padding: 20px 40px;
          }

          .title_1 {
            background: #fafafa;
            padding: 20px 40px;
          }
          .save_btn {
            width: 100%;
            margin-left: 8px;
          }
          .close_btn button {
            background-color: #ffffff;
            color: #aa222a;
            border: 1px solid #aa222a;
          }
          .save_btn button {
            background-color: #aa222a;
            color: #fff;
            border: none;
          }
          .close_btn button,
          .save_btn button {
            cursor: pointer;
            border-radius: 4px;
            outline: none;
            min-width: 100px;
            width: 100%;
            padding: 16px;
            letter-spacing: 0.31px;
            font-weight: 600;
            font-size: 14px;
          }
          @media (max-width: 877px) {
            .row {
              grid-template-columns: 1fr 1fr;
            }
            .row_title {
              display: none;
            }
            .address {
              max-width: 130px;
            }
            .block_inline {
              max-width: 40px;
            }
            .border {
              position: relative;
            }
            .block_inline_show {
              position: absolute;
              right: -116px;
              top: 12px;
            }
            .input_ctn {
              width: 100%;
              display: flex;
              align-items: start;
            }
            .input_radio {
              margin-top: 15px;
            }
            .block_inline {
              padding: 12px;
            }
            .add_address {
              font-size: 12px;
            }
            .close_btn button {
              padding: 12px;
            }
            .btn_ctn {
              align-items: center;
            }
            .save_btn button {
              padding: 12px;
            }
          }
        `}</style>
      </div>
    );
  };

  var calTotal =
    deliMessage === 'Delivery Service not avaliable!' || deliMessage === 'Unauthorized'
      ? 0
      : deliveryFee.price;

  return (
    <Layout searchProduct={searchProduct}>
      {editShow === true ? popupaddress() : null}
      {edit === true ? popupdetailinfo() : null}
      <div className='deli_ctn'>
        <div className='list_item'>
          <Link href='/addtocart'>
            <span className='item'>{lang.lists}</span>
          </Link>
          <div className='delivery_top'>
            <span className='item_active'>{lang.deliveryInformation}</span>
          </div>
        </div>
        <div className='delivery_container'>
          <div className='delivery_wrapper'>
            {loadingDeli === true ? (
              <div className='Loading_ctn'>
                <Loader type='ThreeDots' color='#aa222a' height='90' width='90' />
              </div>
            ) : show === true ? (
              <DeliveryShowInfo
                handleShowEdit={() => {
                  setEditShow(!editShow);
                }}
                data={data}
                cartItems={cartItems}
                orderDetail={orderDetail}
                useremail={useremail}
                clearItem={clearItem}
                clearOrder={clearOrder}
              />
            ) : (
              <div className='datafillinfo_ctn'>
                <DeliveryInfo
                  Values={initialValues}
                  regionOptions={regionOptions}
                  cityOptions={cityOptions}
                  townshipOptions={townshipOptions}
                  handleSubmit={onSubmit}
                  validationSchema={validationSchema}
                  handleSelectTownship={handleSelectTownship}
                  handleSelectRegion={handleSelectRegion}
                  handleSelectCity={handleSelectCity}
                  typeChange={typeChange}
                  selectedType={selectedType}
                />
              </div>
            )}

            <div className='delivery_options'>
              <div className='option_container'>
                <div className='option_wrapper'>
                  <div className='deli_options'>
                    {show && (
                      <div className='deli_options_wrapper'>
                        <span className='pref'>{lang.deliveryOptions}</span>
                        {deliMessage.length > 0 ? (
                          <div className='option_info' style={{ width: '80%' }}>
                            {deliMessage}
                          </div>
                        ) : (
                          <div className='option_info'>
                            <div className='kyats'>
                              <i className='fa fa-check-circle circle' aria-hidden='true'></i>
                              <span className='kyats_info'>Ks {deliveryFee.price}</span>
                              <i className='fa fa-truck special' aria-hidden='true'></i>
                            </div>
                            <span className='stand'>Standard</span>
                            <span className='stand'>
                              Get by {date}-{day} {month} {year}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className='order_summary'>
                    <div className='order_container'>
                      <div className='order_wrapper'>
                        <span className='order_summary_text'>{lang.orderSummary}</span>
                        <div className='title_value_sub'>
                          <span className='sub'>
                            {lang.subtotal} ({count} items)
                          </span>
                          <span>{total + 0} Ks</span>
                        </div>
                        <div className='title_value'>
                          <span>{lang.shippingFees}</span>
                          {deliMessage === 'Delivery Service not avaliable!' ||
                          deliMessage === 'Unauthorized' ? (
                            <span>N/A</span>
                          ) : (
                            <span>{deliveryFee.price} Ks</span>
                          )}
                        </div>
                        {/* <div className="voucher_code">
                                                <input type="text" placeholder="Enter Voucher Code" ></input>
                                                <button>APPLY</button>
                                            </div> */}
                        <div className='total'>
                          <span>{lang.total}</span>
                          <span className='total_value'>
                            Ks {isNaN(calTotal) ? 0 : total + calTotal}
                          </span>
                        </div>
                        <div>
                          <button
                            className='place_order'
                            disabled={
                              orderDetail.length === 0 ||
                              deliMessage === 'Delivery Service not avaliable!' ||
                              deliMessage === 'Unauthorized'
                                ? true
                                : false
                            }
                            onClick={handlePlaceOrder}
                          >
                            {lang.place}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .item_active {
          color: #aa222a;
        }
        .delivery_top {
          padding-top: 14px;
        }
        .item::after {
          content: '›';
          margin-left: 10px;
          font-size: 30px;
        }
        .deli_ctn {
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
          cursor: pointer;
          display: flex;
          padding-bottom: 25px;
        }
        .list_item > * {
          margin-right: 10px;
        }
        .delivery_container {
          max-width: 1140px;
          margin: 0 auto;
        }
        .delivery_wrapper {
          display: flex;
        }
        .datafillinfo_ctn {
          width: 70%;
          border: 1.5px solid #dcdcdc;
          border-radius: 4px;
        }
        .Loading_ctn {
          width: 70%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .delivery_options {
          flex: 35%;
          margin-left: 19px;
        }
        .option_wrapper {
          display: flex;
          flex-direction: column;
        }
        .option_info {
          display: flex;
          flex-direction: column;
        }
        .kyats {
          display: flex;
        }
        .kyats i:first-child {
          padding: 0 10px 0px 0;
        }
        .kyats i {
          color: #2d6ccd;
          padding: 0 10px;
        }
        .circle {
          font-size: 20px;
        }
        .kyats_info {
          color: #1f2634;
          font-size: 16px;
          font-weight: 600;
        }
        .special {
          font-size: 16px;
        }
        .stand {
          font-size: 12px;
          padding-left: 28px;
        }
        .deli_options_wrapper {
          margin-bottom: 12px;
          border: 1.5px solid #dcdcdc;
          border-radius: 4px;
          padding: 25px;
        }
        .pref {
          font-size: 14px;
          font-weight: 600;
          color: #394358;
        }
        .option_info {
          border: 1px solid #2d6ccd;
          background-color: #f5f8ff;
          width: 60%;
          padding: 8px;
          margin-top: 19px;
        }
        .order_container {
          border: 1.5px solid #dcdcdc;
          border-radius: 4px;
          padding-left: 28px;
          padding-top: 32px;
          padding-right: 28px;
        }
        .order_summary_text {
          font-size: 18px;
          font-weight: 800;
          color: #394358;
        }

        .title_value {
          display: flex;
          justify-content: space-between;
          color: #171717;
          padding-bottom: 26px;
        }
        .title_value_sub {
          display: flex;
          justify-content: space-between;
          color: #171717;
          padding-bottom: 16px;
          margin-top: 20px;
        }
        .voucher_code {
          margin-bottom: 19px;
        }
        .voucher_code input {
          border: 1.5px solid #dcdcdc;
          border-radius: 4px;
          padding: 14px;
          color: #7f7f7f;
          font-size: 14px;
        }
        .voucher_code button {
          border-radius: 2px;
          background-color: #f58723;
          padding: 15px;
          border: none;
          outline: none;
          width: 37%;
          color: #fff;
          font-size: 14px;
          font-weight: 600;
        }
        .total_value {
          font-size: 20px;
          font-weight: 600;
          color: #aa222a;
        }
        place_order:disabled,
        button[disabled] {
          background-color: #c7c7c7;
          color: #666666;
          cursor: not-allowed;
          pointer-events: none;
        }
        .place_order {
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.31px;
          text-align: center;
          color: #fff;
          width: 100%;
          background-color: #aa222a;
          padding: 14px;
          margin-bottom: 32px;
          border-radius: 4px;
          border: none;
          outline: none;
        }
        .total {
          padding-top: 20px;
          border-top: 1px solid #cbcbcb;
          display: flex;
          justify-content: space-between;
          color: #171717;
          padding-bottom: 26px;
        }
        @media (max-width: 876px) {
          .delivery_wrapper {
            flex-direction: column;
          }
          .datafillinfo_ctn {
            width: 95%;
            margin: 0 auto;
          }
          .delivery_info {
            width: 95%;
            margin: 0 auto;
          }
          .delivery_options {
            width: 95%;
            margin: 10px auto 10px auto;
          }
          .delivery_wrapper {
            margin-top: 20px;
          }
          .list_item {
            width: 95%;
            margin: 0 auto;
            font-size: 14px;
          }
        }
        @media (max-width: 530px) {
          .list_item {
            flex-direction: column;
          }
          .item::after {
            margin-left: 10px;
          }
        }
        @media (max-width: 476px) {
          .office_home {
            flex-direction: column;
            justfiy-content: center;
          }
          .address_info_two {
            justify-content: center;
          }
          .list_item {
            margin-left: 5px;
          }
          .pay_choice {
            width: 100%;
            margin: 5px;
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
});

const mapDispatchProps = (dispatch) => ({
  reset: () => dispatch(reset()),
  clearItem: (item) => dispatch(clearItemFromCart(item)),
  addShippingFees: (price) => dispatch(addShippingFees(price)),
});

export default connect(mapStateToProps, mapDispatchProps)(DeliveryInfromation);
