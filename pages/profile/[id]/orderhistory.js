import { useContext, useEffect, useState } from 'react';
import Layout from '../../../components/Layout';
import authApi from '../../../constants/authApi';
import Loader from 'react-loader-spinner';
import Link from 'next/link';
import { getSearchProduct } from '../../../store/product/action';
import { getStorageUserInfo } from '../../../localStorage/localStorage';
import { useDispatch } from 'react-redux';
import { LangContext } from '../../../constants/langcontext';

const Orderhistory = () => {
  const [userData, setUserData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [userinfo, setuserInfo] = useState('');
  const dispatch = useDispatch();
  const { lang } = useContext(LangContext);
  const calldata = async () => {
    setLoading(true);
    try {
      const res = await authApi('/order/history');
      console.log(res);
      if (res.status === 200) {
        setUserData(res.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const searchProduct = (search_value) => {
    dispatch(getSearchProduct(search_value));
  };

  useEffect(() => {
    const userInfo = getStorageUserInfo();
    if (JSON.parse(userInfo) !== null) {
      setuserInfo(JSON.parse(userInfo).id);
    }
    calldata();
  }, []);

  return (
    <Layout searchProduct={searchProduct}>
      <div className='profile_container'>
        <p>{lang.orderHistory}</p>
        <div className='profile_wrapper'>
          <div className='profile-box'>
            <Link href={`/profile/${userinfo}`}>
              <p>{lang.information}</p>
            </Link>
            <p>{lang.orderHistory}</p>
          </div>
          <div className='show-box'>
            <table className='table'>
              <tr className='th'>
                <th>{lang.yourOrder}</th>
                <th>{lang.quantity}</th>
                <th>{lang.status}</th>
                <th>{lang.amount}</th>
              </tr>
              {Loading === true ? (
                <tr className='icon_position'>
                  <div style={{ height: '150px' }}></div>
                  <div className='Loading_ctn'>
                    <Loader type='Circles' color='#aa222a' height='30' width='30' />
                  </div>
                </tr>
              ) : userData.length === 0 ? (
                <tr className='icon_position'>
                  <div style={{ height: '150px' }}></div>
                  <div className='Loading_ctn'>
                    <p>{lang.orderItem}</p>
                  </div>
                </tr>
              ) : (
                userData.map((item) => {
                  return (
                    <tr className='td'>
                      <td style={{ fontWeight: '700' }}>{item.id}</td>
                      <td>{item.total_qty}</td>
                      <td>{item.status}</td>
                      <td style={{ fontWeight: '700' }}>{item.total_amount}</td>
                    </tr>
                  );
                })
              )}
            </table>
          </div>
        </div>
      </div>
      <style>
        {`
           .profile_container{
             max-width:1140px;
             margin:75px auto;
            color: #394358;

           }

           .profile_wrapper{
             display:flex;
           }
           .profile-box{
            margin-top:10px;
            width:29%;
            max-width:270px;
            border-radius: 4px;
            border: solid 1.5px #dcdcdc;
            height:160px;
           }
           .profile-box p{
             padding:29px 20px;
             cursor:pointer;
             position:relative;

           }
           .profile-box p:last-child{
             color: #aa222a;
             background-color: #fff5f5;
           }
            .profile-box p::after {
              content: '›';
              position:absolute;
              top:15px;
              right:15px;
              font-size: 30px;
            }
            .show-box{
              width:70%;
              margin-top:10px;
              margin-left:20px;
              padding:20px;
              border-radius: 4px;
              border: solid 1.5px #dcdcdc;
            }
            .show_data{
              display:flex;
              text-algin:center;
              width:100%;
              font-size:12px;
              border-bottom:solid 1.5px #dcdcdc;
            }
            .order_item{
              text-align:center;
              padding:20px 0px;
            }
            .icon_position{
              width:100%;
              position:relative;
              min-height:200px;
            }
            .Loading_ctn{
              text-align:center;
              padding:20px 0px;
              position:absolute;
              top: 40%;
              left: 60%;
              transform: translate(-50%, -50%);
            }
            .table {
              width:100%;
              border-collapse: collapse;
            }

            .th th{
              border-bottom:1px solid#dcdcdc;
              padding:20px 0px;
              width:25%;
              font-size:14px;
              font-weight:400;
            }
            .td td{
              text-align:center;
              padding:20px 0px;
              border-bottom:1px solid#dcdcdc;
              font-size:12px;
            }

            @media(max-width:567px){
              .profile_container p{
                padding-left:20px;
              }
            }

            @media(max-width:876px){
              .profile_wrapper{
                flex-direction:column;
               }
               .show-box{
                 width:95%;
                 margin:20px auto;
               }
               .profile-box{
                 display:none;
               }
                .Loading_ctn{
                top: 35%;
                left: 50%;
               }
            }
            @media(max-width:478px){
              .th th{
                font-size:12px;
              }
              .profile_container{
                margin-top:25px;
              }
            }


          `}
      </style>
    </Layout>
  );
};

export default Orderhistory;
