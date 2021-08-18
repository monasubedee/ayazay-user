import React, { useState, useEffect, useContext } from 'react';
import { LangContext } from '../constants/langcontext'

const Popup = ({ closePopup }) => {

    const [shopurl, setShopUrl] = useState(null);
    const { lang } = useContext(LangContext);

    useEffect(() => {
        if (window.location.hostname.includes('uat')) {
            setShopUrl("https://merchant.uat-aya-zay.com/");
        } else {
            setShopUrl("https://merchant.aya-zay.com/");
        }
    }, [])

    return (

        <div>
            <div className="main_container">
                <div className="container" id="pop">
                    <div className="popup_container">
                        <div
                            className="popup_img"
                            style={{ background: 'url(/images/popup.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%' }}
                        />
                        <div className="popup_content">
                            <div className="content_close">
                                <p className="fas fa-times" id="clickClose" onClick={closePopup} ></p>
                            </div>
                            <div className="content_title">
                                <h1>{lang.youWannaSell}</h1>
                            </div>
                            <div className="content_para">
                                {lang.guide}
                                {lang.note}
                                
                            </div>
                            <div className="content_btn">
                                <a href={shopurl}>{lang.goToMerchant}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{
                `
 *{
            margin: 0;
            padding: 0;
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
            z-index: 1100;
            left:0;
            background-color : rgba(0,0,0,0.5);
        }
        .container{
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-family: 'Montserrat';
            width:95%;

        }
        .popup_container{
            display: flex;
            flex: 1 1;
            flex-direction: row;
            flex-wrap: wrap;
            background:#ffffff;
            max-width:788px;
            margin:0 auto;
            text-align:center;
        }

        .popup_img {
            display: flex;
            flex-direction: column;
            flex-basis: 100%;
            flex: 1;
        }

        .popup_img img{
            width:100%;
            height:100%;
        }

        .popup_content{
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            flex: 1;
            background-color: #ffffff;
            margin: 10px 20px 0px 20px;

        }
        .content_title h1{
            text-align:start;
            color: #394358;
            font-size: 28px;
            font-weight: 800;
        }
        .content_para{
            text-align:start;
            margin-bottom: 12px;
        }

        .content_para p{
            font-size: 13px;
            line-height: 1.57;
            color: #2d2d2d;
        }
        .content_para span{
            font-size: 12px;
            line-height: 1.5;
            color: #7d7d7d;
        }
        .content_btn{
            width: 80%;
            max-width:328px;
            text-align: center;
            border-radius: 8px;
            background-color: #aa222a;
            padding: 17px;
            padding-left : 12px;
            margin:0 auto;
            margin-top : 30px;
            margin-bottom:30px;
        }
        .content_btn a{
            text-transform: uppercase;
            color: #ffffff;
            font-size: 16px;
            font-weight: 600;
        }
        .content_close{
            text-align:end;
            margin-top:10px;
        }

        .content_close i{
            font-size: 20px;
            color: #acb2c0;
        }

        #clickClose {
            cursor : pointer;
        }
        @media(max-width:876px){
            .popup_container{
                flex-direction:column;
                width: 90%;
            }
            .content_title h1 {
                font-size:24px;
            }
            .container{
                width:100%;
            }
            .popup_img{
                min-height:300px;
            }
        }

        @media(max-width:576px){
           .container{
               width:90%;
           }
           .content_title h1 {
            margin:2px 0;
             }
           .content_btn{
               margin-bottom:20px;
               margin-top:10px;
           }
           .content_close{
               margin-top:0px;
           }
           .popup_img{
               min-height:200px;
           }
           .popup_container{
            flex-direction:column;
            width:100%;
        }
        }

            `
            }</style>
        </div>
    )

}

export default Popup;