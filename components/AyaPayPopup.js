import Link from 'next/link';

const AyaPayPopup = ({ cancel}) => {
    return (
      <div className='main_container'>
        <div className='container' id='pop'>
          <div className='popup_container'>
            <div className='item_list'>
              <img src='/images/shop.png' alt='shop' />
              <p style={{textTransform:"capitalize"}}>
              Your Order Has Been Cancelled. Please Go To Shop In Order To Shop Again.
              </p>
              <div className='btn'>
                <div className='btn1' onClick={cancel}>
                  CANCEL
                </div>
                <Link href="/shopList">
                <div className='btn2'>
                  GO TO SHOP
                </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
  
        <style jsx>{`
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
            padding: 40px 40px;
            color: #394358;
            max-width: 540px;
          }
          .item_list {
            text-align: center;
          }
          .item_list p {
            margin: 10px 0;
            font-size: 18px;
            font-weight: 500;
            color: #151515;
            line-height: 1.33;
            letter-spacing: 0.22px;
          }
          .btn {
            width: 100%;
            display: flex;
            justify-content: space-between;
          }
          .btn {
            outline: 0;
            font-size: 14px;
            font-weight: 600;
          }
          .btn2 {
            cursor: pointer;
            border-radius: 6px;
            background-color: #aa222a;
            text-align: center;
            color: #ffffff;
            padding: 15px;
            width: 100%;
            margin: 10px;
            min-width: 100px;
          }
          .btn1 {
            cursor: pointer;
            width: 100%;
            border-radius: 6px;
            border: 1px solid #7f7f7f;
            background-color: #ffffff;
            text-align: center;
            color: #7f7f7f;
            margin: 10px;
            padding: 15px;
            min-width: 100px;
          }
          @media(max-width:786px){
            .btn1,
            .btn2 {
              padding: 8px;
              margin: 4px;
            }
          }
  
          @media (max-width: 676px) {
            .popup_container {
              padding: 20px 20px;
            }
            .item_list p {
              font-size: 13px;
            }
            
            .btn{
              font-size:12px;
            }
          }
          @media(max-width:530px){
            .btn{
              font-size:10px;
            }
            .popup_container{
              min-width:320px;
            }
          }
          @media(max-width:360px){
            .popup_container{
              min-width:290px;
            }
          }
          @media(max-width:320px){
            .popup_container{
              min-width:273px;
            }
          }
          
        `}</style>
      </div>
    );
  };
  
  export default AyaPayPopup;
  