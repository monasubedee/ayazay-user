import QRCode from 'react-qr-code';
import Loader from 'react-loader-spinner';
import { useContext, useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import firebase from '../../auth/firebaseAuth';
import authapi from "../../constants/authApi";
import { LangContext } from '../../constants/langcontext'


const AyaPay = () => {

  const { query } = useRouter();
  const [ayaPay, setAyaPay] = useState({});
  const [loading, setLoading] = useState(true);
  const { lang } = useContext(LangContext);
  const [message, setMessage] = useState("");

  const fetchQrCode = () => {
    authapi.get(`/payment/ayapay/request-qr?order_id=${query.id}`)
      .then(res => {
        localStorage.setItem('invoice_no', res.data.invoice_no);
        setLoading(false);
        setAyaPay(res.data);
      }).catch(err => {
        setMessage(err.response.data.message);
        setLoading(false);
      }

      )
  }

  useEffect(() => {
    fetchQrCode();
  }, []);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('ayapay')
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          storeMessages(doc.data())
        })
      });
    return () => unsubscribe();
  }, []);

  const storeMessages = (noti) => {
    const invoice_no = localStorage.getItem("invoice_no");
    console.log("invoice_no", invoice_no, noti.invoice_no)
    if (noti.invoice_no === invoice_no) {
      if (query.type === "ayapay") {
        Router.push('/payment/ayapay/success');
        localStorage.setItem("invoice_no", "");
      }
    }
    else {
      console.log("invoice ids are not matching...")
    }
  }

  return (
    <div className='aya_pay'>
      <div className='aya_pay_container'>
        <div className='aya_pay_wrapper'>
          <div className='scan_me'>

            {/* {
              ayaPay?.qrcode ? (<><p>QR CODE</p><QRCode value={ayaPay?.qrcode} /><small className="tips">Tips: Your QR code can be expired!</small></>) : <Loader type="ThreeDots" color="#aa222a" height="90" width="90" />
            } */}
            {
              loading === true ? <Loader type="ThreeDots" color="#aa222a" height="90" width="90" />
                : ayaPay.qrcode ? (<><p>QR CODE</p><QRCode value={ayaPay?.qrcode}></QRCode><small className='tips'>Tips:Your QR code can be expired!</small></>) : <p>{message}</p>
            }

          </div>

        </div>
        <div className='instruct_container'>
          <div className='instruct_wrapper'>
            <span className='instruct'>{lang.instructions}</span>
            <div className='step_one' style={{ paddingTop: "32px" }}>
              <div className='text'>
                <p className='instruct_text' style={{ width: "58%" }}>
                  {lang.open}
                </p>
              </div>

            </div>
            <div className='step_one'>
              <div className='text'>
                <p className='instruct_text'>
                  {lang.Login}
                </p>
              </div>
              <div className='instruct_img'>
                <span>STEP 2</span>
                <img src='/images/step_two.png' alt="step_one" />

              </div>
            </div>
            <div className='step_one'>
              <div className='text'>
                <p className='instruct_text'>
                  {lang.openQr}
                </p>
              </div>
              <div className='instruct_img'>
                <span>STEP 3</span>
                <img src='/images/step_three.png' alt="step_one" />

              </div>
            </div>
            <div className='step_one'>
              <div className='text'>
                <p className='instruct_text_spe'>{lang.enter}</p>
              </div>
              <div className='instruct_img'>
                <span style={{ paddingTop: "20px" }}>STEP 4</span>
                <img src='/images/step_four.png' alt="step_one" />

              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
             .scan_me {
               display: flex;
               flex-direction: column;
               justify-content: center;
               align-items: center;
             }
             .aya_pay_wrapper {
               border: 1px solid #dcdcdc;
               margin-top: 16px;
               padding-top: 32px;
               padding-bottom: 47px;
             }
             .scan_me p {
               font-size: 16px;
               font-weight: 600;
               padding-bottom: 16px;
             }
             .step_one {
               display: flex;
               justify-content: space-between;
               font-size:14px;
             }
             .text {
               display: flex;
               align-items: center;
             }
             .instruct_text {
               width: 80%;
               line-height:1.71;
             }
             .tips{
               display:flex;
               justify-content:center;
               padding-top:10px;
             }
             .instruct_wrapper {
               padding-top: 31px;
             }
             .instruct {
               font-weight: 600;
             }
             .instruct_img {
               display: flex;
               flex-direction: column;
               text-align: center;
               font-style: italic;
             }
             .instruct_img span {
               font-size: 12px;
               padding-bottom: 13px;
             }
             @media (max-width: 786px) {
               .instruct_container {
                 display: none;
               }
             }
           `}
      </style>
    </div>
  );
};

export default AyaPay;
