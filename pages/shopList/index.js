import Layout from '../../components/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { getShopList, getShopmore } from '../../store/shops/action';
import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import { getSearchProduct } from '../../store/product/action';
import Link from 'next/link';
import { LangContext } from '../../constants/langcontext';

const shopList = () => {
  const [slide, setSlide] = useState(false);
  // const [shopname, setShopName] = useState('')
  const [shopItemList, setShopItemList] = useState(null);
  const dispatch = useDispatch();
  const { query } = useRouter();
  const { shopList, total } = useSelector((state) => state.shop);
  const { shopProducts } = useSelector((state) => state.shop);
  const { lang } = useContext(LangContext);

  const searchProduct = (search_value) => {
    dispatch(getSearchProduct(search_value));
  };

  useEffect(() => {
    dispatch(getShopList());
  }, []);
  useEffect(() => {
    if (Object.keys(shopList).length !== 0) {
      console.log(shopList);
      setShopItemList(shopList);
    }
  }, [shopList]);
  let itemorigin = shopItemList !== null ? Object.keys(shopItemList).length : 0;

  const handleloadmore = () => {
    dispatch(getShopmore(shopItemList.length));
  };

  // useEffect(() => {
  //     if (Object.keys(query).length === 0 && Object.keys(shopList).length !== 0) {
  //         Router.push(`/shopList?id=${shopList.data[0].id}`)
  //     }
  // }, [query, Router, shopList]);

  // useEffect(() => {
  //     if (Object.keys(shopList).length !== 0) {
  //         if (query.id === undefined) {
  //             dispatch(getShopIdProduct(shopList.data[0].id))

  //         } else {
  //             dispatch(getShopIdProduct(query.id))

  //         }
  //     }

  // }, [query, shopList]);

  // useEffect(() => {
  //     console.log(query)
  //     if (query !== undefined && shopList.data !== undefined) {
  //         shopList.data.filter((item) => {
  //             if (parseInt(query.id) === item.id) {
  //                 console.log(item.name, 'itme')
  //                 return setShopName(item.name)

  //             }
  //         })
  //     }

  // }, [shopList, query]);
  // const handleSlick = () => {
  //     setSlide(true)
  // }
  // const handleDeleteSlide = () => {
  //     setSlide(false)
  // }
  console.log(shopItemList);
  return (
    <Layout searchProduct={searchProduct}>
      <div className='shop_list'>
        {/**  {slide === true ? (
                    <div className="slideMenu">
                        <div className="slideCloseBtn" onClick={handleDeleteSlide}>
                            <p>Close <span><i className="fa fa-times" aria-hidden="true"></i></span></p>
                        </div>
                        <ShopLeft shopList={shopList} handleDeleteSlide={handleDeleteSlide} />
                    </div>
                ) : null}
                <div className="shop_left_side">
                    <div className="shop_left">
                        <ShopLeft shopList={shopList} />
                    </div>
                </div>*/}
        {shopItemList !== null ? (
          <div className='shop_right_side'>
            {/*  <ShopRight shopProducts={shopProducts} shopList={shopList} handleSlick={handleSlick} shopname={shopname} />
             */}
            <div className='shopitemFlex'>
              {shopItemList.map((obj) => {
                return (
                  <div className='shoplistItem' key={obj.id}>
                    <img
                      src={`${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}${obj.img_url}`}
                      alt='detail-image'
                      onError={(e) => {
                        e.target.onerror = null;

                        e.target.src = '/images/OfficialStore.png';
                      }}
                    />
                    <div className='shop_name'>
                      <p>
                        {obj.name.length > 35
                          ? `${obj.name.split('').slice(0, 35).join('')}.....`
                          : obj.name.split('').slice(0, 35).join('')}
                      </p>
                      <Link href={`/shopdetail/${obj.id}/product`}>
                        <div className='go_store'>{lang.goStore}</div>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
            {itemorigin === 0 || itemorigin === total ? (
              <div className='load'></div>
            ) : (
              <div className='load'>
                <button className='btn2' onClick={handleloadmore}>
                  {lang.loadMore}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className='loading_center'>
            <div className='loading'>
              <div></div>
              <div></div>
            </div>
          </div>
        )}
      </div>

      <style jsx>
        {`

                     .loading_center {
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 800px;
                    }
                    .loading {
                        display: inline-block;
                        position: relative;
                        width: 210px;
                        height: 210px;
                    }
                    .loading div {
                        position: absolute;
                        background: #cbcbcb;
                        opacity: 1;
                        border-radius: 50%;
                        animation: loading 1.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;
                    }
                    .loading div:nth-child(2) {
                        animation-delay: -0.7s;
                    }
                    @keyframes loading {
                        0% {
                        top: 100px;
                        left: 100px;
                        width: 0;
                        height: 0;
                        opacity: 1;
                        }
                        100% {
                        top: -1px;
                        left: -1px;
                        width: 200px;
                        height: 200px;
                        opacity: 0;
                        }
                    }

                    .load{
                        text-align:center;

                    }
                      .btn2:hover {
                        outline: none;
                        border: none;
                        box-shadow: 2px 2px 2px rgb(0, 0, 0, 0.5);
                    }

                    .btn2 {
                        width: 50%;
                        background: #aa222a;
                        color: #fff;
                        padding: 14px;
                        border-radius: 8px;
                        border: none;
                        cursor: pointer;
                        outline: none;
                    }
                    .go_store{
                        width:70%;
                        margin:0 auto;
                        text-align: center;
                        border-radius: 6px;
                        border: solid 1px #aa222a;
                        padding: 12px 10px;
                        color:#aa222a;
                        cursor:pointer;
                    }
                    .shop_name{
                        font-family:inherit;
                        font-size:15px;
                        text-align:center;
                        margin:10px auto;
                    }
                    .shop_name p{
                        height:50px;
                        margin-bottom:10px;
                        font-weight:600;
                    }
                    .shopitemFlex{
                        min-width: 100%;
                        margin-bottom:50px;
                    }
                    .shoplistItem{
                        border:1px solid #cbcbcb;
                        border-radius:5px;
                        padding:3px;
                        margin-bottom :20px;
                    }


                    .shoplistItem  img{
                        width: 100%;
                        height:200px;
                        display:block;
                    }
                      @media screen and (min-width: 300px) {
                            .shopitemFlex {
                            margin:0 auto;
                            display: flex;
                            flex-wrap: wrap;
                            justify-content: space-around;
                        }
                        .shoplistItem{
                            flex: 0 1 calc(48% - 1em);
                        }
                    }
                    @media screen and (min-width:570px) {
                        .shoplistItem{
                            flex: 0 1 calc(30% - 1em);
                        }
                    }
                     @media screen and (min-width:800px) {
                        .shoplistItem{
                            flex: 0 1 calc(24% - 1em);
                        }
                    }
                    .shop_list{
                        display:flex;
                        max-width:1140px;
                        margin:auto;
                    }
                     .shop_left_side{
                         width:35%;
                         padding:50px 10px 20px 10px;
                     }
                     .shop_right_side{
                         width:100%;
                         padding:50px 10px 30px 10px;
                     }
                     @media(max-width:478px){
                       .shoplistItem img{
                         height:130px;
                       }
                       .btn2{
                         width:94%;
                       }
                       .shop_name{
                         font-size:14px;
                       }
                       .go_store{
                         width:74%;
                       }
                     }
                     @media(max-width:876px){
                        .shop_left_side{
                            display:none;
                         }
                      .shop_right_side{
                         width:95%;
                         padding-top:50px;
                         margin:0 auto;
                         }
                     }
                    .slideMenu{
                        width:calc(16% + 220px);
                        height: 100%;
                        position: fixed;
                        z-index: 1;
                        top: 0;
                        left: 0;
                        background-color: #ffffff;
                        overflow-x: hidden;
                        transition: 0.5s;
                        padding-top:30px;
                        padding:20px;
                        border-r
                        -moz-box-shadow:    -3px 0 5px 0 #555;
                        -webkit-box-shadow: -3px 0 5px 0 #555;
                        box-shadow:         -3px 0 5px 0 #555;
                    }

                    .slideCloseBtn{
                        cursor:pointer;
                        padding:18px;
                        text-align:right;
                        border-bottom:1px solid #cbcbcb;
                        margin-bottom:20px;
                        font-size:14px;
                    }
                    .slideBar{
                        width:34%;
                    }

                    `}
      </style>
    </Layout>
  );
};

export default shopList;
