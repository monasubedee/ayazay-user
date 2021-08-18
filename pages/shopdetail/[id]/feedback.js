import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import { getShop } from '../../../store/shops/action';
import { useSelector, useDispatch } from 'react-redux';
import UnderMainTanence from '../../../components/undermaintanence/undermaintanence'


const FeedBack = () => {

    const { query } = useRouter();
    const dispatch = useDispatch();
    const { shop } = useSelector((state) => state.shop);

    useEffect(() => {
        dispatch(getShop(query.id))
    }, []);


    return (
        <div>
            <UnderMainTanence query={query} />
        // </div>
        // <Layout>
        //     <div className="detail_wrapper">
        //         <section className="detail_container">
        //             <div className="detail_header">
        //                 <div className="header_container">
        //                     <div className="header_left">
        //                         <img src={`${IMAGE_NET}${shop.img_url}`} alt="bitmap" />
        //                     </div>
        //                     <div className="header_right">
        //                         <div className="hstore">
        //                             <div className="hoco">
        //                                 <img src={`${IMAGE_NET}${shop.img_url}`} alt="bitmap" />
        //                             </div>
        //                             <div className="official_store">
        //                                 <span className="official_text">{`${shop.name} Store`}</span>
        //                                 <div className="top_brand">
        //                                     <img src="/images/top-brand.png" alt="top-brand" />
        //                                     <p className="brand_text">Top Brand</p>
        //                                 </div>
        //                                 <div className="feedback">
        //                                     <span className="score">90%</span>
        //                                     <p className="followers_text">Positive Feedback</p>
        //                                 </div>
        //                                 <div className="follower">
        //                                     <span className="score">8.9K</span>
        //                                     <p className="followers_text">Followers</p>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                         <div className="ad_btn">
        //                             <div className="ad_follow">
        //                                 <a href="#">FOLLOW</a>
        //                             </div>
        //                             {/*
        //                             <div className="ad_store">
        //                                 <Link href="/shopdetail">
        //                                     <a>GO STORE</a>
        //                                 </Link>
        //                             </div>*/}
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className="detail_nav">
        //                 <div className="nav_container">
        //                     <div className="nav_text">
        //                         <Link href={`/shopdetail/${query.id}/product`}>
        //                             <span className="home">
        //                                 <a>HOME</a>
        //                             </span>
        //                         </Link>

        //                         <Link href={`/shopdetail/${query.id}/product`}>
        //                             <span>
        //                                 <a>PRODUCTS</a>
        //                             </span>
        //                         </Link>
        //                         <Link href={`/shopdetail/${query.id}/contacts`}>
        //                             <span><a>CONTACTS</a></span>
        //                         </Link>
        //                         <Link href={`/shopdetail/${query.id}/comment`}>
        //                             <span><a>COMMENTS</a></span>
        //                         </Link>
        //                         <Link href={`/shopdetail/${query.id}/feedback`}>
        //                             <span className="active">
        //                                 <a>FEEDBACK</a>
        //                             </span>
        //                         </Link>

        //                     </div>

        //                 </div>
        //             </div>

        //             <div className="seller_ratings_container">
        //                 <div className="seller_ratings_wrapper">
        //                     <div className="avg_ratings">
        //                         <div className="avg_ratings_left">
        //                             <div className="avg_ratings_wrapper">
        //                                 <p className="rating_text">
        //                                     Average Seller Ratings
        //                             </p>
        //                                 <span className="percentage">
        //                                     10%
        //                             </span>
        //                                 <p className="positive_ratings">
        //                                     Positive Ratings
        //                             </p>
        //                                 <div className="pos_review">
        //                                     <span className="positive">Positive</span>
        //                                     <div className="bar"></div>
        //                                     <span className="number">0</span>
        //                                 </div>
        //                                 <div className="pos_review">
        //                                     <span className="neutral">Neutral</span>
        //                                     <div className="bar"></div>
        //                                     <span className="number">0</span>
        //                                 </div>
        //                                 <div className="pos_review">
        //                                     <span className="negative">Negative</span>
        //                                     <div className="bar"></div>
        //                                     <span className="number">0</span>
        //                                 </div>
        //                                 <p className="cus_review">Based on <span className="zero">0</span> Customer Reviews</p>


        //                             </div>
        //                         </div>
        //                         <div className="ship_time">
        //                             <div className="ship_time_wrapper">
        //                                 <div className="ship_time">
        //                                     <p className="positive_ratings">
        //                                         Shipped on Time
        //                             </p>
        //                                     <span className="percentage">
        //                                         37%
        //                             </span>
        //                                 </div>
        //                                 <div className="cancellation_user">
        //                                     <p className="positive_ratings">
        //                                         Cancellation by User
        //                                 </p>
        //                                     <span className="percentage">
        //                                         43%
        //                                 </span>
        //                                 </div>
        //                                 <div className="chat">
        //                                     <p className="positive_ratings">
        //                                         Chat
        //                                 </p>
        //                                     <div className="contact">
        //                                         CONTACT NOW
        //                                 </div>

        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>


        //                     <div className="ratings_review_wrapper">
        //                         <div className="rating_text">
        //                             Seller Rating & Reviews
        //                     </div>
        //                         <div className="review_table">
        //                             <div className="review_header">
        //                                 <div className="header_name">
        //                                     Customer
        //                                 </div>
        //                                 <div className="header_ratings">
        //                                     Ratings
        //                                 </div>
        //                                 <div className="header_feedback">
        //                                     Feedback
        //                                 </div>
        //                             </div>
        //                             <div className="review_body">
        //                                 <div className="cus_name">
        //                                     E****R
        //                             </div>
        //                                 <div className="cus_ratings">
        //                                     <div className="stars">
        //                                         <i className="fa fa-star"></i>
        //                                         <i className="fa fa-star"></i>
        //                                         <i className="fa fa-star"></i>
        //                                         <i className="fa fa-star"></i>
        //                                         <i className="fa fa-star special"></i>
        //                                     </div>
        //                                 </div>
        //                                 <div className="cus_feedback">
        //                                     Lorem ipsum dolor sit amet, consectetur
        //                             </div>
        //                                 <div className="cus_date">
        //                                     SEP 20,2020
        //                             </div>
        //                             </div>

        //                             <div className="review_body">
        //                                 <div className="cus_name">
        //                                     E****R
        //                             </div>
        //                                 <div className="cus_ratings">
        //                                     <div className="stars">
        //                                         <i className="fa fa-star"></i>
        //                                         <i className="fa fa-star"></i>
        //                                         <i className="fa fa-star"></i>
        //                                         <i className="fa fa-star"></i>
        //                                         <i className="fa fa-star special"></i>
        //                                     </div>
        //                                 </div>
        //                                 <div className="cus_feedback">
        //                                     Lorem ipsum dolor sit amet, consectetur
        //                             </div>
        //                                 <div className="cus_date">
        //                                     SEP 20,2020
        //                             </div>
        //                             </div>

        //                             <div className="review_body">
        //                                 <div className="cus_name">
        //                                     E****R
        //                             </div>
        //                                 <div className="cus_ratings">
        //                                     <div className="stars">
        //                                         <i className="fa fa-star"></i>
        //                                         <i className="fa fa-star"></i>
        //                                         <i className="fa fa-star"></i>
        //                                         <i className="fa fa-star"></i>
        //                                         <i className="fa fa-star special"></i>
        //                                     </div>
        //                                 </div>
        //                                 <div className="cus_feedback">
        //                                     Lorem ipsum dolor sit amet, consectetur
        //                             </div>
        //                                 <div className="cus_date">
        //                                     SEP 20,2020
        //                             </div>
        //                             </div>

        //                             <div className="review_body">
        //                                 <div className="cus_name">
        //                                     E****R
        //                             </div>
        //                                 <div className="cus_ratings">
        //                                     <div className="stars">
        //                                         <i className="fa fa-star"></i>
        //                                         <i className="fa fa-star"></i>
        //                                         <i className="fa fa-star"></i>
        //                                         <i className="fa fa-star"></i>
        //                                         <i className="fa fa-star special"></i>
        //                                     </div>
        //                                 </div>
        //                                 <div className="cus_feedback">
        //                                     Lorem ipsum dolor sit amet, consectetur
        //                             </div>
        //                                 <div className="cus_date">
        //                                     SEP 20,2020
        //                             </div>
        //                             </div>
        //                         </div>

        //                     </div>


        //                 </div>

        //             </div>
        //             <section className="product_rating_wrapper">
        //                 <div className="product_rating_container">

        //                     <div className="product_rating">

        //                         <div className="ratings_review_wrapper">
        //                             <div className="rating_text">
        //                                 Product Ratings & Reviews
        //                     </div>
        //                             <div className="review_table">
        //                                 <div className="review_header_one">
        //                                     <div className="header_name">
        //                                         Customer
        //                                 </div>
        //                                     <div className="header_transition">
        //                                         Transition Details
        //                                 </div>
        //                                     <div className="product_ratings">
        //                                         Ratings
        //                                 </div>
        //                                     <div className="header_feedback">
        //                                         Feedback
        //                                 </div>
        //                                 </div>
        //                                 <div className="review_body">
        //                                     <div className="cus_name">
        //                                         E****R
        //                             </div>
        //                                     <div className="cus_transition">
        //                                         <p className="transition_detail">
        //                                             Lorem ipsum dolor sit amet, consectetur
        //                               </p>
        //                                         <span>1 piece</span>
        //                                     </div>
        //                                     <div className="cus_product_ratings">
        //                                         <div className="stars_one">
        //                                             <i className="fa fa-star"></i>
        //                                             <i className="fa fa-star"></i>
        //                                             <i className="fa fa-star"></i>
        //                                             <i className="fa fa-star"></i>
        //                                             <i className="fa fa-star special"></i>
        //                                         </div>
        //                                     </div>
        //                                     <div className="cus_feedback_one">
        //                                         Lorem ipsum dolor sit amet, consectetur
        //                             </div>
        //                                     <div className="cus_date_one">
        //                                         SEP 20,2020
        //                             </div>
        //                                 </div>

        //                                 <div className="review_body">
        //                                     <div className="cus_name">
        //                                         E****R
        //                             </div>
        //                                     <div className="cus_transition">
        //                                         <p className="transition_detail">
        //                                             Lorem ipsum dolor sit amet, consectetur
        //                               </p>
        //                                         <span>1 piece</span>
        //                                     </div>
        //                                     <div className="cus_product_ratings">
        //                                         <div className="stars_one">
        //                                             <i className="fa fa-star"></i>
        //                                             <i className="fa fa-star"></i>
        //                                             <i className="fa fa-star"></i>
        //                                             <i className="fa fa-star"></i>
        //                                             <i className="fa fa-star special"></i>
        //                                         </div>
        //                                     </div>
        //                                     <div className="cus_feedback_one">
        //                                         Lorem ipsum dolor sit amet, consectetur
        //                             </div>
        //                                     <div className="cus_date_one">
        //                                         SEP 20,2020
        //                             </div>
        //                                 </div>

        //                                 <div className="review_body">
        //                                     <div className="cus_name">
        //                                         E****R
        //                             </div>
        //                                     <div className="cus_transition">
        //                                         <p className="transition_detail">
        //                                             Lorem ipsum dolor sit amet, consectetur
        //                               </p>
        //                                         <span>1 piece</span>
        //                                     </div>
        //                                     <div className="cus_product_ratings">
        //                                         <div className="stars_one">
        //                                             <i className="fa fa-star"></i>
        //                                             <i className="fa fa-star"></i>
        //                                             <i className="fa fa-star"></i>
        //                                             <i className="fa fa-star"></i>
        //                                             <i className="fa fa-star special"></i>
        //                                         </div>
        //                                     </div>
        //                                     <div className="cus_feedback_one">
        //                                         Lorem ipsum dolor sit amet, consectetur
        //                             </div>
        //                                     <div className="cus_date_one">
        //                                         SEP 20,2020
        //                             </div>
        //                                 </div>

        //                             </div>

        //                         </div>
        //                     </div>
        //                 </div>
        //             </section>

        //             <div className="nothing">

        //             </div>

        //         </section>
        //     </div>

        //     {/* <div className="space_container">
        //       <div className="space_wrapper">
        //         <div className="space">

        //         </div>
        //       </div>
        //     </div> */}
        //     <style jsx>
        //         {
        //             `
        //             @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800&display=swap');

        //             *{
        //               margin: 0;
        //               padding: 0;
        //               box-sizing: border-box;
        //             }

        //             html,body{
        //               background-color: #ffffff;
        //               font-family: 'Montserrat';
        //               font-weight: 600;
        //               width: 100%;
        //               margin: 0;
        //               padding: 0;
        //             }

        //             ul{
        //               padding: 0;
        //               margin: 0;
        //             }
        //             ul>li{
        //               list-style:none;
        //               display: inline-block;
        //             }
        //             a{
        //               text-decoration: none;
        //               color: inherit;
        //               cursor: pointer;
        //             }

        //             .detail_container{
        //               background-color:#ececec;
        //               width:100%;
        //               height:156vh;

        //             }


        //             .header_container{
        //               max-width:1140px;
        //               margin:auto;
        //               display:flex;

        //               background-color:#ffffff;

        //             }
        //             .header_left{
        //               width:50%;
        //             }
        //             .header_left img{
        //               width:93%;
        //               height:250px;
        //             }
        //             .header_right{
        //               width:50%;
        //               display:flex;
        //               justify-content:center;
        //               align-items:center;

        //             }
        //             .ad_btn{
        //               padding-left:25px;
        //               font-weight:600;
        //               padding-right:25px;
        //             }
        //              .ad_follow{
        //                     width:180px ;
        //                     text-align: center;
        //                     border-radius: 6px;
        //                     border: solid 1px #aa222a;
        //                     padding:14px 0px;
        //                 }
        //                 .ad_follow a{
        //                     color: #aa222a;
        //                 }
        //                 .ad_store{
        //                     text-align: center;
        //                     width: 180px;
        //                     border-radius: 6px;
        //                     background-color: #aa222a;
        //                     padding:14px 0px;
        //                     margin-top: 8px;
        //                 }
        //                 .ad_store a{
        //                     color: #ffffff;
        //                 }
        //             .hstore{
        //               display:flex;
        //             }
        //             .hoco img{
        //               width:100%;
        //               padding-right:26px;
        //               display:block;
        //             }
        //             .official_text{
        //               font-size:16px;
        //               font-weight:bold;
        //               color:#2d2d2d;
        //             }
        //             .top_brand{
        //               display:flex;
        //               padding:7px 0px;
        //             }
        //             .feedback,
        //             .follower{
        //               display:flex;
        //               padding:2px 0px;
        //             }
        //             .score{
        //               font-size:14px;
        //               color:#2d2d2d;
        //               font-weight:600;
        //             }
        //             .brand_text{
        //               font-size:14px;
        //               color:#2d2d2d;
        //               padding-left:8px;
        //             }
        //             .nothing{
        //                 height:100px;
        //             }
        //             .square{
        //               width:21px;
        //               height:21px;
        //               background-color:#2d2d2d;
        //               margin-right:10px;
        //             }
        //             .followers_text{
        //               color:#878787;
        //               font-size:14px;
        //               margin-left:5px;
        //             }

        //             .header_btns{
        //               width:100%;
        //               display:flex;
        //               flex-direction:column;
        //               margin-left:32px;
        //             }
        //             .follow{
        //               width:50%;
        //               border-radius:6px;
        //               border:1px solid #aa222a;
        //               padding:14px 0px;
        //               outline:none;

        //               background-color:inherit;
        //               font-size:16px;
        //               font-weight:600;
        //               letter-spacing:0.75px;
        //               text-transform:uppercase;
        //               text-align:center;
        //               color:#aa222a;
        //               margin-bottom:8px;
        //             }
        //             .go_store{
        //               width:50%;
        //               font-size:16px;
        //               font-weight:600;
        //               letter-spacing:0.75px;
        //               text-align:center;
        //               color:#ffffff;
        //               border-radius:6px;
        //               background-color:#aa222a;
        //               padding:14px 0px;
        //               text-transform:uppercase;
        //               outline:none;
        //               border:none;
        //             }
        //             /* shop_detail nav */
        //             .detail_nav{

        //             }
        //             .nav_container{
        //               max-width:1140px;
        //               margin:auto;
        //               background-color:#ffffff;
        //               height:48px;
        //             }
        //             .nav_text{
        //               display:flex;
        //               align-items:center;
        //               overflow-x:scroll;

        //             }
        //             .nav_text::-webkit-scrollbar{
        //               display:none;
        //             }
        //             .nav_text>span{
        //               font-size:12px;
        //               font-weight:600;
        //               letter-spacing:0.65px;
        //               color:#a3a6ab;

        //             }
        //             .active{
        //                 border-bottom:2px solid #aa222a;
        //               }
        //               .active>a{
        //                 color:#aa222a;
        //               }

        //             .nav_text>span{
        //               padding-left:30px;
        //               padding-right:30px;
        //               cursor:pointer;
        //             }

        //             .nav_text span:hover,
        //             .nav_text span:focus{
        //               border-bottom:2px solid #aa222a;
        //               color:#aa222a;
        //             }
        //             .nav_text>span{
        //               padding-top:16px;
        //               padding-bottom:17px;
        //             }
        //             .home{
        //               padding-left:30px;
        //             }

        //             /* Ratings */
        //             .seller_ratings_container{
        //                 max-width:1140px;
        //                 margin:0 auto;
        //                 background-color:#fff;
        //             }
        //             .seller_ratings_wrapper{
        //                 padding-top:48px;

        //                 border-top:1px solid #f1f1f1;

        //             }
        //             .positive_ratings{
        //                 padding-top:4px;

        //             }

        //             .avg_ratings{
        //                 display:flex;
        //                 border-bottom:1px solid #f1f1f1;
        //                 padding-bottom:38px;
        //             }
        //             .avg_ratings_wrapper{
        //                 padding-left:74px;
        //             }
        //             .avg_ratings_left{
        //                 flex:50%;
        //                 border-right:1px solid #dce0e7;
        //             }
        //             .ship_time{
        //                 flex:50%;
        //             }
        //             .rating_text{
        //                 font-size:14px;
        //                 font-weight:bold;
        //                 color:#606266;
        //                 padding-bottom:8px;
        //             }
        //             .zero{
        //                 color:#36383c;
        //                 font-weight:600;
        //             }
        //             .percentage{
        //                 font-size:32px;
        //                 font-weight:800;
        //                 color:#aa222a;
        //             }
        //             .positive_ratings{
        //                 font-size:14px;
        //                 font-weight:500;
        //                 color:#606266;
        //             }
        //             .pos_review{
        //                 display:flex;
        //                 align-items:center;
        //                 color:#606266;
        //                 font-size:14px;

        //             }
        //             .positive{
        //                 padding-right:30px;
        //             }
        //             .neutral{
        //                 padding-right:34px;
        //             }
        //             .negative{
        //                 padding-right:22px;
        //             }
        //             .pos_review .bar{
        //                 width:40%;
        //                 height:12px;
        //                 background-color:#dce0e7;

        //             }
        //             .pos_review{
        //                 padding-top:20px;
        //             }
        //             .cus_review{
        //                 padding-top:24px;
        //                 font-size:14px;
        //                 color:#606266;

        //             }

        //             .pos_review .number{
        //                 padding-left:10px;
        //             }
        //             .ship_time_wrapper{
        //                 padding-left:158px;
        //             }
        //             .chat{
        //                 padding-top:24px;
        //             }
        //             .cancellation_user{
        //                 padding-top:22px;
        //             }
        //             .chat p{
        //                 padding-bottom:4px;
        //             }
        //             .contact{
        //                 border:1px solid #aa222a;
        //                 width:39%;
        //                 border-radius:3px;
        //                 padding:8px 24px;
        //                 color:#aa222a;
        //                 letter-spacing:0.45px;
        //                 font-size:13px;
        //                 font-weight:600;

        //             }

        //             .ratings_review_wrapper{
        //                 padding-left:75px;
        //                 padding-top:32px;
        //             }
        //             .review_header{
        //                 display:flex;
        //                 padding-bottom:8px;
        //                 border-bottom:1px solid #f1f1f1;
        //                 font-size:14px;
        //                 font-weight:500;
        //                 color:#606266;
        //             }
        //             .review_header_one{
        //                 display:flex;
        //                 padding-bottom:8px;
        //                 border-bottom:1px solid #f1f1f1;
        //                 font-size:14px;
        //                 font-weight:500;
        //                 color:#606266;
        //             }
        //             .header_ratings{
        //                 padding-left:127px;
        //             }
        //             .header_feedback{
        //                 padding-left:93px;
        //             }
        //             .review_body{
        //                 display:flex;
        //                 padding-bottom:47px;
        //                 padding-top:22px;
        //                 border-bottom:1px solid #f1f1f1;
        //                 font-size:12px;
        //                 font-weight:500;
        //                 color:#606266;

        //             }
        //             .stars{
        //                 display:flex;
        //             }
        //             .stars_one{
        //                 display:flex;
        //             }
        //             .fa-star{
        //                 color:#ed992e;
        //             }
        //             .special{
        //                 color:#d8d8d8
        //             }

        //             .cus_name{

        //             }
        //             .cus_ratings{
        //                 padding-left:157px;
        //             }
        //             .cus_feedback{
        //                 padding-left:84px;
        //             }
        //             .cus_date{
        //                 padding-left:80px;
        //             }
        //             .cus_feedback_one{
        //                 padding-left:84px;
        //             }
        //             .cus_date_one{
        //                 padding-left:80px;
        //             }
        //             .product_rating{
        //                max-width:1140px;
        //                margin:0 auto;
        //                background-color:#fff;
        //                margin-top:16px;
        //             }
        //             .header_transition{
        //                 padding-left:43px;
        //             }
        //             .transition_detail{
        //                 color:#aa222a;
        //                 padding-bottom:12px;
        //             }
        //             .product_ratings{
        //                 padding-left:194px;
        //             }
        //             .product_rating_container{

        //             }
        //             .cus_transition{
        //                 padding-left:77px;
        //             }
        //             .cus_product_ratings{
        //                 padding-left:69px;
        //             }
        //             .space_container{
        //                 margin:0 auto;
        //                 max-width:1140px;


        //             }
        //             .space_wrapper>*{
        //                 margin-top:50px;
        //                 backgroud-color:#ececec;
        //             }

        //             @media(max-width:1216px){
        //                 .tp_container{
        //                   padding-bottom:15px;
        //                 }
        //               }

        //               @media(max-width:1200px){
        //                 .header_container{
        //                   display:block;
        //                 }
        //                 .header_left{
        //                   width:100%;
        //                 }
        //                 .header_left img{
        //                   width:100%;
        //                 }
        //                 .header_right{
        //                   width:100%;
        //                   margin-top:20px;
        //                   padding-bottom:20px;
        //                 }
        //                 .categories{
        //                   margin-top:0px;
        //                   height:auto;
        //                 }
        //                 // .tp_wrapper{
        //                 //   margin-top:40%;

        //                 // }

        //                 .tp_wrapper_two{
        //                   padding-bottom:10px;
        //                 }
        //                 .follow{
        //                   padding:16px 39px;
        //                 }
        //                 .go_store{
        //                   padding:18px 31px;
        //                 }
        //                 .top_text{
        //                   padding-bottom:0px;
        //                 }
        //                 .category_text{
        //                   padding-bottom:0px;
        //                 }
        //               }

        //               @media(max-width:768px){
        //                 .category_text{
        //                   padding-top:17px;
        //                 }

        //               }
        //               @media(max-width:580px){
        //                 .header_right{
        //                   display:block;
        //                 }
        //                 .hstore{
        //                   align-items:center;
        //                   justify-content:center;
        //                   padding-left:10px;
        //                 }
        //                 .ad_btn{
        //                    width: 100%;
        //                    margin: 0 auto;
        //                    display: flex;
        //                    padding-top: 23px;
        //                    font-size: 14px;
        //                    font-weight: 600;
        //                    padding-right:15px;
        //                       }
        //                   .ad_follow{
        //                        width: 90%;
        //                        margin-right: 5%;
        //                      }
        //                   .ad_store{
        //                       width: 90%;
        //                       margin-top: 0px;
        //                       }

        //                 .header_btns{
        //                   flex-direction:row;
        //                   width:100%;
        //                   justify-content:center;
        //                   margin-left:0px;
        //                   align-items:center;

        //                   margin-top:20px;
        //                 }
        //                 .avg_ratings{
        //                     flex-direction:column;
        //                 }
        //                 .ship_time_wrapper{
        //                     padding-left:74px;
        //                 }
        //                 .avg_ratings_left{
        //                     border-right:0px;
        //                     border-bottom:1px solid #dce0e7;
        //                 }
        //                 .cus_review{
        //                     padding-bottom:32px;
        //                 }
        //                 .ship_time{
        //                     padding-top:15px;
        //                 }
        //                 .seller_ratings_container{
        //                     margin:20px;
        //                     margin-left:16px;
        //                     margin-right:16px;
        //                 }
        //                 .contact{
        //                     width:40%;
        //                 }
        //                 .review_body{
        //                     flex-direction:column;
        //                 }
        //                 .cus_feedback{
        //                     padding-left:0px;
        //                     padding-top:16px;
        //                 }
        //                 .stars{
        //                     margin-top:-10px;
        //                     padding-left:36px;

        //                 }
        //                 .stars_one{
        //                     margin-left:-6em;
        //                     margin-top:-20px;

        //                 }
        //                 .cus_feedback_one{
        //                     padding-top:14px;
        //                     padding-left:78px;
        //                 }
        //                 .cus_date_one{
        //                     padding-left:78px;
        //                 }
        //                 .header_feedback{
        //                     display:none;
        //                 }
        //                 .cus_date{
        //                     padding-left:0px;
        //                     padding-top:8px;
        //                 }
        //                 .review_body{
        //                     padding-bottom:20px;
        //                 }
        //                 .nothing{
        //                     height:20px;
        //                 }
        //                 .cus_transition{
        //                     margin-top:-15px;
        //                 }
        //                 .review_header_one{
        //                     display:none;
        //                 }
        //                 .pos_review .bar{
        //                     width:50%;
        //                 }
        //                 .product_rating_container{
        //                     margin-left:16px;
        //                     margin-right:16px;
        //                 }





        //               }
        //               @media(max-width:478px){
        //                   .ship_time_wrapper,
        //                   .ratings_review_wrapper,
        //                   .avg_ratings_wrapper{
        //                       padding-left:20px;
        //                   }
        //                   .header_ratings{
        //                     padding-left:100px;
        //                 }
        //                   .stars{
        //                       padding-left:0px;
        //                   }
        //                   .contact{
        //                       width:60%;
        //                       display:flex;
        //                       justify-content:center;
        //                       align-items:center;
        //                   }

        //               }
        //               @media(max-width:360px){
        //                 .brand_text,
        //                 .score,
        //                 .followers_text{
        //                   font-size:12px;
        //                 }
        //                 .top_text,
        //                 .category_text{
        //                   padding-left:11px;
        //                 }
        //                 .hoco img{
        //                   padding-right:22px;
        //                 }
        //                 .contact{
        //                     width:75%;
        //                 }


        //                 // .tp_wrapper{
        //                 //   margin-top:40%;

        //                 // }

        //                 .category_text{
        //                   padding-top:0px;
        //                 }

        //               }


        //               }

        //             `
        //         }

        //     </style>
        // </Layout>
    )
}

export default FeedBack;