import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';
import { getShop } from "../../../store/shops/action";
import { getSearchProduct } from '../../../store/product/action';
import { LangContext } from '../../../constants/langcontext'

const Contacts = () => {

    const dispatch = useDispatch();
    const { shop } = useSelector((state) => state.shop);
    const [shopInfo, setShopInfo] = useState({});
    const [value, setValue] = React.useState(0);
    const { lang } = useContext(LangContext);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    useEffect(() => {
        dispatch(getShop(query.id));
    }, []);

    const searchProduct = (search_value) => {
        dispatch(getSearchProduct(search_value));

    }

    useEffect(() => {

        if (shop !== undefined) {
            setShopInfo(shop);
        }

    }, [shop])

    const { query } = useRouter();

    console.log("ShopINFO ", shopInfo);


    return (

        <Layout searchProduct={searchProduct}>
            <section className="detail_container">
                <div className="detail_header">
                    <div className="header_container">
                        <div className="header_left">
                            <img src={`${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}${shopInfo.img_url}`} alt="bitmap" />
                        </div>
                        <div className="header_right">
                            <div className="hstore">
                                <div className="hoco">
                                    <img src={`${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}${shopInfo.timeline_image}`} alt="bitmap" />
                                </div>
                                <div className="official_store">
                                    <span className="official_text">{`${shop.name} Store`}</span>
                                    <div className="top_brand">
                                        <img src="/images/top-brand.png" alt="top-brand" />
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
                                    <a href="#">{lang.follow}</a>
                                </div>
                                {/* <div className="ad_store">
                                        <Link href="/shopdetail">
                                            <a>GO STORE</a>
                                        </Link>
                                    </div>*/}
                            </div >
                        </div >
                    </div >
                </div >
                <div className="detail_nav">
                    <div className="nav_container">
                        <div className="nav_text">
                            <Link href={`/shopdetail/${query.id}/product`}>
                                <span className='navbar_text'>
                                    <a>{lang.home}</a>
                                </span>
                            </Link>

                            <Link href={`/shopdetail/${query.id}/product`}>
                                <span className="navbar_text">
                                    <a>{lang.products}</a>
                                </span>
                            </Link>
                            <Link href={`/shopdetail/${query.id}/contacts`}>
                                <span className="navbar_text active"><a>{lang.contacts}</a></span>
                            </Link>
                            <Link href={`/shopdetail/${query.id}/comment`}>
                                <span className="navbar_text"><a>{lang.comments}</a></span>
                            </Link>
                            <Link href={`/shopdetail/${query.id}/feedback`}>
                                <span className="navbar_text">
                                    <a>{lang.feedback}</a>
                                </span>
                            </Link>

                        </div>

                    </div>
                </div>
                <div className="container">
                    <div className="company_profile">
                        <div className="company_wrapper">
                            <div className="profile_info">
                                <div className="profile_wrapper">
                                    <div className="profile_image">
                                        <img src={`${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}${shopInfo.img_url}`} alt="profile" />
                                    </div>
                                    <div className="profile_name">
                                        <span>{shopInfo.name}</span>
                                    </div>
                                    <div className="contact_now">
                                        <span>{shopInfo.contact_phno}</span>
                                    </div>
                                    {/* <div className="profile_position">
                                        <span>Director / CEO / General Manager / Manager</span>
                                    </div> */}
                                    {/* <div className="contact_now">
                                        <button className="contact_btn">CONTACT NOW</button>
                                    </div> */}
                                </div>
                            </div>


                            <div className="company_info">
                                <span className="info">{lang.shopInformation}</span>
                                <div className="company_info_wrapper_two">

                                    <div className="company_info_two">
                                        {/* <div className="company__detail_wrapper">
                                            <div className="title_wrapper">
                                                <div className="name_one">
                                                    <span className="shop_name">{lang.name}:</span>
                                                    <span className="details">{shopInfo.name}</span>

                                                </div>
                                                <div className="name_one">
                                                    <span className="email">{lang.rmail}:</span>
                                                    <span className="details">{shopInfo.email}</span>
                                                </div>
                                                <div className="name_one">
                                                    <span className="ph_number">PhoneNumber:</span>
                                                    <span className="details">{shopInfo.contact_phno}</span>
                                                </div>
                                            </div>
                                           
                                        </div> */}
                                        <div className='company__detail_wrapper'>
                                            <span className="title">{lang.name}</span>
                                            <span className="value">{shopInfo.name}</span>
                                            <span className="title">{lang.rmail}:</span>
                                            <span className="value">{shopInfo.email}</span>
                                            <span className="title">{lang.phone}:</span>
                                            <span className="value">{shopInfo.contact_phno}</span>
                                            <span className="title">{lang.address}</span>
                                            <span className="value">{shopInfo.address}</span>
                                            <span className="title">{lang.country}:</span>
                                            <span className="value">Myanmar</span>
                                            <span className="title">{lang.city}:</span>
                                            <span className="value">Yangon</span>

                                        </div>
                                        {/* <div className="others_wrapper_two">
                                            <div className="name_one">
                                                <span>{lang.address}:</span>
                                                <span className="details">{shopInfo.address}</span>
                                            </div>
                                            <div className="name_one">
                                                <span className="country_region">{lang.country}:</span>
                                                <span className="details">Myanmar</span>
                                            </div>
                                            <div className="name_one">
                                                <span className="city">{lang.city}:</span>
                                                <span className="details">Yangon</span>
                                            </div>
                                        </div> */}


                                    </div>

                                </div>
                                <div className="buttons">
                                    <a className="contact" href="">{lang.contact}</a>
                                    <a className="start_order" href={`/shopdetail/${query.id}/product`}>
                                        {lang.startOrder}
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="contact_information">
                        <div className="contact_wrapper">
                            <div className="info_text">
                                <span>{lang.contactInformation}</span>
                            </div>

                            <div className="company_info_wrapper">

                                {/* <div className="company_info_two">
                                    <div className="name">
                                        <span className="sh_name">{lang.shopName}:</span>
                                        <span className="text">{shopInfo.name}</span>
                                    </div>
                                    <div className="name">
                                        <span className="address">{lang.address}:</span>
                                        <span className="text">{shopInfo.address}</span>
                                    </div>
                                    <div className="name">
                                        <span className="website">{lang.website}:</span>
                                        <span className="text">{shopInfo.website_url === "" ? '-' : shopInfo.website_url}</span>
                                    </div>
                                    <div className="name">
                                        <span className="call_center">{lang.callCenter}:</span>
                                        <span className="text">{shopInfo.contact_phno}</span>
                                    </div>


                                </div> */}
                                <div className="company_information_two">
                                    <span className="info_title">{lang.shopName}:</span>
                                    <span className="text">{shopInfo.name}</span>
                                    <span className="info_title">{lang.address}:</span>
                                    <span className="text">{shopInfo.address}</span>
                                    <span className="info_title">{lang.website}:</span>
                                    <span className="text">{shopInfo.website_url === "" ? '-' : shopInfo.website_url}</span>
                                    <span className="info_title">{lang.callCenter}:</span>
                                    <span className="text">{shopInfo.contact_phno}</span>
                                </div>

                            </div>


                        </div>
                    </div>

                </div>

                <div className="nothing">

                </div>



            </section >

            <style jsx>
                {
                    `
                        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800&display=swap');

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
            }
            .nothing{
                height:50px;
            }

            .header_container{
              max-width:1140px;
              margin:auto;
              display:flex;

              background-color:#ffffff;

            }
            .block{
                display:none;
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
            
            
            .hoco img {
            width:100%;
            max-width:200px;
            max-height:150px;
            padding-right:26px;
            display:block;
            height:100%;
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
            .right_side_detail{
                padding-left:25px;
            }
            .square{
              width:21px;
              height:21px;
              background-color:#2d2d2d;
              margin-right:10px;
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
            
            .profile_image img{
                
                width:200px;
                height:200px;
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
            // .nav_text{
            //     display:block;
            //     overflow-x:scroll;
            //     padding-bottom:7px;
            // }
            .nav_text::-webkit-scrollbar{
              display:none;
            }
            // .nav_text>span{
            //   font-size:12px;
            //   font-weight:600;
            //   letter-spacing:0.65px;
            //   color:#a3a6ab;
            //   padding-left:30px;
            //   padding-right:30px;
            //   cursor:pointer;
            //   padding-top:18px;
            //   padding-bottom:13px;

            // }
            .navbar_text{
                font-size:12px;
                font-weight:600;
                letter-spacing:0.65px;
                color:#a3a6ab;
                padding-left:30px;
                padding-right:30px;
                cursor:pointer;
                padding-top:18px;
                padding-bottom:13px; 
            }

            .active{
                border-bottom:2px solid #aa222a;
              }
              .active>a{
                color:#aa222a;
              }

            .nav_text span:hover,
            .nav_text span:focus{
              border-bottom:2px solid #aa222a;
              color:#aa222a;
            }
            
            .home{
              padding-left:30px;
            }
            /* Company Information */

            .container{
                max-width:1140px;
                margin:0 auto;
                margin-top:20px;

            }
            .company_wrapper{
                display:flex;
            }
            .profile_info{
                background-color:#fff;

            }
            .details{
                padding-left:25px;
            }
        //    .company__detail_wrapper{
        //        display:flex;
        //    }
            
            .company__detail_wrapper{
                display:grid;
                grid-template-columns:148px 154px;
                grid-template-rows:1fr 1fr 1fr 1fr;
            }
            .title{
                font-size:14px;
                color:#6d727a;
                padding-bottom:20px;
            }
            .value{
                font-size:14px;
                color:#2d2d2d;
                padding-bottom:20px;
            }

            .profile_wrapper{
                display:flex;
                flex-direction:column;
                justify-content:center;
                align-items:center;
                padding:50px 62px;
                width:365px;
                height:auto;


            }
            .profile_name{
                padding-top:16px;
            }

            .profile_name span{
                font-size:20px;
                font-weight:bold;
                color:#272b35;
                text-align:center;

            }
            .block,
            .details{
                color:#2d2d2d;
                font-size:14px;
                padding-top:4px;
            }
            .profile_position{
                text-align:center;
                padding-top:8px;
            }
            .profile_position span{
                font-size:14px;
                color:#272b35;

            }
            .detail{
                width:100%;
                padding:38px 100px;
                background-color:#fff;
                border-radius:4px;
                border:1px solid #e3e3e3;
                display:flex;
                justify-content:center;
                align-items:center;
                color:#aa222a;
                letter-spacing:0.5px;
                font-size:14px;
                font-weight:600;
                text-transform:uppercase;
            }
            .contact_now{
                padding-top:36px;
            }
            .contact_now button{
                width:100%;
                padding:8px 23px;
                border:1px solid #aa222a;
                border-radius:3px;
                color:#aa222a;
                font-weight:600;
                letter-spacing:0.45px;
                font-size:13px;
                background-color:transparent;
            }

            .company_info{
                background-color:#fff;
                margin-left:20px;
                padding-top:32px;
                width:100%;

            }
            .info{
                display:flex;
                justify-content:center;
                font-size:20px;
                color:#272b35;
                font-weight:bold;

            }
            .buttons{
                display:flex;
                justify-content:center;
                padding-top:46px;
                padding-bottom :20px;
                font-size:14px;
                font-weight:600;
                letter-spacing:0.66px;
                padding-left:20px;
            }
            .contact{
                background-color:#aa222a;
                border-radius:6px;
                width:30%;
                text-align:center;
                padding:13px 0px;
                color:#fff;

            }
            .start_order{
                border:1px solid #aa222a;
                border-radius:6px;
                width:30%;
                text-align:center;
                margin-left:20px;
                padding:13px 0px;
                color:#aa222a;
            }

             /* Contact information */
             .contact_information{
                 background-color:#fff;
             }
             .contact_wrapper{

                 padding:32px 0px;
                 height:auto;
             }
             .info_text{

                 font-size:20px;
                 font-weight:bold;
                 color:#272b35;
                 text-align:center;

             }
             .company_info_wrapper{

                 padding-top:32px;
                 justify-content:center;
                 margin-left:10em;
             }
             .company_info_wrapper_two{
                 display:flex;
                 padding-top:27px;
                 justify-content:center;

             }
            //  .company_info_two{
            //      display:flex;
            //      flex-direction:column;
            //      justify-content:center;

            //  }
            .company_information_two{
                display:grid;
                grid-template-columns:200px 300px;
            }
            .company_information_two .text{
                font-size:14px;
                color:#2d2d2d;
                padding-bottom:20px;
            }
            .company_information_two .info_title{
                font-size:14px;
                color:#6d727a;
            }

             .company_text{
                 display:flex;
                 flex-direction:column;
                 padding-left:14px;
             }
             .name
             {
                 padding-bottom:20px;
                 font-size:14px;
                 color:#6d727a;
                 display:flex;


             }
             .name_one
             {
                 padding-bottom:20px;
                 font-size:14px;
                 color:#6d727a;
                 display:flex;


             }
            
            .name .text{
                 padding-bottom:20px;
                 font-size:14px;
                 color:#2d2d2d;
                 padding-left:25px;

             }

               .name .website
             {
                 padding-left:40px;
             }
             .name .call_center{
                 padding-left:20px;
                
             }

             .name .ph_number{
                  margin-left:-53px;
             }
              .name .country_region{
                margin-left:-53px;
             }
              .name .email{
                 padding-left:15px;
             }

             .name .city{
                 padding-left:30px;
             }

              .name .sh_name {
                margin-left:16px;
            }
             .name .address{
                 margin-left:40px;
             }

             .name_one .ph_number{
                margin-left:-53px;
           }
            
             .name_one .country_region{
                margin-left:-53px;
             }
             .name_one .shop_name {
                 padding-left : 15px;
             }

             .name_one .email{
                padding-left:15px;
            }
             
             .name_one .city{
                padding-left:30px;
            }
           
             .name_one .address{
                margin-left:-29px;
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
                  width:100%;
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

              @media(max-width:1024px){
                  .name .ph_number{
                      margin-left:0px;
                      padding-left:14px;
                  }
                  .text{
                      margin-left:-23px;
                  }
                  .company__detail_wrapper{
                      display:flex;
                      flex-direction:column;
                  }
                  .text{
                      margin-bottom:10px;
                  }
                  .text .detail{
                      padding-top:12px;
                      padding-bottom:12px;

                  }
                  .block{
                      display:block;
                  }
                  .name_one{
                      flex-direction:column;
                      padding-bottom:16px;
                  }
                  .details{
                      padding-left:0px;
                  }
                  .buttons{
                      display:none;
                  }
                  .name_one .ph_number{
                    margin-left:0px;
                  }
                  .name_one .country_region{
                    margin-left:0px;
                 }
                 .name_one .email{
                    padding-left:0px;
                }
                .name_one .city{
                    padding-left:0px;
                }
                .name_one .address{
                    margin-left:-29px;
                }
                .name .call_center{
                    padding-left:38px;
                    width:122px;
                }
              }
              @media(max-width:776px){
                  .company_wrapper{
                      flex-direction:column;
                  }
                   .company_info_wrapper_two{
                 display:flex;
                 padding-top:27px;
                 justify-content:flex-start;
                 padding-left : 20px;

             }
                  .company_info{
                      margin-left:16px;
                      margin-right:16px;
                      width:auto;
                  }
                  .profile_info{
                      margin:0px 16px 16px 16px;
                  }
                  .profile_wrapper{
                      width:auto;
                  }
                  .text .details{
                    padding-left:12px;
                    padding-right:12px;
                }
                .others_wrapper_two{
                    padding-bottom:15px;
                }
              }

              @media(max-width:768px){
                .category_text{
                  padding-top:17px;
                }
                .contact_information{
                    margin-left:16px;
                    margin-right:16px;
                }
                .name{
                    flex-direction:column;
                    padding-bottom:0px;
                }
            
                .name .sh_name {
                    margin-left : 0px;    
                }

                .name_one .shop_name {
                 padding-left : 0px;
             }

                .name .ph_number{
                    margin-left:0px;
               }
               .name .country_region{
                  margin-left:0px;
               }
               .name .email{
                   padding-left:0px;
               }
               .name .city{
                   padding-left:0px;
               }
               .name .address{
                   margin-left:0px;
               }
               .name .website
               {
                   padding-left:0px;
               }
               .name .call_center{
                   padding-left:0px;

               }
               .company_info_wrapper{
                   margin-left:0px;
                   padding-left:20px;
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
                .text .detail{
                    padding-left:0px;
                    padding-right:0px;
                }
                .text{
                    padding-left:20px;
                    margin-bottom:0px;
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

                    `
                }
            </style>
        </Layout>
    )
}

export default Contacts;