
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { getSearchProduct } from '../../../store/product/action';
import { useRouter } from 'next/router';
import { useState, useEffect, useContext } from 'react';
import Layout from '../../../components/Layout';
import {LangContext} from '../../../constants/langcontext'


const SearchProducts = () => {

    const dispatch = useDispatch();
    const [change,setChange] = useState(false);
    const { query } = useRouter();
    const {lang,language} = useContext(LangContext);

    let search_value = query.filter;


    const { searchProducts } = useSelector((state) => state.product);

    const searchProduct = (search) => {    
        dispatch(getSearchProduct(search))
            
    };

    useEffect(() => {      
            dispatch(getSearchProduct(search_value))
     
    },[search_value]);


    //let name = searchProducts.length !== 0 ? searchProducts[0].name_english : '';
    let name = searchProducts.length !== 0 ? searchProducts.map((searchProduct) => {
        return (searchProduct.name_english)
    }) : '';
    let itemNumber = Object.keys(searchProducts).length;
    let item = itemNumber > 1 ? "items" : "item";

    return (
        <Layout searchProduct={searchProduct} searchProducts={searchProducts}>
            {
                searchProducts.length > 0 ? (
                    <div className="right_sidebar">

                        <div className="right_sidebar_header">
                            <div className="column_1">
                                <p className="search"><strong className="consumer">{lang.home}</strong>
                                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                                    <p className="items" style={{ paddingLeft: "15px" }}>Search Results for "{query.filter}"</p>
                                </p>
                                <p className="items" style={{ paddingTop: "10px", fontSize: "13px", color: "#65686d" }} >{itemNumber} {item} found in {query.filter}</p>
                            </div>
                            <div className="column_2">
                                <div className="filterContainer">

                                </div>
                            </div>
                        </div>

                        <div className="item_flex">
                            {
                                searchProducts !== undefined ?
                                    searchProducts.map((product) => {
                                        let productImage = product.productImageVariants.length !== 0 ? product.productImageVariants[0].image_id.image_url : null;
                                        let price = product.productImageVariants.length !== 0 ? product.productImageVariants[0].variant_id.price : null;

                                        return (
                                            <Link href={`/productdetail/${product.id}`}>
                                                <div className="item_detail_list" style={{ border: "1px solid #cbcbcb" }}>
                                                    <div className="item_detail" key={product.id}>
                                                        <img src={`${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}${productImage}`}
                                                            alt="search"
                                                            onError={(e) => { e.target.onerror = null; e.target.src = "/images/OfficialStore.png" }} />
                                                        <div className="item">
                                                            <span className="product_name">
                                                                {language === 'en' ? product.name_english : product.name_myanmar}
                                                            </span>
                                                            <span className="product_price" style={{ color: "#aa222a" }}>{price} Ks</span>

                                                        </div>


                                                    </div>
                                                </div>
                                            </Link>

                                        )
                                    })

                                    : null
                            }

                        </div>
                    </div>

                )
                    : <div className="product">
                        {lang.theProduct}
                    </div>
            }


            <style jsx>
                {
                    `
                    .right_sidebar{
                        flex:76%;
                        max-width:1140px;
                        margin: auto;
                        margin-top:20px;
                        margin-bottom:20px;
                        }
                    .right_sidebar_header{
                    display: flex;
                    justify-content: space-between;
                    margin-bottom :30px;
                    }
                    .column_2{
                    display:flex;

                    }

                    .product{
                        display:flex;
                        justify-content:center;
                        font-size:22px;
                        color:#aa222a;
                        font-weight:600;
                        padding:50px;
                        margin-top:113px;
                        margin-bottom:115px;

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

                    .search{
                        display:flex;
                    }

                    .column_1 p i{
                    margin-left:30px ;
                    }
                    .filterBy{
                     display:none;
                    }
                    .filterBy{
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
                  
                   .btn2:hover{
                    outline: none;
                    border:none;
                    box-shadow:2px 2px 2px rgb(0,0,0,0.5);
                    }

                    .btn2{
                    width:50%;
                    background: #aa222a;
                    color: #fff;
                    padding:14px;
                    border-radius: 8px;
                    border: none;
                    cursor:pointer;
                    outline:none;
                    }

                    .item_detail img{
                    width: 100%;
                    margin-bottom:10px;
                    height:150px;
                    display:block;
                    }

                    .item_flex{
                    min-width: 100%;
                    }
                    .item_flex{
                        display:grid;
                        grid-template-columns:1fr 1fr 1fr 1fr;
                        grid-gap:16px;
                    }

                    .load{
                    text-align: center;
                    padding: 32px;
                    }

                    .selection_list{
                    display: none;
                    }



                    .item_detail {
                        flex: 0 1 calc(50% - 1em);
                        cursor:pointer;
                    }

                    .product_price{
                        display:flex;
                        justify-content:center;
                        padding-bottom:10px;
                        padding-top:12px;
                        font-weight:600;
                        font-size:15px;

                    }
                    .product_name{
                      font-weight:600;
                      text-overflow: ellipsis;
                      overflow:hidden;
                      display:block;
                      text-transform:capitalize;
                      height: 41px;
                      font-size:15px;
                      display:flex;
                      justify-content:center;
                      align-items:center;

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
                         .btn2{
                            width:90%;
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


                        // .column_2{
                        //     border-bottom: 1px solid gray ;
                        //     padding: 10px 2px;
                        //     margin-bottom:20px;
                        // }
                        .column_2{
                            display:none;
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
                            padding:0 6px;
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
                    @media(max-width:1200px){
                        .column_1{
                            padding-left:20px;
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


        </Layout>
    )
}

export default SearchProducts;