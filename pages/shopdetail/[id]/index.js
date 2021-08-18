import React, { useContext, useEffect } from "react";
import Layout from "../../../components/Layout";
import Link from "next/link";
import { useWindowWidth } from "@react-hook/window-size";
import { getShop } from "../../../store/shops/action";
import { useSelector, useDispatch } from "react-redux";
import Slider from "react-slick";
import { useRouter } from "next/router";
import { Box, Typography } from '@material-ui/core';
import ProductDetail from "../../../components/shop/Id/ProductDetail";
import ShopDetailLoading from '../../../components/loading/shopdetailloading';
import { getSearchProduct } from '../../../store/product/action';
import {LangContext} from '../../../constants/langcontext';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box style={{ marginTop: '20px' }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const ShopDetail = () => {
  const { query } = useRouter();
  const {lang} = useContext(LangContext);


  const dispatch = useDispatch();
  const { shop } = useSelector((state) => state.shop);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const searchProduct = (search_value) => {
    dispatch(getSearchProduct(search_value));

  }


  useEffect(() => {
    console.log(query.id);
    dispatch(getShop(query.id));
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    arrows: true,
    initialSlide: 0,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
    ],
  };
  const onfollow=()=>{
    alert('Service is not Avaliable')
  }
  let width = useWindowWidth();
  let shopDetail = "";
  if (width > 1200) {
    shopDetail = (
      <div
        style={{
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
        }}
      >
        <Link href="/shopdetail/4/product">
          <a>
            <img
              style={{
                paddingLeft: "27px",
                paddingBottom: "10px",
              }}
              src="/images/shopimg/detail-image.png"
              alt="detail-image"
            />
          </a>
        </Link>

        <Link href="/shopdetail/4/product">
          <a>
            <img
              style={{ paddingLeft: "20px", paddingBottom: "10px" }}
              src="/images/shopimg/bitmap-copy-3.png"
              alt="bitmap10"
            />
          </a>
        </Link>
        <Link href="/shopdetail/4/product">
          <a>
            <img
              style={{ paddingLeft: "20px", paddingBottom: "10px" }}
              src="/images/shopimg/bitmap-copy-4.png"
              alt="bitmap10"
            />
          </a>
        </Link>
        <Link href="/shopdetail/4/product">
          <a>
            <img
              style={{ paddingLeft: "20px", paddingBottom: "10px" }}
              src="/images/shopimg/bitmap-copy-7.png"
              alt="bitmap10"
            />
          </a>
        </Link>
        <Link href="/shopdetail/4/product">
          <a>
            <img
              style={{ paddingLeft: "20px", paddingBottom: "10px" }}
              src="/images/shopimg/bitmap-copy-5.png"
              alt="bitmap10"
            />
          </a>
        </Link>

        <Link href="/shopdetail/4/product">
          <a>
            <img
              style={{ paddingLeft: "27px", paddingBottom: "40px" }}
              src="/images/shopimg/bitmap-copy-7.png"
              alt="detail-image"
            />
          </a>
        </Link>

        <Link href="/shopdetail/4/product">
          <a>
            <img
              style={{ paddingLeft: "20px", paddingBottom: "40px" }}
              src="/images/shopimg/bitmap-copy-5.png"
              alt="bitmap10"
            />
          </a>
        </Link>

        <Link href="/shopdetail/4/product">
          <a>
            <img
              style={{ paddingLeft: "20px", paddingBottom: "40px" }}
              src="/images/shopimg/bitmap-copy-3.png"
              alt="bitmap10"
            />
          </a>
        </Link>

        <Link href="/shopdetail/4/product">
          <a>
            <img
              style={{ paddingLeft: "20px", paddingBottom: "40px" }}
              src="/images/shopimg/detail-image.png"
              alt="bitmap10"
            />
          </a>
        </Link>

        <Link href="/shopdetail/4/product">
          <a>
            <img
              style={{ paddingLeft: "20px", paddingBottom: "40px" }}
              src="/images/shopimg/bitmap-copy-4.png"
              alt="bitmap10"
            />
          </a>
        </Link>
      </div>
    );
  } else {
    shopDetail = (
      <Slider {...settings}>
        <Link href="/shopdetail/4/product">
          <a>
            <img
              className="product"
              src="/images/shopimg/detail-image.png"
              alt="detail-image"
            />
          </a>
        </Link>

        <Link href="/shopdetail/4/product">
          <a>
            <img
              className="product"
              src="/images/shopimg/bitmap-copy-3.png"
              alt="bitmap10"
            />
          </a>
        </Link>
        <Link href="/shopdetail/4/product">
          <a>
            <img
              className="product"
              src="/images/shopimg/bitmap-copy-4.png"
              alt="bitmap10"
            />
          </a>
        </Link>
        <Link href="/shopdetail/4/product">
          <a>
            <img
              className="product"
              src="/images/shopimg/bitmap-copy-7.png"
              alt="bitmap10"
            />
          </a>
        </Link>
        <Link href="/shopdetail/4/product">
          <a>
            <img
              className="product"
              src="/images/shopimg/bitmap-copy-5.png"
              alt="bitmap10"
            />
          </a>
        </Link>

        <Link href="/shopdetail/4/product">
          <a>
            <img
              className="product"
              src="/images/shopimg/bitmap-copy-7.png"
              alt="detail-image"
            />
          </a>
        </Link>

        <Link href="/shopdetail/4/product">
          <a>
            <img
              className="product"
              src="/images/shopimg/bitmap-copy-5.png"
              alt="bitmap10"
            />
          </a>
        </Link>

        <Link href="/shopdetail/4/product">
          <a>
            <img
              className="product"
              src="/images/shopimg/bitmap-copy-3.png"
              alt="bitmap10"
            />
          </a>
        </Link>

        <Link href="/shopdetail/4/product">
          <a>
            <img
              className="product"
              src="/images/shopimg/detail-image.png"
              alt="bitmap10"
            />
          </a>
        </Link>

        <Link href="/shopdetail/4/product">
          <a>
            <img
              className="product"
              src="/images/shopimg/bitmap-copy-4.png"
              alt="bitmap10"
            />
          </a>
        </Link>
      </Slider>
    );
  }
  let categoryDetail = "";
  if (width > 1200) {
    categoryDetail = (
      <div
        style={{
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
        }}
      >

        <a>
          <img
            style={{
              paddingLeft: "27px",
              paddingBottom: "10px",
            }}
            src="/images/shopimg/detail-image.png"
            alt="detail-image"
          />
        </a>
        <a>
          <img
            style={{ paddingLeft: "20px", paddingBottom: "10px" }}
            src="/images/shopimg/bitmap-copy-3.png"
            alt="bitmap10"
          />
        </a>
        <a>
          <img
            style={{ paddingLeft: "20px", paddingBottom: "10px" }}
            src="/images/shopimg/bitmap-copy-4.png"
            alt="bitmap10"
          />
        </a>

        <a>
          <img
            style={{ paddingLeft: "20px", paddingBottom: "10px" }}
            src="/images/shopimg/bitmap-copy-7.png"
            alt="bitmap10"
          />
        </a>

        <a>
          <img
            style={{ paddingLeft: "20px", paddingBottom: "10px" }}
            src="/images/shopimg/bitmap-copy-5.png"
            alt="bitmap10"
          />
        </a>

        <a>
          <img
            style={{ paddingLeft: "27px", paddingBottom: "40px" }}
            src="/images/shopimg/bitmap-copy-7.png"
            alt="detail-image"
          />
        </a>

        <a>
          <img
            style={{ paddingLeft: "20px", paddingBottom: "40px" }}
            src="/images/shopimg/bitmap-copy-5.png"
            alt="bitmap10"
          />
        </a>

        <a>
          <img
            style={{ paddingLeft: "20px", paddingBottom: "40px" }}
            src="/images/shopimg/bitmap-copy-3.png"
            alt="bitmap10"
          />
        </a>

        <a>
          <img
            style={{ paddingLeft: "20px", paddingBottom: "40px" }}
            src="/images/shopimg/detail-image.png"
            alt="bitmap10"
          />
        </a>

        <a>
          <img
            style={{ paddingLeft: "20px", paddingBottom: "40px" }}
            src="/images/shopimg/bitmap-copy-4.png"
            alt="bitmap10"
          />
        </a>
      </div>
    );
  } else {
    categoryDetail = (
      <Slider {...settings}>

        <a>
          <img src="/images/shopimg/detail-image.png" alt="detail-image" />
        </a>

        <a>
          <img
            className="product"
            src="/images/shopimg/bitmap-copy-3.png"
            alt="bitmap10"
          />
        </a>

        <a>
          <img
            className="product"
            src="/images/shopimg/bitmap-copy-4.png"
            alt="bitmap10"
          />
        </a>

        <a>
          <img
            className="product"
            src="/images/shopimg/bitmap-copy-7.png"
            alt="bitmap10"
          />
        </a>

        <a>
          <img
            className="product"
            src="/images/shopimg/bitmap-copy-5.png"
            alt="bitmap10"
          />
        </a>

        <a>
          <img
            className="product"
            src="/images/shopimg/bitmap-copy-7.png"
            alt="detail-image"
          />
        </a>

        <a>
          <img
            className="product"
            src="/images/shopimg/bitmap-copy-5.png"
            alt="bitmap10"
          />
        </a>

        <a>
          <img
            className="product"
            src="/images/shopimg/bitmap-copy-3.png"
            alt="bitmap10"
          />
        </a>

        <a>
          <img
            className="product"
            src="/images/shopimg/detail-image.png"
            alt="bitmap10"
          />
        </a>

        <a>
          <img
            className="product"
            src="/images/shopimg/bitmap-copy-4.png"
            alt="bitmap10"
          />
        </a>

      </Slider>
    );
  }

  return (
    <Layout searchProduct={searchProduct}>
      {Object.keys(shop).length === 0 ?
        <ShopDetailLoading />
        : <section className="detail_container">
          <div className="detail_header">
            <div className="header_container">
              <div className="header_left">
                <img src={`${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}${shop.img_url}`} alt="bitmap" onError={(e) => { e.target.onerror = null; e.target.src = "/images/OfficialStore.png" }} />
              </div>
              <div className="header_right">
                <div className="hstore">
                  <div className="hoco">
                    <img src={`${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}${shop.timeline_image}`} alt="bitmap" onError={(e) => { e.target.onerror = null; e.target.src = "/images/OfficialStore.png" }} />
                  </div>
                  <div className="official_store">
                    <span className="official_text">{`${shop.name} Store`}</span>
                    <div className="top_brand">
                      <img src="/images/top-brand.png" alt="top-brand" onError={(e) => { e.target.onerror = null; e.target.src = "/images/OfficialStore.png" }} />
                      <p className="brand_text">Top Brand</p>
                    </div>
                    <div className="feedback">
                      <span className="score">90%</span>
                      <p className="followers_text">{lang.positiveFeedback}</p>
                    </div>
                    <div className="follower">
                      <span className="score">8.9K</span>
                      <p className="followers_text">{lang.followers}</p>
                    </div>
                  </div>
                </div>
                <div className="ad_btn">
                  <div className="ad_follow">
                    <a href="#" onClick={onfollow}>{lang.follow}</a>
                  </div>
                  {/*<div className="ad_store">
                    <Link href="/shopdetail">
                      <a>GO STORE</a>
                    </Link>
      </div>*/}
                </div>
              </div>
            </div>
          </div>
          <div className="detail_nav">
            <div className="nav_container">
              <div className="nav_text">
                {/* <Tabs indicatorColor="primary" value={value} onChange={handleChange} style={{ color: 'white' }} aria-label="simple tabs example">
                <Tab style={{ color: 'black' }} label="HOME" {...a11yProps(0)}></Tab>
                <Tab style={{ color: 'black' }} label="PRODUCT" {...a11yProps(1)}></Tab>
                <Tab style={{ color: 'black' }} label="CONTACTS" {...a11yProps(2)}></Tab>
                <Tab style={{ color: 'black' }} label="COMMENTS" {...a11yProps(3)}></Tab>
                <Tab style={{ color: 'black' }} label="FEEDBACK" {...a11yProps(4)}></Tab>
              </Tabs>
              <TabPanel value={value} index={0}>
              </TabPanel>
              <TabPanel value={value} >
                <ProductDetail></ProductDetail>
              </TabPanel>
              <TabPanel value={value} index={1}>
              </TabPanel>
              <TabPanel value={value} index={0}>
              </TabPanel>
              <TabPanel value={value} index={0}>
              </TabPanel> */}


                <Link href={`/shopdetail/${query.id}/product`}>
                  <span className="home">
                    <a>{lang.home}</a>
                  </span>
                </Link>

                <Link href={`/shopdetail/${query.id}/product`}>
                  <span>
                    <a>{lang.products}</a>
                  </span>
                </Link>
                <Link href={`/shopdetail/${query.id}/contacts`}>
                  <span><a>{lang.contacts}</a></span>
                </Link>
                <Link href={`/shopdetail/${query.id}/comment`}>
                  <span><a>{lang.comments}</a></span>
                </Link>
                <Link href={`/shopdetail/${query.id}/feedback`}>
                  <span>
                    <a>{lang.feedback}</a>
                  </span>
                </Link>

              </div>
              <div className="image">
                <Link href="/productDetail">
                  <a>
                    <img src="/images/shopimg/bitmap14.png" alt="bitmap2" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="top_picks">
            <div className="tp_container">
              <div className="tp_wrapper">
                <p className="top_text"></p>
                {<ProductDetail></ProductDetail>}
              </div>
            </div>
          </div>
          <div className="nothing" style={{height:"50px"}}>

          </div>
          {/* <div className="categories">
            <div className="tp_container">
              <div className="tp_wrapper_two">
                <p className="category_text">Categories #1</p>
                <p style={{ color: '#aa222a', textAlign: 'center', padding: '20px 0px', fontSize: '24px' }}>COMMING SOON</p>
                {categoryDetail}
              </div>
            </div>
          </div> */}
        </section>
      }

      <style jsx>{`

        *{
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html,body{
          background-color: #ffffff;
          font-family: 'Montserrat';
          font-weight: 600;
          width: 100%;
          margin: 0;
          padding: 0;
        }

        ul{
          padding: 0;
          margin: 0;
        }
        ul>li{
          list-style:none;
          display: inline-block;
        }
        a{
          text-decoration: none;
          color: inherit;
          cursor: pointer;
        }

        .detail_container{
          background-color:#ececec;
          width:100%;
          height:auto;

        }



        .header_container{
          max-width:1140px;
          margin:auto;
          display:flex;

          background-color:#ffffff;

        }
        .header_left{
          width:50%;
        }
        .header_left img{
          width:93%;
          height:250px;
        }
        .header_right{
          width:50%;
          display:flex;
          justify-content:center;
          align-items:center;

        }
        .ad_btn{
          padding-left:25px;
          font-weight:600;
          padding-right:25px;
          padding-rihg
          paddn
        }
         .ad_follow{
                width:180px ;
                text-align: center;
                border-radius: 6px;
                border: solid 1px #aa222a;
                padding:14px 0px;
            }
            .ad_follow a{
                color: #aa222a;
            }
            .ad_store{
                text-align: center;
                width: 180px;
                border-radius: 6px;
                background-color: #aa222a;
                padding:14px 0px;
                margin-top: 8px;
            }
            .ad_store a{
                color: #ffffff;
            }
        .hstore{
          display:flex;
        }
        .hoco img{
          width:100%;
          max-width:200px;
          max-height:150px;
          padding-right:26px;
          display:block;
        }
        .official_text{
          font-size:16px;
          font-weight:bold;
          color:#2d2d2d;
        }
        .top_brand{
          display:flex;
          padding:7px 0px;
        }
        .feedback,
        .follower{
          display:flex;
          padding:2px 0px;
        }
        .score{
          font-size:14px;
          color:#2d2d2d;
          font-weight:600;
        }
        .brand_text{
          font-size:14px;
          color:#2d2d2d;
          padding-left:8px;
        }

        .followers_text{
          color:#878787;
          font-size:14px;
          margin-left:5px;
        }

        .header_btns{
          width:100%;
          display:flex;
          flex-direction:column;
          margin-left:32px;
        }
        .follow{
          width:50%;
          border-radius:6px;
          border:1px solid #aa222a;
          padding:14px 0px;
          outline:none;

          background-color:inherit;
          font-size:16px;
          font-weight:600;
          letter-spacing:0.75px;
          text-transform:uppercase;
          text-align:center;
          color:#aa222a;
          margin-bottom:8px;
        }
        .go_store{
          width:50%;
          font-size:16px;
          font-weight:600;
          letter-spacing:0.75px;
          text-align:center;
          color:#ffffff;
          border-radius:6px;
          background-color:#aa222a;
          padding:14px 0px;
          text-transform:uppercase;
          outline:none;
          border:none;
        }
        /* shop_detail nav */
        .detail_nav{

        }
        .nav_container{
          max-width:1140px;
          margin:auto;
          background-color:#ffffff;
          height:48px;
        }
        .nav_text{
          display:flex;
          align-items:center;
          overflow-x:scroll;

        }
        .nav_text::-webkit-scrollbar{
          display:none;
        }
        .nav_text>span{
          font-size:12px;
          font-weight:600;
          letter-spacing:0.65px;
          color:#a3a6ab;

        }

        .nav_text>span{
          padding-left:30px;
          padding-right:30px;
          cursor:pointer;
        }
        .nav_text span:first-of-type{
          border-bottom:2px solid #aa222a;
          color:#aa222a;
        }
        .nav_text span:hover,
        .nav_text span:focus{
          border-bottom:2px solid #aa222a;
          color:#aa222a;
        }
        .nav_text>span{
          padding-top:16px;
          padding-bottom:17px;
        }
        .home{
          padding-left:30px;
        }


        .image img{
          width:100%;
          height:auto;

        }
        .slider img{
          padding-left:20px;
        }

        /* top_picks */
        .top_picks{

          height:auto;

        }
        .tp_container{
          max-width:1140px;
          margin:auto;
          background:#fff;

        }
        .tp_wrapper{
          margin-top:43%;
        }
        .top_text{
          padding-left:19px;
          font-weight:600;
          padding-top:27px;
          padding-bottom:17px;
          font-size:14px;
          color:#2a2a2a;
        }
        .category_text{
          padding-left:19px;
          padding-top:27px;
          padding-bottom:17px;
          font-size:14px;
          font-weight:600;
          color:#2a2a2a;
        }
        .product_group{
          display:grid;
          grid-template-columns:1fr 1fr 1fr 1fr 1fr;
          grid-template-rows:1fr 1fr;
          grid-gap:16px;
          padding-top:12px;
          padding-left:20px;
          padding-bottom:40px;
        }
        .product_group_two{
          display:flex;
          justify-content:space-evenly;
          flex-wrap:wrap;
          margin-top:20px;
          padding-bottom:40px;

        }
        .categories{
          height:auto;
          padding:32px;
        }
        @media(max-width:1216px){
          .tp_container{
            padding-bottom:15px;
          }
        }

        @media(max-width:1200px){
          .header_container{
            display:block;
          }
          .header_left{
            width:90%;
            margin:0 auto
          }
          .header_left img{
            width:100%;
          }
          .header_right{
            width:100%;
            margin-top:20px;
            padding-bottom:20px;
          }
          .categories{
            margin-top:0px;
            height:auto;
          }
          // .tp_wrapper{
          //   margin-top:40%;

          // }

          .tp_wrapper_two{
            padding-bottom:10px;
          }
          .follow{
            padding:16px 39px;
          }
          .go_store{
            padding:18px 31px;
          }
          .top_text{
            padding-bottom:0px;
          }
          .category_text{
            padding-bottom:0px;
          }
        }

        @media(max-width:768px){
          .category_text{
            padding-top:17px;
          }

        }
        @media(max-width:580px){
          .header_right{
            display:block;
          }
          .hstore{
            align-items:center;
            justify-content:center;
            padding-left:10px;
          }
          .ad_btn{
             width: 100%;
             margin: 0 auto;
             display: flex;
             padding-top: 23px;
             font-size: 14px;
             font-weight: 600;
             padding-right:15px;
                }
            .ad_follow{
                 width: 90%;
                 margin-right: 5%;
               }
            .ad_store{
                width: 90%;
                margin-top: 0px;
                }

          .header_btns{
            flex-direction:row;
            width:100%;
            justify-content:center;
            margin-left:0px;
            align-items:center;

            margin-top:20px;
          }

        }
        @media(max-width:360px){
          .brand_text,
          .score,
          .followers_text{
            font-size:12px;
          }
          .top_text,
          .category_text{
            padding-left:11px;
          }
          .hoco img{
            padding-right:22px;
          }


          // .tp_wrapper{
          //   margin-top:40%;

          // }

          .category_text{
            padding-top:0px;
          }
        }

        }


        `}</style>
    </Layout>
  );
};
export default ShopDetail;
