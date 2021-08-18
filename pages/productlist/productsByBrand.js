import Link from 'next/link';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

const Products = ({ handleSlick }) => {

    const dispatch = useDispatch();
    const { query } = useRouter();

    const [slide, setSlide] = useState(false);
    const { brandProducts } = useSelector((state) => state.product);


    let brandName = brandProducts[0] !== undefined ? brandProducts[0].brand_id.name : null;

    let itemNumber = brandProducts !== null ? Object.keys(brandProducts).length : 0;

    return (
        <div className="right_sidebar">
            <div className="right_sidebar_header">
                {
                    itemNumber === 0 ? <span className="no_products" style={{ fontWeight: "600", margin: "auto" }}>NO PRODUCTS AVAILABLE NOW :( </span>
                        :
                        <>
                            <div className="column_1">
                                <p> <strong className='consumer'>
                                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                                </strong>
                                </p>
                                <p className='items'>{itemNumber} items found in {brandName}.</p>
                            </div>
                            <div className="column_2">
                                <div className="filterContainer">
                                    <div className="filterBy" name="" id="" onClick={handleSlick}>
                                        <span>FILTER BY <i className="fas fa-chevron-down"></i></span>
                                    </div>
                                    <p>SORT BY</p>
                                    <select name="" id="">
                                        <option value="popularity">POPULARITY</option>
                                    </select>
                                </div>
                                <div className="selection_list">
                                    <p>Clear Filter</p>
                                    <p>Samsung <span><i className="fa fa-times" aria-hidden="true"></i></span></p>
                                    <p>Smart Phones <span><i className="fa fa-times" aria-hidden="true"></i></span></p>
                                </div>
                            </div>

                        </>

                }

            </div>

            <div className="item_flex">
                {
                    brandProducts.map((brandProduct) => {
                        console.log(brandProducts);

                        let products_img = brandProduct.product_id.productImageVariants;
                        let products_info = brandProduct.product_id.productVariants;
                        let price = products_info[0].variant_id.price;
                        return (
                            products_img.map((product_img, i) => {
                                let image_url = product_img.image_id.image_url;

                                return (
                                    <div key={i}>
                                        <Link href="/productdetail">
                                            <div className="item_detail">
                                                <a>
                                                    <img src={`${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}${image_url}`} alt="product" />
                                                    <span className="product_price">{brandProduct.product_id.name_english}</span>
                                                    <span className="product_price">{price} Ks</span>
                                                </a>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            }))
                    })

                }

            </div>
            {
                itemNumber === 0 ? null :
                    <div className="load">
                        <button className="btn2">LOAD MORE</button>
                    </div>

            }

            <style jsx>
                {

                    `
                    .right_sidebar{
                        flex:76%;
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
                    .filterBy{
                     display:none;
                    }
                   .btn2:hover{
                    outline: none;
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
                    }
                    .item_flex {
                        display: grid;
                        grid-template-columns:1fr 1fr 1fr 1fr;
                        grid-gap:16px;

                    }

                    .item_detail {
                        flex: 0 1 calc(50% - 1em);
                    }

                    .load{
                    text-align: center;
                    padding: 32px;
                    }

                    .selection_list{
                    display: none;
                    }
                    .item_detail img{
                        width:100%;
                        height:298px;
                    }

                    .product_price{
                        display:flex;
                        justify-content:center;
                        padding-bottom:10px;
                        font-weight:600;
                    }
                    .item_flex{
                    display: grid;
                    grid-template-columns:1fr 1fr 1fr 1fr;
                   }

                    .item_detail {
                        flex: 0 1 calc(50% - 1em);
                    }

                    @media(max-width:1080px){
                        .item_flex{
                            grid-template-columns:1fr 1fr 1fr;
                            padding-left:16px;
                            padding-right:16px;
                        }
                    }
                    @media(max-width:580px){
                        .item_flex{
                            grid-template-columns:1fr 1fr;

                        }
                    }


                    // @media screen and (min-width: 200px) {
                    //     .item_flex {
                    //         display: flex;
                    //         flex-wrap: wrap;
                    //         justify-content: space-around;
                    //     }

                    //     .item_detail {
                    //         flex: 0 1 calc(50% - 1em);
                    //     }
                    //     }

                        @media screen and (min-width: 576px) {
                        .item_detail {
                            flex: 0 1 calc(25% - 1em);
                        }

                        }

                    @media(max-width:876px){
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
                            flex-direction:row;
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
                            padding:0 10px;
                            display: flex;
                            flex-direction: row;
                            justify-content: space-around;
                            align-items: center;
                        }

                        .selection_list p span{
                            margin-left: 5px;
                        }

                        .selection_list p:last-child{
                            border: none;
                            padding-right:0px;

                        }

                    }

                    @media(max-width:470px){
                        .right_sidebar_header{
                            margin-top:30px;
                        }
                    }


                `
                }

            </style>
        </div>
    )
}


export default Products;