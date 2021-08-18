
import { useContext } from 'react';
import OtpInput from 'react-otp-input';
import {LangContext} from '../constants/langcontext';


const OtpModal = ({ errorcheck, otpchange, oncloseModal, Resend, ResendError, otpSubmit, otpcode }) => {


  const {lang} = useContext(LangContext);

  return (
    <div>
      <div className="main_container">
        <div className="container" id="pop">
          <div className="popup_container">
            <div className="contentTitle">
              <div className="title">
                <p>{lang.otpMobileNumber}</p>
                <p>{lang.pleaseType}</p>
              </div>
              <div className="content_close">
                <p className="fas fa-times" id="clickClose" onClick={oncloseModal} ></p>
              </div>
            </div>
            <div className="otpinput">
              <OtpInput
                onChange={otpchange}
                numInputs={6}
                isInputNum={true}
                className="otp"
                shouldAutoFocus
                value={otpcode}
                inputStyle={{
                  marginTop: '20px',
                  fontSize: '14px',
                  fontWeight: '500',
                  width: '100%',
                  padding: '10px 0px',
                  marginRight: '10px',
                  border: '1px solid #cbcbcb',
                  borderRadius: '3px',
                  backgroundColor: '#edeff2',
                  outline: 'none',
                }}
                separator={<span />}
              />
            </div>

            {errorcheck ? (<div style={{ textAlign: "center", marginTop: '5px' }}><span style={{ color: '#aa222a', fontSize: '13px' }}> OTP code seems wrong ,Please retype the number </span></div>) : null}
            <div className="resend"><u className="color" onClick={Resend}>{lang.resend}</u>
              {ResendError === null ? '' : <p className="color_error">{ResendError} </p>}
            </div>
            <div className="loginbtn">

              <button onClick={otpSubmit} className="btn">LOGIN</button>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
    *{
      margin: 0;
      padding: 0;
    }
    .color{
      color:#394358;
      cursor:pointer;
      padding:4px;
      letter-spacing: 1px;
      margin-right:20px;
    }
    .color_error{
      color:#aa222a;
      font-size:14px;
      padding:4px;
    }
    .resend{
      margin-top:10px;
      display:flex;
    }
    a{
      text-decoration: none;
    }
    .main_container{
      position : fixed;
      width: 100%;
      height:100%;
      top:0;
      bottom:0;
      z-index:10000;
      left:0;
      background: rgba(0, 0, 0, 0,0.5);
      animation: fadeIn 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
    }
    .container{
      position: fixed;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-family: 'Montserrat';
      background-color: transparent;
      animation: modalFadeIn 0.5s 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)
      animation: sketchIn 0.5s 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
    }
    .popup_container{
      display: flex;
      flex-direction:column;
      background-color: #ffffff;
      width: 60%;
      margin: 0 auto;
      padding:44px 44px;
      color:#394358;
    }
    .contentTitle{
      width:100%;
      display:flex;
      justify-content:space-between;
    }
    .title p{
      font-size:16px;
      font-weight:600;
    }
    .title p:last-child{
      font-weight:500;
      font-size:14px;
      color:#aa222a;
      margin-top:5px;
    }
    .content_close{
      margin-left:5px;
      cursor : pointer;
    }
    .btn{
      color:#ffffff;
      border:none;
      outline:none;
      width:100%;
      padding:21px 13px;
      border-radius: 8px;
      text-transform: uppercase;
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 0.75px;
      text-align: center;
      background:#aa222a;
      cursor : pointer;
    }
    .loginbtn{
      margin-top:18px;
      cursor : pointer;
    }
    .otpinput>*{
      margin-right: 15px!important;
    }
    @media(max-width:976px){
         .popup_container{
      width:calc(95% + 50px);
      margin: 0 auto;
      padding:30px;
    }

    .btn{
      padding:14px 0px;
    }
         .container{
    left:48%;
  }
    }
   @media(max-width:476px){
         .popup_container{
      width:calc(100% + 60px);
      margin: 0 auto;
      padding:30px;
    }
      .container{
    left:43%;
  }
  }

    @keyframes fadeIn {
      0% {
        background: rgba(0, 0, 0, 0);
      }
      100% {
        background: rgba(0, 0, 0, 0.7);
      }
    }
    @keyframes fadeOut {
      0% {
        background: rgba(0, 0, 0, 0.7);
      }
      100% {
        background: rgba(0, 0, 0, 0);
      }
    }
    @keyframes sketchIn {
      0% {
        stroke-dashoffset: 778;
      }
      100% {
        stroke-dashoffset: 0;
      }
    }
    @keyframes sketchOut {
      0% {
        stroke-dashoffset: 0;
      }
      100% {
        stroke-dashoffset: 778;
      }
    }

    `}</style>
    </div>
  )
}

export default OtpModal