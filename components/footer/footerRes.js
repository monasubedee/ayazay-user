import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import FooterDrop from './footer_drop';
import { useWindowWidth } from '@react-hook/window-size';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectItemCount } from '../../store/cart/cart.selector';
import { getToken, clearUserInfo, clearUserToken } from '../../localStorage/localStorage';
import { cleanEthic } from '../../store/login/action';
import ProfilePopup from '../profilePopup';
import { LangContext } from '../../constants/langcontext';

const FooterRes = ({ itemCount, cleanEthic }) => {
  const width = useWindowWidth();
  console.log(itemCount);
  const [token, setToken] = useState(null);
  const [show, setShow] = useState(false);
  const { lang, handleLanguageChange, language } = useContext(LangContext);
  const [shopUrl, setShopUrl] = useState('');

  useEffect(() => {
    if (window.location.hostname.includes('uat')) {
      setShopUrl('https://merchant.uat-aya-zay.com/');
    } else {
      setShopUrl('https://merchant.aya-zay.com/');
    }
  }, []);

  const footeritem = {
    items: [
      {
        id: 'footer',
        title: `${lang.aboutUs}`,
        children: [
          {
            id: 'urlLink',
            content_title: '',
            value:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            url: '/',
          },
        ],
      },

      {
        id: 'footer',
        title: `${lang.ourServices}`,
        children: [
          {
            id: 'urlLink',
            value:
              'Lorem Ipsum Dolor Sit amet Consert Adispiscing Elit Sed DoUt enim ad minim Veniam, Quis nostrud Exercitation Ullamco',
            url: '/',
          },
        ],
      },

      {
        id: 'footer',
        title: `${lang.helpFAQs}`,
        children: [
          {
            id: 'urlLink',
            value:
              'Payment System Dolor Sit amet Consert Adispiscing  Elit Sed Do Ut enim ad minim Veniam, Quis nostrud n Ullamco',
            url: '/',
          },
        ],
      },

      {
        id: 'footer',
        title: `${lang.information}`,
        children: [
          {
            id: 'urlLink',
            value: 'Became a Merchant Lorem Ipsum Dolor Sit amet Consert Adispiscing Elit Sed Do',
            url: '/',
          },
        ],
      },
    ],
  };

  const gotoProfile = () => {
    setShow(true);
  };

  const cancel = () => {
    setShow(false);
  };

  useEffect(() => {
    const userToken = getToken();
    if (userToken) {
      setToken(userToken);
    }
  }, [getToken]);

  const logout = () => {
    clearUserInfo();
    clearUserToken();

    cleanEthic();
    setToken(null);
    setShow(false);
  };

  const merchant_route = process.env.REACT_APP_AYA_MERCHANT;
  console.log(merchant_route);
  return (
    <div className='container'>
      {show ? <ProfilePopup cancel={cancel} logout={logout} /> : ''}
      <footer>
        <div className='footer_container'>
          <div className='footer_block'>
            <div className='footer_wrap'>
              {footeritem.items.map((item, i) => {
                return <FooterDrop key={i} items={item} />;
              })}
            </div>
          </div>
        </div>
        <div className='footer_container_two'>
          <div className='footer_info_two'>
            <span className='footer_header'>{lang.contactUs}</span>
            <p className='footer_para'>
              Lorem Ipsum Dolor Sit amet <br />
              Consert Adispiscing Elit Sed Do
            </p>
          </div>
          <div className='footer_two'>
            <span className='footer_header'>{lang.downloadApp}</span>
            <p className='footer_para_two'>
              Google Playstore <br />
              Apple Store
            </p>
            <p
              className='mm_flag'
              style={{ cursor: 'pointer' }}
              onClick={() => handleLanguageChange()}
            >
              {language === 'en' ? (
                <img src='/images/mm.jpg' alt='flag' className='mmlogo' />
              ) : (
                <img src='/images/usaflag.png' alt='flag' className='logousa' />
              )}
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <a href={shopUrl}>
            <button className='footer'>{lang.goToMerchant}</button>
            <p className='footer_text'>&copy; 2020 by AYA-ZAY Co., Ltd. All Rights Reserved.</p>
          </a>
        </div>
      </footer>

      <div className='header_container'>
        <div className='header'>
          <ul>
            <li>
              <Link href='/'>
                <a href='#'>
                  <img src='/images/home.png' alt='home' />
                </a>
              </Link>
            </li>
            <li>
              <Link href='/comingsoon'>
                <a href='#'>
                  <img src='/images/wishlist.png' alt='wishlist' />
                </a>
              </Link>
            </li>
            <li>
              <Link href='/addtocart'>
                <a href='#' className='cart'>
                  {itemCount === 0 ? '' : <span className='count'>{itemCount}</span>}
                  <img src='/images/add-to-cart.png' alt='home' />
                </a>
              </Link>
            </li>
            <li>
              {token ? (
                // <Link href='/login'>
                //   <a href='#'>
                <img
                  src='/images/profile.png'
                  alt='profile'
                  onClick={gotoProfile}
                  style={{ cursor: 'pointer' }}
                />
              ) : (
                //   </a>
                // </Link>
                <Link href='/login'>
                  <img src='/images/icons8-exit-24.png' alt='profile' />
                </Link>
              )}

              {/* <img src='/images/profile.png' alt='profile' onClick={gotoProfile} style={{cursor:"pointer"}} /> */}
            </li>
          </ul>
        </div>
      </div>

      <style jsx>
        {`
          .cart {
            position: relative;
          }
          .count {
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            font-size: 12px;
            background: #aa222a;
            border-radius: 50%;
            width: 23px;
            height: 23px;
            position: absolute;
            top: -19px;
            left: 25px;
          }
          .container {
            background-color: #394358;
            color: #ffffff;
          }
          .mmlogo {
            width: 54px;
            padding-top: 10px;
          }
          footer {
            padding-top: 75px;
            max-width: 1140px;
            margin: auto;
          }
          .footer_container {
            display: flex;

            justify-content: space-between;
          }
          .footer_block {
            width: 100%;
          }
          .footer {
            width: 100%;
            background-color: #fff;
            padding: 15px 20px;
            margin-top: 15px;
            border-radius: 4px;
            font-size: 14px;
            font-weight: 600;
            color: #aa222a;
            text-align: center;
            cursor: pointer;
            border: none;
            outline: none;
          }
          .footer_wrap span {
            font-size: 14px;
            font-weight: 600;
          }
          .footer_wrap p {
            font-size: 13px;
          }
          .footer_container_two {
            padding-top: 30px;
            display: flex;
            justify-content: space-between;
          }

          .footer_text {
            display: flex;
            padding-top: 66px;
            padding-bottom: 74px;
            flex-direction: column;
            align-items: center;
            font-size: 11px;
            font-weight: 500;
            color: #ffffff;
          }
          .footer_info_two {
            display: flex;
            flex-direction: column;
            color: #ffffff;
          }
          .footer_two {
            display: flex;
            flex-direction: column;
            color: #fff;
            position: absolute;
            left: 51%;
          }
          .footer_header {
            font-size: 14px;
            font-weight: 600;
          }
          .footer_para {
            font-size: 13px;
            line-height: 1.85;
            margin-top: 11px;
            width: 233px;
          }
          .footer_para_two {
            font-size: 13px;
            line-height: 1.85;
            margin-top: 11px;
          }
          .footer_info_two p {
            font-size: 13px;
            font-weight: normal;
            line-height: 1.85;
            margin-top: 11px;
          }
          .header_container {
            background-color: #ffffff;
            position: fixed;
            bottom: 0;
            right: 0;
            left: 0;
            z-index: 1000;
            display: none;
          }
          .header {
            max-width: 1140px;
            margin: 0 auto;
          }
          .header > * {
            display: flex;
            justify-content: space-around;
            padding: 16px 0px;
          }
          @media (max-width: 876px) {
            .header_container {
              display: block;
            }
          }

          @media (max-width: 1200px) {
            footer {
              padding-left: 20px;
            }
            .container {
              overflow: hidden;
            }
          }
          @media (max-width: 992px) {
            .footer_info_two {
              padding-left: 3%;
            }
            footer {
              padding-left: 0px;
              padding-top: 40px;
            }
            .footer_container_two {
              padding-top: 8px;
            }
            .footer_text {
              padding-top: 37px;
            }
          }
          @media (max-width: 480px) {
            .footer_para {
              width: 130px;
            }
            .footer_container_two {
              margin-top: 0px;
              padding-top: 0px;
            }
            .footer_text {
              padding-top: 30px;
            }
            footer {
              padding-top: 36px;
            }
            .footer_info_two {
              padding-left: 6%;
            }
          }
          @media (max-width: 360px) {
            .footer_info_two {
              padding-left: 8%;
            }
            footer {
              padding-top: 20px;
            }
          }
        `}
      </style>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  itemCount: selectItemCount,
});
export default connect(mapStateToProps, { cleanEthic })(FooterRes);
