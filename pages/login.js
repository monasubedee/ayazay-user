import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { googleLogin } from '../auth/firebaseAuth';
import OtpModal from '../components/otpmodal';
import { customLogin } from '../store/login/action';
import { connect } from 'react-redux';
import { setToken, getToken, setStorageUserInfo } from '../localStorage/localStorage';
import { useRouter } from 'next/router';
import api from '../constants/api';
import { LangContext } from '../constants/langcontext';


const Login = ({ token, customLogin, message }) => {
  const [optModal, setOtpModal] = useState(false);
  const [otpcode, setOTP] = useState();
  const [phone, setPhone] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const { lang } = useContext(LangContext);
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
      const token = getToken();
      if (token) {
        router.push('/');
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
    console.log('HELLO', e.target.value);
    setPhone(e.target.value);
  };
  const otpchange = (e) => {
    console.log('optchange', e);
    setOTP(e);
  };

  const submitphone = async (e) => {
    e.preventDefault();
    const Phone = `95${phone.slice(1)}`;
    console.log(Phone);
   
    // getOtprequest(Phone);
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
    const otpInt = parseInt(otpcode);

    const phoneData = {
      phone: Phone,
      otp: otpInt,
    };
    if (!phoneData.phone == ' ' || phoneData.otp.length < 5) {
      try {
        console.log(phoneData.phone);
        console.log(phoneData.otp);
        const response = await api.post(`/customer/otplogin`, phoneData);
        console.log(response);
        setToken(response.data.access_token);

        setOtpModal(false);
        getUserInfo();
      } catch (error) {
        console.log(error);
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

    console.log(response);

    setUserInfo(response.data);
  };
  const handleResend = async () => {
    const Phone = `95${phone.slice(1)}`;
    try {
      const response = await api.get(`customer/otprequest?phone=${Phone}`);
      if (response.status === 200) {
        if (response.data.statusCode === 503) {
          setError({ ResendError: 'Please Try again' });
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
    <div className='login__container'>
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
      ) : null}
      <div className='login_wrapper'>
        <div className='left_side'>
          <Link href='/'>
            <div className='logo'>
              <img src='/images/ayazayred.png' alt='login' />
            </div>
          </Link>
          <div className='left_side_content'>
            <h1>Login</h1>
            <p>{lang.phoneNumber}</p>
            <div className='login_info'>
              <div className='login_inputs'>
                <form onSubmit={submitphone}>
                  <input
                    onChange={handlephone}
                    type='number'
                    name='phone'
                    className='phInput'
                    placeholder='Phone (09 xxx-xxx-xxx)'
                    required
                    value={phone}
                  />
                  {error.service ? (
                    <div style={{ textAlign: 'center', marginTop: '5px' }}>
                      <span style={{ color: '#aa222a' }}> Service Unavailable for the number </span>
                    </div>
                  ) : null}
                  {/*  {error.phoneError ? (
                    <div style={{ textAlign: "center", marginTop: "5px" }}>
                      <span style={{ color: "#aa222a" }}>
                        {" "}
                        Please correct the number{" "}
                      </span>
                    </div>
                  ) : null} */}
                  <div>
                    <button className='login_button'>LOGIN</button>
                  </div>
                </form>
              </div>
              <span className='line'>OR</span>
              <div className='buttons'>
                <div className='g-btn'>
                  <button className='google_button' onClick={loginWithGoogle}>
                    <i className='fab fa-google'></i>
                    <div>Log in with google</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='right_side'>
          <img src='/images/login2.png' className='bg' />
        </div>
      </div>

      <style jsx>
        {`
          .login__container {
            margin: 0;
            overflow-x: hidden;
            background-color: #ffffff;
            height: 100vh;
          }
          .login__container::-webkit-scrollbar {
            display: none;
          }

          .login_wrapper {
            display: flex;
            width: 100%;
          }

          .left_side {
            width: 50%;
            margin-top: 65px;
            display: flex;
            flex-direction: column;

            align-items: center;
          }
          .logo {
            cursor: pointer;
          }
          .logo img {
            width: 188px;
            margin-right: 201px;
          }

          .left_side_content {
            margin-top: 30px;
          }
          .left_side_content h1 {
            font-size: 32px;
            color: #394358;
            font-weight: 800;
            margin-right: 286px;
          }
          .left_side_content p {
            font-size: 20px;
            font-weight: 500px;
            width: 391px;
            line-height: 1.4;
            color: #394358;
            margin-top: 20px;
          }
          .login_inputs {
            margin-top: 50px;
            margin-bottom: 42px;
            display: flex;
            flex-direction: column;
          }

          .login_wrapper input {
            width: 391px;
            height: 60px;
            border-radius: 8px;
            border: solid 1px #cbcbcb;
            background-color: #f4f5f8;
            font-size: 20px;
            opacity: 0.44;
            color: #394358;
            padding: 22px 16px;
          }
          .login_button {
            width: 391px;
            height: 60px;
            border: none;
            border-radius: 8px;
            background-color: #aa222a;
            margin-top: 24px;
            outline: none;
            font-weight: 600;
            font-size: 16px;
            color: #ffffff;
            letter-spacing: 0.75px;
            text-align: center;
            cursor: pointer;
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
          .buttons {
            margin-top: 38px;

            display: flex;
            flex-direction: column;
          }
          .buttons i {
            font-size: 24px;
            padding-right: 30px;
          }
          .facebook_button {
            width: 391px;
            height: 60px;
            border: none;
            border-radius: 8px;
            outline: none;
            text-transform: uppercase;
            background-color: #3b5998;
            font-size: 16px;
            font-weight: 600;
            color: #ffffff;
            letter-spacing: 0.75px;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            cursor: pointer;
          }
          .google_button {
            width: 391px;
            height: 60px;
            border: none;
            outline: none;
            border-radius: 8px;
            text-transform: uppercase;
            background-color: #e53238;
            font-size: 16px;
            font-weight: 600;
            color: #ffffff;
            letter-spacing: 0.75px;
            text-align: center;
            margin-top: 25px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }

          .footer .footer_text {
            font-size: 14px;
            font-weight: 600;
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #394358;
            margin-top: 124px;
            margin-bottom: 20px;
          }
          .footer a {
            text-transform: uppercase;

            color: #aa222a;
            text-decoration: underline;
          }

          .right_side {
            width: 50%;
            position: fixed;
            right: 0;
            top: 0;
            bottom: 0;
            height: 100vh;
          }
          .bg {
            width: 100%;
            height: 100vh;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
          }

          @media (max-width: 976px) {
            .right_side {
              display: none;
            }
            .left_side {
              margin: 0 auto;
            }
            .logo img {
              margin-top: 31px;
            }
            .left_side_content {
              margin-top: 18px;
            }
          }
          @media (max-width: 875px) {
            .logo img {
              margin-left: 0%;
            }

            .left_side_content p {
              font-size: 18px;
            }
            .buttons {
              margin-top: 28px;
            }
            .login_inputs {
              margin-top: 33px;
              margin-bottom: 33px;
            }
            .login_button,
            .login_wrapper input,
            .facebook_button,
            .google_button {
              font-size: 15px;
            }
            .left_side_content h1 {
              font-size: 28px;
            }
            .footer {
              text-align: center;
              margin-top: 0px;
            }
          }
          @media (max-width: 480px) {
            .footer .footer_text {
              margin-left: auto;
              margin-right: auto;
            }
          }
          @media (max-width: 430px) {
            .login_button,
            .login_wrapper input,
            .facebook_button,
            .google_button {
              width: 328px;
              font-size: 14px;
              padding: 15px 10px;
            }
            .logo img {
              width: 134px;
            }

            .footer .footer_text {
              margin-top: 34px;
            }
            .login_inputs {
              margin-top: 24px;
              margin-bottom: 22px;
            }
            .buttons {
              margin-top: 18px;
            }
            .footer .footer_text {
              font-size: 12px;
              font-weight: 600;
              text-align: center;
            }
            .left_side_content {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              margin-top: 25px;
            }

            .left_side_content p {
              font-size: 17px;
              width: 328px;
              line-height: 1.4;
            }
            .left_side_content h1 {
              font-size: 24px;
              margin-left: 27px;
            }
          }
          @media (max-width: 360px) {
            .login_button,
            .facebook_button,
            .google_button {
              width: 280px;
              padding: 10px 10px;
              font-size: 12px;
              height: 54px;
            }
            .login_wrapper input {
              width: 280px;
              padding: 10px 10px;
              height: 54px;
            }
            .left_side_content {
              margin-top: 14px;
            }
            .left_side_content p {
              font-size: 16px;
              margin-top: 12px;
              margin-left: 46px;
            }
            .logo img {
              margin-left: 51px;
            }
            .google_button {
              margin-top: 15px;
            }
            .login_inputs {
              margin-top: 22px;
              margin-bottom: 15px;
            }

            .login_button {
              margin-top: 15px;
            }
            .buttons {
              margin-top: 14px;
            }
            .left_side_content h1 {
              font-size: 24px;
              margin-left: 74px;
            }

            .facebook_button i,
            .google_button i {
              padding-right: 10px;
            }
            .footer .footer_text {
              font-size: 11px;
              font-weight: 600;
              text-align: center;
              margin-top: 21px;
            }
          }
        `}
      </style>
    </div>
  );
};

const mapStateToProps = ({ login }) => ({
  token: login.accessToken,
  userInfo: login.userInfo,
});

export default connect(mapStateToProps, {
  customLogin,
})(Login);
