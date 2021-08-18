import Link from 'next/link';
import { useEffect, useState } from 'react';
import Layout from '../../../../components/Layout';
import { getStorageUserInfo } from '../../../../localStorage/localStorage';
import { useDispatch } from 'react-redux';
import { getSearchProduct } from '../../../../store/product/action';

const Success = () => {
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    var info = JSON.parse(getStorageUserInfo());
    setUserId(info.id);
  }, []);

  const dispatch = useDispatch();

  const searchProduct = (search_value) => {
    dispatch(getSearchProduct(search_value));
  };

  return (
    <Layout searchProduct={searchProduct}>
      <div className='thank'>
        <img className='image' src='/images/checked.png' alt='success' />
        <h1>Your order has been successfully placed.</h1>
        <p>Your order is in progress now. You can also checkout your delivery status in below:</p>
        <div className='btn_ctn'>
          <Link className='btn1' href={`/profile/${userId}/orderhistory`}>
            <div className='btn2'>
              <p>Check Your Order</p>
            </div>
          </Link>
          <Link className='btn1' href='/'>
            <div className='btn'>
              <p>Continue Shopping </p>
            </div>
          </Link>
        </div>
      </div>
      <style jsx>
        {`
          .thank {
            max-width: 1140px;
            margin: 0 auto;
            height: 600px;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            color: #394358;
            text-align: center;
          }
          .btn_ctn {
            display: flex;
            width: 100%;
            justify-content: center;
          }
          .thank h1 {
            line-height: 1.6em;
            font-weight: 600;
            font-size: 20px;
          }
          .thank p {
            line-height: 1.6em;
            font-weight: 400;
          }
          .btn {
            cursor: pointer;
            width: 100%;
            max-width: 350px;
            margin-top: 20px;
            background: #aa222a;
            color: #ffffff;
            border-radius: 8px;
            margin-left: 5px;
          }
          .btn2 {
            margin-right: 5px;
            cursor: pointer;
            width: 100%;
            max-width: 350px;
            margin-top: 20px;
            background: #ffffff;
            color: #aa222a;
            border: 1px solid #aa222a;
            border-radius: 8px;
          }
          .btn,
          .btn2 p {
            padding: 16px;
          }
          .image {
            padding: 20px;
          }
          @media (max-width: 876px) {
            .btn_ctn {
              flex-direction: column;
              text-algin: center;
            }
            .btn,
            .btn2 {
              margin: 8px auto;
            }
          }

          @media (max-width: 476px) {
            .btn,
            .btn2 {
              width: 90%;
            }
            .btn,
            .btn2 p {
              padding: 12px;
            }
          }
        `}
      </style>
    </Layout>
  );
};
export default Success;
