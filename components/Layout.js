import Router, { useRouter } from 'next/router';
import NProgress from 'nprogress';
import Link from 'next/link';
import FooterRes from './footer/footerRes';
import Footer from './Footer';
import { useWindowWidth } from '@react-hook/window-size';
import { connect, useDispatch, useSelector } from 'react-redux';
import { selectItemCount } from '../store/cart/cart.selector';
import { createStructuredSelector } from 'reselect';
import {
  getToken,
  clearUserInfo,
  clearUserToken,
  setSearchLocal,
  getSearchLocal,
  getStorageUserInfo,
} from '../localStorage/localStorage';
import { getSearchProductName } from '../store/product/action';
import { cleanEthic, setAccessToken } from '../store/login/action';
import { selectToken } from '../store/login/selector';
import { useCallback, useContext, useRef } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { useEffect, useState } from 'react';
import SearchResult from './searchResult/searchResult';
import { getSearchProduct } from '../store/product/action';
import { LangContext } from '../constants/langcontext';
import authApi from '../constants/authApi';
import { CLEAN_ETHIC } from '../store/login/type';
import Axios from 'axios';
import api from '../constants/api';

Router.onRouteChangeStart = (url) => NProgress.start();

Router.onRouteChangeComplete = () => NProgress.done();

Router.onRouteChangeError = () => NProgress.done();

const Layout = ({
  children,
  itemCount,
  searchProduct,
  cleanEthic,
  setAccessToken,
  selectToken,
}) => {
  // const Layout = ({ children, itemCount, cleanEthic }) => {

  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [token, setToken] = useState(false);
  const [search, setSearchInput] = useState('');
  const [focus, setFocus] = useState(false);
  const [resultTitle, setResultTitle] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [recent, setRecent] = useState('');
  const [result, setResult] = useState('');
  const { searchProducts, searchProductNames } = useSelector((state) => state.product);
  const [blur, setBlur] = useState(true);
  const [items, setItems] = useState([]);
  const [isValue, setValue] = useState(false);

  const [names, setNames] = useState([]);
  const [current, setCurrent] = useState('');
  const [shopurl, setShopUrl] = useState(null);
  const { handleLanguageChange, lang, language } = useContext(LangContext);

  let items_new = [];

  useEffect(() => {
    if (window.location.hostname.includes('uat')) {
      setShopUrl('https://merchant.uat-aya-zay.com/');
    } else {
      setShopUrl('https://merchant.aya-zay.com/');
    }
  }, []);

  const handleInputChange = (event) => {
    let search_value = event.target.value;
    let suggestions = [];
    let products = [];
    setSearchInput(search_value);
    let localItems = getSearchLocal();

    if (localItems === null) {
      setSearchLocal([]);
    }
    if (search_value.length > 2) {
      dispatch(getSearchProductName(search_value));
      setValue(true);

      products = searchProductNames.map((product) => {
        return product.name_english;
      });

      setItems(products);
      //const regex = new RegExp(`^${search_value}`, 'i');
      //suggestions = items.sort().filter(v => regex.test(v));
      suggestions = items.sort().filter((item) => item.includes(search_value));
      let uniqueSuggestions = [...new Set(suggestions)];
      setSuggestions(uniqueSuggestions);
      setSearchInput(search_value);
      setFocus(true);
      setResult(suggestions.length === 0 ? 'No search result' : 'Search Results');
    } else if (search_value.length === 0) {
      setValue(false);

      setFocus(false);
      setRecent('Recent Searches');
      setSuggestions([]);
    }
  };

  const suggestionSelected = (value) => {
    setSearchInput(value);
    setSuggestions([]);
    Router.push(`/product/search?filter=${value}`);
    //searchLocalItems.push(...getSearchLocal(),value);
    items_new.push(...getSearchLocal(), value);
    //setSearchLocal(searchLocalItems.length !== 0 ? searchLocalItems : '');
    setSearchLocal(items_new);
    setSearchInput('');
    setFocus(false);
  };

  const handleSearch = (item) => {
    searchProduct(item);

    Router.replace(`/product/search?filter=${item}`);
    setSearchInput(item);
    setFocus(false);
  };

  const handleOnFocus = (e) => {
    let localItems = getSearchLocal();
    setCurrent(e.currentTarget.className);
    console.log('focus event is', e.currentTarget.className);
    if (localItems === null) {
      setSearchLocal([]);
    }
    setFocus(true);
    setRecent('Recent Searches');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let search_name = search.toString();
    if (search_name === '') {
      return null;
    }

    items_new.push(...getSearchLocal(), search_name);

    setSearchLocal(items_new);
    if (search_name === '') {
      return;
    }
    searchProduct(search_name);
    Router.push(`/product/search?filter=${search_name}`);

    setSearchInput('');
    setFocus(false);
    setRecent('Recent Searches');
  };
  const handleOnBlur = (e) => {
    setFocus(false);
  };

  const handleOnTouch = (e) => {
    setFocus(false);
  };

  useEffect(() => {
    const realtoken = getToken();
    if (realtoken !== null) {
      setAccessToken(realtoken);
    }
  }, [getToken]);

  useEffect(() => {
    if (selectToken) {
      setToken(true);
      setTimeout(() => {
        check(selectToken);
      }, 4000);
    }
  }, [selectToken]);

  const check = async (selectToken) => {
    const token = getToken();
    if (selectToken !== null && token) {
      console.log(selectToken);
      const headers = { headers: { Authorization: `Bearer ${selectToken}` } };
      try {
        const res = await Axios.get('https://api.aya-zay.com/customer', headers);
        if (res.status === 200) {
          console.log('success');
        }
      } catch (error) {
        if (error.response.status === 401) {
          logout();
        }
      }
    }
  };

  const width = useWindowWidth();
  let footer = '';
  if (width < 992) {
    footer = <FooterRes />;
  } else if (width > 992) {
    footer = <Footer />;
  }
  const logout = () => {
    clearUserInfo();
    clearUserToken();

    cleanEthic();
    setToken(false);
    Router.push('/');
  };
  const Profile = () => {
    const userinfo = getStorageUserInfo();
    Router.push(`/profile/${JSON.parse(userinfo).id}`);
  };
  return (
    <div>
      <OutsideClickHandler
        onOutsideClick={() => {
          setFocus(false);
        }}
      >
        <header className='heading'>
          <ul>
            <li className={router.pathname === '/comesoon' ? 'change_active' : ''}>
              <p className='mm_flag' onClick={() => handleLanguageChange()}>
                {language === 'en' ? (
                  <img src='/images/mm.jpg' alt='flag' className='mmlogo' />
                ) : (
                  <img src='/images/usaflag.png' alt='flag' className='logousa' />
                )}
              </p>
            </li>
            <li>
              <a className='get_app' href={shopurl} target='_blank'>
                {lang.goToMerchant}
              </a>
            </li>
            <li className={router.pathname === `/shopList` ? 'change_active' : ''}>
              <a className='get_app' href='/shopList/'>
                {lang.shop}
              </a>
            </li>
            <li className={router.pathname === '/comingsoon' ? 'change_active' : ''}>
              <Link href='/comingsoon'>
                <a className='get_app' href='#'>
                  {lang.getApp}
                </a>
              </Link>
            </li>
            {token === false ? (
              <li>
                <Link href='/login'>
                  <a className='register' href='#'>
                    &nbsp;&nbsp;{lang.login}
                  </a>
                </Link>
              </li>
            ) : (
              <li className={router.pathname === '/commingsoon' ? 'change_active' : ''}>
                <Link href='/commingsoon'>
                  <a>
                    <i className='fas fa-heart'></i>
                    <span className='wish_list'>{lang.wishList}</span>
                  </a>
                </Link>
              </li>
            )}
            {token === false ? (
              ''
            ) : (
              <li className='account-header'>
                <a href='#'>
                  <div className='dropdownkit'>
                    <i className='fas fa-user-alt'></i>
                    <span className='account'>{lang.account}</span>
                    <div className='drop_down'>
                      <ul className='drop'>
                        <li onClick={Profile}>{lang.profile}</li>
                        {token === false ? (
                          <Link href='/login'>
                            <li>{lang.login}</li>
                          </Link>
                        ) : (
                          <li onClick={logout}>{lang.logout}</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </a>
              </li>
            )}
          </ul>
        </header>
        <form onSubmit={handleSubmit}>
          <nav className='nav__container'>
            <div className='nav_header'>
              <div className='nav_logo'>
                <Link href='/'>
                  <a href='#'>
                    <img className='logo' src='/images/ayazaywhite.png' alt='logo' />
                    <img className='logo_two' src='/images/ayazay.png' alt='logo-two' />
                  </a>
                </Link>
              </div>

              <div className='searchbar__container'>
                <div className='search_box'>
                  <i
                    className='fa fa-search'
                    aria-hidden='true'
                    onClick={handleSubmit}
                    style={{
                      cursor: 'pointer',
                      padding: '5px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  ></i>
                  <input
                    className='search_me'
                    name='search'
                    value={search}
                    type='text'
                    autoComplete='off'
                    placeholder={lang.searchProducts}
                    onClick={handleOnFocus}
                    onChange={handleInputChange}
                    onDoubleClick={handleOnBlur}
                  />

                  {focus ? (
                    <SearchResult
                      searchProduct={searchProduct}
                      recent={recent}
                      result={result}
                      suggestions={suggestions}
                      suggestionSelected={suggestionSelected}
                      search={search}
                      searchProduct={searchProduct}
                      setSearchInput={setSearchInput}
                      handleSearch={handleSearch}
                    />
                  ) : null}
                </div>

                <button className='search_btn' onClick={handleSubmit}>
                  {lang.search}
                </button>
              </div>

              <div className='cart__container'>
                <i className='fa fa-shopping-cart' aria-hidden='true'></i>
                <Link href='/addtocart'>
                  <a href='#'>
                    <p className='my_cart'>
                      {lang.yourCart} ({itemCount})
                    </p>
                  </a>
                </Link>
              </div>
            </div>
          </nav>
        </form>
      </OutsideClickHandler>
      <React.Fragment>{children}</React.Fragment>
      {footer}
      <style jsx>{`
          .account-header:hover,
          .wish_list:hover,
          .register:hover,
          .get_app:hover{
            color:#aa222a;
          }
          .account-header{
            position:relative;
          }
          .dropdownkit:hover .drop_down{
            display:block;
          }
          .drop_down{
            display:none;
          }

          .drop{
            display:flex;
            flex-direction:column;
            position:absolute;
            background:white;
            width:100%;
            text-align:center;
          }
          .drop li{
            padding:10px;
            border-bottom:1px solid #cbcbcb;
          }
          .drop li:hover{
            background:#f0f0f0;
          }
          header{
              font-size: 14px;
              color: #394358;
              line-height: 24px;
              text-align: right;
              font-weight: 500;
              display:block;
              max-width:1140px;
              margin:0 auto;
              padding:9px 0px;
          }
          .change_active{
            color:#aa222a;
          }
          ul>li:not(:last-child):not(:first-child){

              border-right: 1.5px solid #c5c6c8;
              padding-left:12px;
              padding-right:12px;


          }
          .heading{

          }

          .mm_flag img {
              margin-bottom: -5px;
              border-right:1.5px solid #c5c6c8;
              padding-left:12px;
              padding-right:12px;
          }
          .wish_list{
              margin-left: 5px;
          }
          .account{
              margin-left: 5px;


          }
          .account-header{
            padding-left:12px;

          }
          .arrow{
            padding-left:6px;
          }
          .search_panel{

          }

          /* navbar */
          .nav__container{

            top: 42px;
            left: 0;
            right: 0;
            z-index: 99;
            background-color: #aa222a;padding-right
            border: 1px solid #979797;
            width: 100%;
            height: 75px;

          }


          .nav_header{
              display: flex;
              justify-content: space-between;
              color: #ffffff;
              height: 100%;
              align-items: center;
              max-width: 1140px;
              margin: 0 auto;
          }
          .nav_logo{
            padding-right:3%;
          }
          .logousa{
            width:60px;
            height:25px;
          }
          .mmlogo{
            height: 24px;
             padding-top: 2px;
             display:block;
          }
          .logo{

            display:block;
          }
          .logo_two{
            display:none;
          }

          .searchbar__container{
              background-color: #ffffff;
              width:100%;
              height: 50px;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 2px;
              padding: 0 15px;

          }
          .search_box{
              display: flex;
              width: 100%;
          }

          .searchbar__container i{
              color: #394358;


          }

          .search_btn{
              outline: none;
              border: none;
              border-left: 1.5px solid #c5c6c8;
              height:37px;
              background-color: transparent;
              text-transform: uppercase;
              color: #aa222a;
              font-size: 16px;
              letter-spacing: 0.75px;
              font-weight: 600;
              padding-top:0px;
              padding-bottom:0px;
              padding-left:10px;
              cursor:pointer;
              width:88px;


          }
          input{
              border: none;
              outline: none;
              margin-left: 10px;
              font-size: 16px;
              font-weight: 500;
              color: #394358;
              width:100%;
              padding:5px;

          }



          .cart__container{
              display: flex;
              padding-left:2%;

          }
          .my_cart{
              margin-left: 10px;
              width:110px;
          }
          @media(max-width:1500px){
            .nav_header{
                padding: 0 20px;
                margin:0 auto;

            }
            .searchbar__container{
                flex: 0 0 70%;
            }
            .header{
                display: none;
            }

        }
        @media(max-width:1200px){
          .searchbar__container{
            flex: 0 0 55%;
          }
          .nav_header{
            padding: 0 13px;
          }
          header{
            transform:translate(-1%,1px)
          }

        }
        @media(max-width:1150px){
          header{
            transform:translate(-2%,1px)
          }
        }
        @media(max-width:876px){
          .header{
            display: none;
        }
       .logo{
        display: block;
        padding-right:5px;
       }
       .logo_two{
          display:none;
       }
       .searchbar__container{
           padding:0 20px;
           margin-right: 23px;
           margin-left: 16px;
           flex:0 0 60%;
       }
       .search_btn{
           display: none;
       }
       .cart__container{
           display: none;
       }
       .beauty__personal img{
         height:144px;
       }
       .heading{
         display:none
       }

        }


        @media(max-width:480px){

          .header{
            display: none;
        }
            .logo{
            display:none;
              padding: 0 10px;
            }
            .logo_two{
                display:block;
                padding-left:10px;
            }

         .searchbar__container{

             font-size:14px;
             margin-left: 10px;
             flex:0 0 70%;
             padding:0 11px;
         }
         input{
           width:87%;
           margin-left:5px;
           font-size:14px;
         }

        }
          `}</style>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  itemCount: selectItemCount,
  selectToken: selectToken,
});
export default connect(mapStateToProps, { cleanEthic, setAccessToken })(Layout);
