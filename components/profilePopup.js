import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { getToken, getStorageUserInfo } from '../localStorage/localStorage';
import { LangContext } from '../constants/langcontext';

const ProfilePopup = ({ cancel, logout }) => {
  const [token, setToken] = useState(getToken());

  const [id, setId] = useState();
  const { lang } = useContext(LangContext);

  useEffect(() => {
    if (token) {
      var user_id = JSON.parse(getStorageUserInfo()).id;
      setId(user_id);
    }
  }, []);

  return (
    <div className='main_container'>
      <div id='pop' className='container'>
        <div className='popup_container'>
          <div className='profile_menu'>
            <div className='top_bar'>
              <span className='profile'>MENU</span>
              <span className='cancel' onClick={cancel}>
                {lang.cancel}
              </span>
            </div>
            {token ? (
              <>
                {' '}
                <div className='menu_item'>
                  <Link href={`/profile/${id}`}>
                    <p>{lang.information}</p>
                  </Link>
                </div>
                <div className='menu_item'>
                  <Link href={`/profile/${id}/orderhistory`}>
                    <p>{lang.orderHistory}</p>
                  </Link>
                </div>
                <div className='menu_item'>
                  <p onClick={logout}>{lang.logout}</p>
                </div>
              </>
            ) : (
              // <div className='menu_item'>
              //     <Link href='/login'><p>LOG IN</p></Link>
              //  </div>
              ''
            )}

            {/* <div className='menu_item' >
                            {
                                token === null ? <Link href='/login'><p>LOG IN</p></Link> : <p onClick={logout}>LOG OUT</p>
                            }

                        </div> */}
          </div>
        </div>
      </div>

      <style jsx>{`
        .main_container {
          position: fixed;
          width: 100%;
          height: 400px;
          top: 0;
          bottom: 0;
          z-index: 10000;
          left: 0;
        }
        .container {
          position: fixed;
          width: 100%;
          bottom: -60px;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'Montserrat';
        }
        .popup_container {
          display: flex;
          flex-direction: column;
          background-color: #ffffff;
          padding: 40px 40px;
          color: #394358;
        }

        .top_bar {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #d8d9db;
          padding-bottom: 13px;
          cursor: pointer;
        }

        .menu_item {
          display: flex;
          flex-direction: column;
          position: relative;
          margin-top: 23px;
          cursor: pointer;
        }
        .profile,
        .cancel {
          font-size: 16px;
          font-weight: 600;
        }
        .profile {
          color: #394358;
        }
        .cancel {
          color: #f58723;
        }

        .menu_item p::after {
          content: '›';
          position: absolute;
          top: -4px;
          right: 15px;
          font-size: 24px;
          color: #272b35;
        }

        @media (max-width: 768px) {
          .popup_container {
            max-width: 100%;
          }
        }

        @media (max-width: 786px) {
          .btn1,
          .btn2 {
            padding: 8px;
            margin: 4px;
          }
        }

        @media (max-width: 676px) {
          .popup_container {
            padding-top: 20px;
            padding-bottom: 40px;
            padding-left: 20px;
            padding-right: 20px;
          }
          .item_list p {
            font-size: 13px;
          }

          .btn {
            font-size: 12px;
          }
<<<<<<< HEAD
          
          @media(max-width:530px){
            .btn{
              font-size:10px;
            }
            .popup_container{
              min-width:320px;
            }
            .container{
              top:85%;
            }
            .login_container{
              top:94%;
            }
=======
        }

        @media (max-width: 530px) {
          .btn {
            font-size: 10px;
>>>>>>> 1592ace3ac213ddeec9a98784b7a4d62ec840d25
          }
          .popup_container {
            min-width: 320px;
          }
          .container {
            bottom: -55px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProfilePopup;
