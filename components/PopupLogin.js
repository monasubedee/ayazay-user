import React, { useEffect, useState } from 'react';
import { googleLogin } from '../auth/firebaseAuth';
import { setToken, getToken, setStorageUserInfo } from '../localStorage/localStorage';
import { connect } from 'react-redux';
import OtpModal from '../components/otpmodal';
import { customLogin, setAccessToken } from '../store/login/action';
import api from '../constants/api';
import { useRouter } from 'next/router';

const PopupLogin = ({ closePopupLogin, customLogin, setAccessToken, token }) => {
  const [userInfo, setUserInfo] = useState({});
  const [otpcode, setOTP] = useState();
  const [optModal, setOtpModal] = useState(false);
  const [phone, setPhone] = useState('');
  const [error, setError] = useState({
    phoneError: false,
    otpError: false,
    service: false,
    ResendError: null,
  });
  const router = useRouter();

  useEffect(() => {
    if (Object.keys(userInfo).length > 0 && getToken() !== null) {
      setStorageUserInfo(userInfo);
      closePopupLogin();
      if (getToken()) {
        router.push('/order/deliveryinformation');
      }
    }
  }, [userInfo]);

  useEffect(() => {
    if (token !== null) {
      setToken(token);
      getUserInfo();
    }
  }, [token]);

  const handlephone = (e) => {
    setPhone(e.target.value);
  };

  const otpchange = (e) => {
    setOTP(e);
  };

  const submitphone = async (e) => {
    e.preventDefault();
    const Phone = `95${phone.slice(1)}`;
    console.log(Phone);

    try {
      const response = await api.get(`customer/otprequest?phone=${Phone}`);
      console.log(response);
      if (response.status === 200) {
        if (response.data.statusCode === 503) {
          setError({ service: true });
          setTimeout(() => {
            setError({ service: false });
          }, 1500);
        } else {
          setOtpModal(true);
        }
      } else {
        setError({ service: true });
        setTimeout(() => {
          setError({ service: false });
        }, 1500);
      }
    } catch (error) {
      setError({ service: true });
      setTimeout(() => {
        setError({ service: false });
      }, 1500);
    }
  };

  const otpSubmit = async (e) => {
    console.log('otpsubmit', e);
    const Phone = `95${phone.slice(1)}`;
    console.log('PHONE ', Phone);
    const otpInt = parseInt(otpcode);
    const phoneData = {
      phone: Phone,
      otp: otpInt,
    };
    if (!phoneData.phone == ' ' || phoneData.otp.length < 5) {
      try {
        const response = await api.post(`/customer/otplogin`, phoneData);
        console.log(response);
        setToken(response.data.access_token);
        setAccessToken(response.data.access_token);
        setOtpModal(false);
        getUserInfo();
      } catch (error) {
        setError({ otpError: true });
      }
    } else {
      setError({ otpError: true });
    }
  };

  const loginWithGoogle = () => {
    googleLogin().then((result) => {
      const data = {
        uuid: `${result.user.uid}`,
      };
      customLogin(data);
    });
  };

  const getUserInfo = async () => {
    const response = await api.get('/customer/getinfo', {
      headers: {
        Accept: 'application/json',
        language: 'English',
        Authorization: `Bearer ${getToken()}`,
      },
    });
    setUserInfo(response.data);
  };
  const handleResend = async () => {
    const Phone = `95${phone.slice(1)}`;
    try {
      const response = await api.get(`customer/otprequest?phone=${Phone}`);
      if (response.status === 200) {
        if (response.data.statusCode === 503) {
          setError({ ResendError: 'Service is not avaliable' });
          setTimeout(() => {
            setError({ ResendError: null });
          }, 1500);
        } else {
          setError({ ResendError: 'Successfuly send' });
          setTimeout(() => {
            setError({ ResendError: null });
          }, 1500);
        }
      }
    } catch (error) {
      setError({ ResendError: 'Try again' });
      setTimeout(() => {
        setError({ ResendError: null });
      }, 1500);
    }
  };
  return (
    <div>
      <div className='main_container'>
        {optModal ? (
          <OtpModal
            errorcheck={error.otpError}
            otpchange={otpchange}
            oncloseModal={() => {
              setOtpModal(false);
            }}
            Resend={handleResend}
            ResendError={error.ResendError}
            otpcode={otpcode}
            otpSubmit={otpSubmit}
          />
        ) : (
          <div className='container' id='pop'>
            <div className='popup_container'>
              <div className='contentTitle'>
                <div className='title'>
                  <p>Welcome, Please Login to Continue</p>
                  {/* <p>New Member? Register Here.</p> */}
                </div>
                <div className='content_close'>
                  <p className='fas fa-times' id='clickClose' onClick={closePopupLogin}></p>
                </div>
              </div>
              <form onSubmit={submitphone}>
                <div className='ph_input'>
                  <input
                    type='number'
                    name='phone'
                    className='phInput'
                    onChange={handlephone}
                    value={phone}
                    placeholder='Phone (09 xxx-xxx-xxx)'
                  />
                  {error.service ? (
                    <div style={{ textAlign: 'center', marginTop: '5px' }}>
                      <span style={{ color: '#aa222a' }}> Service Unavailable for the number </span>
                    </div>
                  ) : null}
                </div>
                <div className='loginbtn'>
                  <button className='btn'>login</button>
                </div>
              </form>
              <div className='orLine'>
                <span className='line'>OR</span>
              </div>
              <div className='googlebtn'>
                <button className='btn' onClick={loginWithGoogle}>
                  login with Google
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
        }

        a {
          text-decoration: none;
        }
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
          padding: 44px 44px;
          color: #394358;
        }
        .contentTitle {
          display: flex;
          justify-content: space-between;
        }
        .title p {
          font-size: 16px;
          font-weight: 600;
        }
        .title p:last-child {
          font-weight: 500;
          font-size: 14px;
          color: #aa222a;
          margin-top: 5px;
        }

        .login__container {
          margin: 0;
          overflow-x: hidden;
          background-color: #ffffff;
          height: 100vh;
        }
        .login__container::-webkit-scrollbar {
          display: none;
        }

        .content_close {
          margin-left: 70px;
          cursor: pointer;
        }
        .ph_input {
          margin-top: 30px;
        }
        .ph_input input {
          width: 100%;
          padding: 18px 16px;
          border-radius: 8px;
          outline: none;
          background-color: #f4f5f8;
          border: 1px solid #cbcbcb;
        }
        .loginbtn {
          margin-top: 24px;
        }
        .loginbtn .btn {
          background-color: #aa222a;
          cursor: pointer;
        }
        .btn {
          color: #ffffff;
          border: none;
          outline: none;
          width: 100%;
          padding: 21px 13px;
          border-radius: 8px;
          text-transform: uppercase;
          font-size: 16px;
          font-weight: 600;
          letter-spacing: 0.75px;
          text-align: center;
        }
        .googlebtn {
          margin-top: 24px;
        }
        .googlebtn .btn {
          background-color: #e53238;
          cursor: pointer;
        }
        .facebookbtn .btn {
          background-color: #3b5998;
        }
        .orLine {
          margin: 52px 0px 32px 0px;
        }

        .line:before,
        .line:after {
          background-color: #b2b2b2;
          content: '';
          display: inline-block;
          height: 1px;
          position: relative;
          vertical-align: middle;
          width: 40%;
          font-size: 13px;
          color: #b2b2b2;
        }
        .line {
          display: flex;
          color: #b2b2b2;
          font-size: 13px;
          font-weight: 600;
          align-items: center;
          justify-content: center;
        }

        .line:before {
          right: 0.5em;
          margin-left: 15%;
        }

        .line:after {
          left: 0.5em;
          margin-right: 15%;
        }

        @media (max-width: 576px) {
          .popup_container {
            padding: 20px 20px;
            min-width: 300px;
          }
          .container {
            top: 50%;
          }
          .ph_input {
            margin-top: 10px;
          }
          .loginbtn {
            margin-top: 10px;
          }
          .orLine {
            margin: 10px 0px;
          }
          .googlebtn {
            margin-top: 10px;
          }
        }
      `}</style>
    </div>
  );
};

const mapStateToProps = ({ login }) => ({
  token: login.accessToken,
  userInfo: login.userInfo,
});

export default connect(mapStateToProps, { customLogin, setAccessToken })(PopupLogin);
