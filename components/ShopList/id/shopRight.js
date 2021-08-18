import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
const ShopRight = ({ shopProducts, handleSlick, shopList, shopname }) => {

    const [shops, setShops] = useState([]);
    const { query } = useRouter();


    let shop_id = query.id;

    useEffect(() => {
        if (shopProducts.length > 0) {
            shopProducts.map((obj) => {
                setShops(obj.results);
            })
        }
    }, [shopProducts]);

    let totalNumber = shops.length;
    let item = shops.length > 1 ? "PRODUCTS" : "PRODUCT";

    return (
        <div className="right_sidebar">
            <div className="right_sidebar_header">
                {
                    totalNumber === 0 ? (
                        <div>
                            <div className="column_2">
                                <div className="filterContainer">
                                    <div className="filterBy" onClick={handleSlick} name="">
                                        <span>FILTER BY <i className="fas fa-chevron-down"></i></span>
                                    </div>
                                </div>
                            </div>
                            <span style={{ margin: "auto", fontSize: "16px", fontWeight: "600", color: '#394358' }}>NO PRODUCTS AVAILABLE RIGHT NOW :(</span>
                        </div>
                    ) :
                        (
                            <>
                                <div className="column_1">
                                    <p className="items">{shopname} has  {totalNumber}  {item}  AVAILABLE . . . </p>
                                </div>
                                <div className="column_2">
                                    <div className="filterContainer">
                                        <div className="filterBy" onClick={handleSlick} name="">
                                            <span>FILTER BY <i className="fas fa-chevron-down"></i></span>
                                        </div>
                                        {/*
                                        <p>SORT BY</p>
                                        <select name="" id="">
                                            <option value="popularity">POPULARITY</option>
                                        </select>
                                         */}
                                    </div>
                                </div>
                            </>

                        )
                }


            </div>

            <div className="item_flex">
                {
                    shops.filter((item, index) => index < 14).map((obj) => {

                        if (obj.productImageVariants.length === 0) { return null }
                        else {
                            return (
                                <div className="productlistItem" key={obj.id}>
                                    <a href={`/shopdetail/${shop_id}/product`}>
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}${obj.productImageVariants[0].image_id.image_url}`}
                                            alt="detail-image"
                                            onError={(e) => { e.target.onerror = null; e.target.src = "/images/OfficialStore.png" }}
                                        />
                                        <div className="item">
                                            <span style={{
                                                fontWeight: "600",
                                                fontSize: "15px",
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "center",
                                                textAlign: "center"
                                            }}>
                                                {obj.name_english}</span>
                                            <p className="price">KS {obj.productVariants[0].variant_id.price}</p>
                                            {/* <div>
                                                <span style={{ color: 'goldenrod' }} className="fa fa-star true"></span>
                                                <span style={{ color: 'goldenrod' }} className="fa fa-star true"></span>
                                                <span style={{ color: 'goldenrod' }} className="fa fa-star true"></span>
                                                <span className="fa fa-star special "></span>
                                                <span className="fa fa-star special"></span>
                                            </div> */}
                                        </div>

                                    </a>
                                </div>
                            )
                        }
                    })
                }
            </div>



            <style jsx>
                {
                    `
                    *{
                        box-sizing: border-box;
                    }



                    // slideContainer


                    .filterBy{
                        cursor:pointer;
                        border:1px solid #aa222a;
                        padding:5px;
                        margin-right:10px;
                        color:#aa222a;
                        font-size:13px;
                    }
                    .filterBy span i{
                        font-size:12px;
                        color:#aa222a;
                    }


                     .slideBar{
                        width:34%;
                      }

                    .slide_container{
                        max-width: 1140px;
                        margin:0 auto;
                    }
                    

                    .item i{
                        font-size:20px!important;
                    }
                    .item p{
                        font-size:15px!important;
                    }
                    *:focus {
                      outline: 0;
                      outline: none;
                    }
                    .slide_menu{
                        padding:20px;
                        background: #f58723;
                        color: #fff;
                        position: relative;
                    }
                    .consumer{
                        padding-left:6px;
                    }
                    .items{
                        padding-left:6px;
                    }

                    .item{
                        text-align:center;
                        margin: 0 auto;
                    }
                    .item p{
                        margin-top:3px;
                    }
                    .left-sidebar{
                        background:#fff;
                        flex:35%;
                        margin-right: 45px;
                    }

                    .text{
                        text-align:center;
                    }
                    .special{
                        color:#d8d8d8;
                    }

                    .sub_container{
                        display: flex;
                        max-width: 1140px;
                        margin: 0 auto;
                        padding:0 20px;
                    }
                    .right_sidebar{
                        flex:76%;
                    }
                    select {

                    }
                    .filterBy{
                        display:none;
                    }

                    .btn2:hover{
                        outline: none;
                    }

                    .bottom{

                        padding-top: 35px;
                        paddinb-bottom:50px;
                    }

                    .nav .fa{
                        font-size: 36px;
                    }

                    .nav i, .nav p {
                        opacity: 50%;
                    }

                    .right_sidebar_header{
                        display: flex;
                        justify-content: space-between;
                        margin-bottom :30px;
                    }
                    .column_2{
                        display:flex;
                    }
                    .column_2 p{
                        padding:10px;
                        font-size:14px;
                    }
                    .filterContainer{
                        display:flex;
                    }
                    .column_2 select{
                        padding: 6px;
                        color: #aa222a;
                        margin-right: 16px;
                    }

                    .column_1 p i{
                        margin-left:30px ;
                    }

                    .btn2{
                        background: #aa222a;
                        color: #fff;
                        width: 350px;
                        height: 52px;
                        border-radius: 8px;
                        border: none;
                    }

                    .item_detail img{
                        width: 100%;
                        margin-bottom:10px;
                    }

                    .item_flex{
                        min-width: 100%;
                        margin-bottom:50px;
                    }

                    .load{
                        text-align: center;
                        padding: 32px;
                    }

                    .selection_list{
                        display: none;
                    }
                    .item_flex {
                        display:grid;
                        grid-template-columns:1fr 1fr 1fr 1fr;
                        grid-gap:16px;
                    }

                    .item_detail {
                        flex: 0 1 calc(50% - 1em);
                    }
                    .productlistItem{
                        border:1px solid #cbcbcb;
                        border-radius:5px;
                        padding:3px;
                    }


                    .productlistItem a img{
                        width: 100%;
                        height:200px;
                        display:block;
                    }
                    .item{
                        text-align: center;
                        padding:10px;
                    }
                    .item>*{
                        margin:3px 0px;
                    }
                    .price{

                        color :#aa222a;
                        font-weight:600;
                    }
                    @media screen and (min-width: 300px) {
                        .productlist {
                            display: flex;
                            flex-wrap: wrap;
                            justify-content: space-around;
                            text-align:center;
                        }
                        .productlistItem{
                            flex: 0 1 calc(48% - 1em);
                        }
                    }
                    @media screen and (min-width:570px) {
                        .productlistItem{
                            flex: 0 1 calc(24% - 1em);
                        }
                    }


                    @media(max-width:876px){

                        .slideBar{
                            display:none;
                        }
                        .column_2 p{
                            display:none
                        }
                        .column_2{
                            flex-direction:column;
                        }
                        .filterBy{
                            display:block;
                        }
                        .Filter_section{
                            display: block;
                        }
                        .right_sidebar_header{
                           flex-direction: column-reverse;
                           margin-left:1%;
                        }


                        .btn2{
                            width: 50%;
                        }
                        .column_2{
                            border-bottom: 1px solid gray ;
                            padding: 10px 2px;
                            margin-bottom:20px;
                        }
                        .item{
                            text-align:center;
                            display:flex;
                            flex-direction:column;
                            justify-content:center;
                        }
                        .item p{
                            margin-left :5px;
                            margin-top:0px;
                        }
                        .selection_list{
                            margin-top:20px;
                            display: flex;
                            flex-direction: row;
                            padding:10px 0px;
                        }

                        .selection_list p{
                            border-right: 2px solid #000;
                            padding:0 20px;
                            display: flex;
                            flex-direction: row;
                            justify-content: space-around;
                            align-items: center;
                        }

                        .selection_list p span{
                            margin-left: 10px;
                        }
                        .selection_list p:first-child{
                          padding-left:0px;
                        }

                        .selection_list p:last-child{
                            border: none;
                            padding-right:0px;

                        }

                    }

                    @media(max-width:1080px){
                        .item_flex{
                            grid-template-columns:1fr 1fr 1fr;
                        }
                    }
                    @media(max-width:560px){
                        .item_flex{
                            grid-template-columns:1fr 1fr;
                            padding-left:15px;
                            padding-right:15px;
                        }
                    }


                    @media (max-width:476px){

                        .sub_container{
                            padding: 0;
                        }

                    }


                    // @media screen and (min-width: 200px) {
                    //     .item_flex {
                    //         display:grid;
                    //         grid-template-columns:1fr 1fr 1fr 1fr;
                    //         grid-gap:16px;
                    //     }

                    //     .item_detail {
                    //         flex: 0 1 calc(50% - 1em);
                    //     }
                    // }

                    @media screen and (min-width: 576px) {
                        .item_detail {
                            flex: 0 1 calc(25% - 1em);
                        }

                    }

                    `
                }

            </style>
        </div>
    )
}

export default ShopRight;