import React, { useContext } from 'react';
import { LangContext } from '../constants/langcontext';

const Footer = () => {
  const { lang } = useContext(LangContext);
  const merchant_route = process.env.REACT_APP_AYA_MERCHANT;

  return (
    <div className='container'>
      <footer>
        <div className='footer_container'>
          <div className='footer_info'>
            <span className='footer_header'>{lang.aboutUs}</span>
            <p className='footer_para'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <div className='footer_info'>
            <span className='footer_header'>{lang.ourServices}</span>
            <p className='footer_para'>
              Lorem Ipsum <br />
              Dolor Sit amet
              <br />
              Consert Adispiscing
              <br />
              Elit Sed Do
              <br />
              Ut enim ad minim
              <br /> Veniam, Quis nostrud <br />
              Exercitation Ullamco
            </p>
          </div>
          <div className='footer_info'>
            <span className='footer_header'>{lang.helpFAQs}</span>
            <p className='footer_para'>
              Payment System <br />
              Dolor Sit amet
              <br />
              Consert Adispiscing
              <br />
              Elit Sed Do
              <br />
              Ut enim ad minim
              <br /> Veniam, Quis nostrud
              <br /> n Ullamco
            </p>
          </div>
          <div className='footer_info'>
            <span className='footer_header'>{lang.information}</span>
            <p className='footer_para'>
              Became a Merchant
              <br />
              Lorem Ipsum
              <br />
              Dolor Sit amet
              <br />
              Consert Adispiscing
              <br />
              Elit Sed Do
            </p>
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
            <p className='footer_para'>
              Google Playstore <br />
              Apple Store
            </p>
          </div>
        </div>

        <p className='footer_text'>&copy; 2020 by AYA-ZAY Co., Ltd. All Rights Reserved.</p>
      </footer>

      <style jsx>{`
        .container{
            background-color: #394358;

        }
        footer{
            padding-top: 75px;
            max-width: 1140px;
            margin: auto;

        }
        .footer_container{
            display: flex;
            justify-content: space-between;
        }
        .footer_info{
            display: flex;
            flex-direction: column;
            padding-right:4%;

        }

        .footer_info span {
            font-size: 14px;
            font-weight: 600;
            color: #ffffff;
            line-height: 1.71px;
        }
        .footer_info p{
            font-size: 13px;
            font-weight: normal;
            line-height: 1.85;
            color: #ffffff;
            margin-top: 12px;
            width: 233px;
        }
        .footer_container_two{
            margin-top: 44px;
            display: flex;
            justify-content: space-between;
        }


        .footer_text{
            display: flex;
            margin-top: 66px;
            padding-bottom: 15px;
            flex-direction: column;
            align-items: center;
            font-size: 11px;
            font-weight: 500;
            color: #ffffff;
        }
        .footer_info_two{
            display: flex;
            flex-direction: column;
            color: #ffffff;

        }
        .footer_two{
          position:absolute;
          left:50.5%;
          display: flex;
            flex-direction: column;
            color: #ffffff;
        }
        .footer_header{
          font-size:14px;
          font-weight:600;
          margin-top:9px;

        }
        .footer_para{
          font-size:13px;
          line-height:1.85;
          margin-top:11px;
          width:233px;
        }
        .footer_info_two p{
            font-size: 13px;
            font-weight: normal;
            line-height: 1.85;
            margin-top: 11px;
            margin-right: 410px;
        }


        @media(max-width:1200px){
          .container{
            padding: 0 39px;
            overflow:hidden;

          }


      `}</style>
    </div>
  );
};

export default Footer;
