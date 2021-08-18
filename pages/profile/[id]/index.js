import Layout from '../../../components/Layout';
import Link from 'next/link';
import { getStorageUserInfo } from '../../../localStorage/localStorage';
import { useEffect, useState,useContext } from 'react';
import { useDispatch } from 'react-redux';
import { getSearchProduct } from '../../../store/product/action';
import {LangContext} from '../../../constants/langcontext';

const Profile = () => {
  const [userinfo, setuserInfo] = useState({});
  const [address, setAddress] = useState({});
  const dispatch = useDispatch();
  const {lang} = useContext(LangContext);


  const searchProduct = (search_value) => {
    dispatch(getSearchProduct(search_value));
  };
 

  const clickCancel = () => {
    setShow(false);
  }
  

  useEffect(() => {
    const userInfo = getStorageUserInfo();
    if (JSON.parse(userInfo) !== null) {
      setuserInfo(JSON.parse(userInfo));
      if (JSON.parse(userInfo).address.length !== 0) {
        setAddress(JSON.parse(userInfo).address[0]);
      }
    }
  }, []);

  var fullAddress = "";
  fullAddress = address.address1 + ", " + address.township + ", " + address.city + ", " + address.region;
  

  return (
    <Layout searchProduct={searchProduct}>
      <div className='profile_container'>
        <p className='title'>{lang.yourProfile}</p>
        <div className='profile_wrapper'>
          <div className='profile-box'>
            <p>{lang.information}</p>
            <Link href={`/profile/${userinfo.id}/orderhistory`}>
              <p>{lang.orderHistory}</p>
            </Link>
          </div>
          <div className='show-box'>
            <div className='personal_info'>
              <span>YOUR PERSONAL INFORMATION</span>
            </div>
            {userinfo.img_url === null ? (
              <img src='/images/profile_sample.png' alt='#' />
            ) : (
                <img src={userinfo.img_url} alt='#' />
              )}
            <div>
              <input
                className='full_name'
                type='text'
                name='name'
                placeholder={lang.fullName}
                value={userinfo.username}
                required
              />
            </div>
            <div className='input'>
              <input
                className='phone_number'
                type='text'
                name='phone_no'
                placeholder='+95 | 9 1234 12345'
                value={address.phone_no}
                required
              />
            </div>
            <div className='address_info'>
              <input
                className='line_one'
                type='text'
                name='email'
                placeholder={lang.email}
                value={userinfo.email}
                required
              />
            </div>
            <div className="location">
              <span>LOCATION</span>
            </div>
            <div className="address_info">
              <input
                className='line_one'
                type='text'
                name='addressOne'
                placeholder={lang.address}
                value={fullAddress}
                required
              />
            </div>
            {/* <div className='dropdown_ctn address_info_two'>
              <div className='custom-select'>
                <select className='dropdown_input' name='region' required='required'>
                  <option value={address.region}>{address.region}</option>
                </select>
              </div>
              <div className='township_ward'>
                <select className='dropdown_input' required='required'>
                  <option value={address.city}>{address.region}</option>
                </select>
              </div>
              <div className='township_ward'>
                <select className='dropdown_input' required='required'>
                  <option value={address.township}>{address.region}</option>
                </select>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <style>
        {`
           .profile_container{
             max-width:1140px;
             margin:75px auto;
            color: #394358;
            font-size:14px;
            

           }
           .title{
             font-size:16px;
             font-weight:600;
             letter-spacing:0.75px;
           }
           .profile_wrapper{
             display:flex;
           }
           .profile-box{
            margin-top:10px;
            width:29%;
            max-width:270px;
            border-radius: 4px;
            border: solid 1.5px #dcdcdc;
            height:160px;
           }
           .location{
             padding-top:24px;
             font-size:14px;
             color: #1f2634;
           }
           .personal_info{
             font-size:14px;
             color:#1f2634;
             text-align:center;
             padding-bottom:15px;
           }
           .profile-box p{
             padding:29px 20px;
             cursor:pointer;
             position:relative;
           }
           .profile-box p:first-child{
             color: #aa222a;
             background-color: #fff5f5;
           }
            .profile-box p::after {
              content: '›';
              position:absolute;
              top:15px;
              right:15px;
              font-size: 30px;
            }
            .show-box{
              width:70%;
              
              margin:10px 0px 0px 20px;
              border-radius: 4px;
              padding:30px 0;
              border: solid 1.5px #dcdcdc;
              text-align:center;
            }
            .show-box input{
              font-size:16px;
              color:#394358;
            }
            input::placeholder{
              opacity:0.5;
            }
            .show-box img{
              margin:0 auto;
              width:150px;
            }
            .dropdown_ctn {
              width:90%;
            display: flex;
            justify-content: space-between;
            margin:0 auto;
          }
          .full_name,
          .phone_number,.line_one{
            width: 90%;
            border: 1px solid #cbcbcb;
            background-color: #f4f5f8;
            border-radius: 8px;
            padding: 19px;
            margin-top:20px;
          }
          .dropdown_input {
            margin: 10px 5px;
            width: 100%;
            min-width: 200px;
            max-width: 200px;
            border: 1px solid #cbcbcb;
            background-color: #f4f5f8;
            border-radius: 8px;
            outline: none;
            display: inline-block;
            padding: 1em 2em 1em 1em;
            font: inherit;
            line-height: inherit;
            -webkit-appearance: none;
            -moz-appearance: none;
            -ms-appearance: none;
            appearance: none;
            background-repeat: no-repeat;
            background-image: linear-gradient(45deg, transparent 50%, currentColor 50%),
              linear-gradient(135deg, currentColor 50%, transparent 50%);
            background-position: right 15px top 1.5em, right 10px top 1.5em;
            background-size: 5px 5px, 5px 5px;
          }

          @media(max-width:876px){
            .profile-box{
              display:none;
            }
            .profile_wrapper{
              justify-content:center;
              
            }
            .title{
              padding-left:17%;
            }
            
          }
          @media(max-width:486px){
            .title{
              padding-left:20px;
            }
            .container{
              left:50%;
            }
            
            
            .profile_wrapper{
              justify-content:center;
              
            }
            .show-box{
              margin-left:0px;
              width:93%;
            }
          }
          `}
      </style>
    </Layout>
  );
};

export default Profile;
