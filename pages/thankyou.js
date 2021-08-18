import Link from 'next/link';
import Layout from '../components/Layout';

const ThankYou = () => {
  return (
    <Layout>
      <div className='thank'>
        <img className='image' src='/images/checked.png' alt='success' />
        <h1>Your order has been successfully placed.</h1>
        <p>Your order is in progress now. You can also checkout your delivery status in below:</p>
        <Link className='btn1' href='/'>
          <div className='btn'>
            <p>Check Delivery Status </p>
          </div>
        </Link>
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
          }
          .btn p {
            padding: 16px;
          }
          .image {
            padding: 20px;
          }

          @media (max-width: 476px) {
            .btn {
              width: 90%;
            }
            .btn p {
              padding: 12px;
            }
          }
        `}
      </style>
    </Layout>
  );
};
export default ThankYou;
