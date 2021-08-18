import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getShopIdProduct } from '../../../store/shops/action';
import { useRouter } from 'next/router';
import ProductDetailSide from '../../../components/shop/Id/ProductDetailSide';

const ProductDetail = () => {
  const { query } = useRouter();
  const dispatch = useDispatch();
  const [shops, setShops] = useState([]);
  const [slide, setSlide] = useState(false);
  const [categories, setCategories] = useState([]);
  const { shop, shopProduct } = useSelector((state) => state.shop);
  const handleSlick = () => {
    setSlide(true);
  };
  const handleDeleteSlide = () => {
    setSlide(false);
  };

  const { shopProducts } = useSelector((state) => state.shop);

  useEffect(() => {
    dispatch(getShopIdProduct(query.id));
  }, []);

  useEffect(() => {
    if (shopProducts.length > 0) {
      shopProducts.map((obj) => {
        setShops(obj.results);
      });
    }
  }, [shopProducts]);

  return (
    <div>
      {shops.length > 0 ? (
        <div className='container'>
          <div className='sub_container'>
            {slide === true ? (
              <div className='slideMenu'>
                <div className='slideCloseBtn' onClick={handleDeleteSlide}>
                  <p>
                    Close{' '}
                    <span>
                      <i className='fa fa-times' aria-hidden='true'></i>
                    </span>
                  </p>
                </div>
                <ProductDetailSide handleDeleteSlide={handleDeleteSlide} />
              </div>
            ) : null}
            {/*   <div className="slideBar">
                                <ProductDetailSide />
                            </div>*/}
            <div className='right_sidebar'>
              <div className='right_sidebar_header'>
                <div className='column_1'>
                  {/* <p style={{ fontWeight:"600" }}> <strong style={{ color: 'black' }} className='consumer'><i className="fa fa-angle-right" aria-hidden="true"></i></strong></p> */}
                  <p className='items' style={{ color: 'black' }}>
                    {`${shops.length} `}items found in {shop.name}.
                  </p>
                </div>
                <div className='column_2'>
                  <div className='filterContainer'>
                    {/* <div className="filterBy" name="" id="" onClick={handleSlick}>
                                                <span>FILTER BY <i className="fas fa-chevron-down"></i></span>
                                            </div>
                                             <p>SORT BY</p>
                                            <select name="" id="">
                                                <option value="popularity">POPULARITY</option>
                                            </select>
                                             */}
                  </div>
                  {/* <div className="selection_list">
                                            <p>Clear Filter</p>
                                            <p>Samsung <span><i className="fa fa-times" aria-hidden="true"></i></span></p>
                                            <p>Smart Phones <span><i className="fa fa-times" aria-hidden="true"></i></span></p>
                                        </div>  */}
                </div>
              </div>
              <div className='item_flex'>
                {shops
                  .filter((item, index) => index < 14)
                  .map((obj) => {
                    if (obj.productImageVariants.length === 0) {
                      return null;
                    } else {
                      return (
                        <div className='productlistItem' key={obj.id}>
                          <a href={`/productdetail/${obj.id}`}>
                            <img
                              src={`${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}${obj.productImageVariants[0].image_id.image_url}`}
                              alt='detail-image'
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/images/OfficialStore.png';
                              }}
                            />
                            <div className='item'>
                              <span
                                style={{
                                  fontWeight: '600',
                                  fontSize: '15px',
                                }}
                              >
                                {obj.name_english.length > 35
                                  ? `${obj.name_english.split('').slice(0, 35).join('')}.....`
                                  : obj.name_english.split('').slice(0, 35).join('')}
                              </span>
                              <p className='price'>
                                KS{' '}
                                {obj.productVariants[0]
                                  ? obj.productVariants[0].variant_id.price
                                  : ''}
                              </p>
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
                      );
                    }
                  })}
              </div>
              {/* <div className="load">
                                    <button className="btn2">LOAD MORE</button>
                                </div> */}
            </div>
          </div>
        </div>
      ) : (
        <p
          style={{
            color: '#aa222a',
            textAlign: 'center',
            height: '100%',
            fontSize: '24px',
            paddingBottom: '30px',
          }}
        >
          Product is not found.
        </p>
      )}

      <style jsx>{`

*{
    box-sizing: border-box;
}



// slideContainer
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

.slideCloseBtn{
    padding:18px;
    text-align:right;
    border-bottom:1px solid #cbcbcb;
    margin-bottom:20px;
    font-size:14px;
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

.empty{
    width: 158px;
    height: 57px;
    background: #fff;
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
    width: 90%;
    margin :0 auto 50px auto;
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
    grid-gap:20px;
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
    height:150px;
    display:block;
}
.item{
    text-align: start;
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



`}</style>
    </div>
  );
};

export default ProductDetail;

// const [slide, setSlide] = useState(false);
// const handleSlick = () => {
//     setSlide(true)
// }
// const handleDeleteSlide = () => {
//     setSlide(false)
// }

// var settings = {
//     speed: 500,
//     slidesToShow: 5,
//     slidesToScroll: 5,
//     initialSlide: 0,
//     infinite: true,
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//     autoPlay: true,
//     responsive: [
//         {
//             breakpoint: 1024,
//             settings: {
//                 slidesToShow: 3,
//                 slidesToScroll: 3,
//                 infinite: true,
//                 arrows: false,
//             }
//         },
//         {
//             breakpoint: 600,
//             settings: {
//                 slidesToShow: 2,
//                 slidesToScroll: 2,
//                 initialSlide: 2,
//                 arrows: false,
//             }
//         },
//         {
//             breakpoint: 480,
//             settings: {
//                 slidesToShow: 2,
//                 slidesToScroll: 2,
//                 arrows: false,
//             }
//         }
//     ]
// };

// const settings2 = {
//     dots: true,
//     infinite: false,
//     speed: 500,
//     initialSlide: 0,
//     slidesToShow: 0,
//     slidesToScroll: 5,
//     responsive: [
//         {
//             breakpoint: 1200,
//             settings: {
//                 slidesToShow: 3,
//                 slidesToScroll: 3,
//                 infinite: true,
//                 dots: true,
//             },
//         },
//         {
//             breakpoint: 900,
//             settings: {
//                 slidesToShow: 3,
//                 slidesToScroll: 3,
//                 infinite: false,
//                 dots: true,
//             },
//         },
//         {
//             breakpoint: 700,
//             settings: {
//                 slidesToShow: 2,
//                 slidesToScroll: 2,
//                 infinite: false,
//                 dots: true,
//             },
//         },
//     ],
// };

// const renderProductDetail = () => {

//     if (width > 1200) {
//         return productDetail = (
//             <div className="productlist"
//             >
//                 {
//                     shops.filter((item, index) => index > 5).map((obj) => {

//                         if (obj.productImageVariants.length === 0) { return null }
//                         else {
//                             return (
//                                 <div className="productlistItem">
//                                     <a href={`/productdetail/${obj.id}`}>
//                                         <img
//                                             src={`${process.env.REACT_APP_IMAGE_URL}${obj.productImageVariants[0].image_id.image_url}`}
//                                             alt="detail-image"
//                                         />
//                                         <div className="item">
//                                             <h5>{obj.name_english}</h5>
//                                             <p className="price">KS {obj.productVariants[0].variant_id.price}</p>
//                                             <span className="fa fa-star true"></span>
//                                             <span className="fa fa-star true"></span>
//                                             <span className="fa fa-star true"></span>
//                                             <span className="fa fa-star "></span>
//                                             <span className="fa fa-star "></span>
//                                         </div>

//                                     </a>
//                                 </div>
//                             )
//                         }
//                     })
//                 }
//                 <style jsx>{`
//                     .productlist{
//                         width:90%
//                         padding:20px;
//                     }
//                     .true{
//                         color:orange;
//                     }
//                     .productlistItem{
//                         border:1px solid #cbcbcb;
//                         border-radius:5px;
//                         margin:10px;
//                         padding-left:10px;
//                     }
//                     .productlistItem a img{
//                         width: 90%;
//                         height:250px;
//                     }
//                     .item{
//                         text-align: start;
//                         padding:10px;
//                     }
//                     .item>*{
//                         margin:10px 0px;
//                     }
//                     .price{

//                         color :#aa222a;
//                         font-weight:600;
//                     }
//                     @media screen and (min-width: 800px) {
//                         .productlist {
//                             display: flex;
//                             flex-wrap: wrap;
//                             justify-content: space-around;
//                             text-align:center;
//                         }
//                         .productlistItem{
//                             flex: 0 1 calc(24% - 1em);
//                         }
//                     }
//                 `}</style>
//             </div>
//         );
//     } else {
//         return productDetail = (
//             <Slider {...settings}>
//                 {
//                     shops.filter((item, index) => index > 8).map((obj) => {

//                         if (obj.productImageVariants.length === 0) { <div>Hello</div> } else {

//                             return (
//                                 <div className="productlist">
//                                     <div className="productlistItem">
//                                         <a href={`/productdetail/${obj.id}`}>
//                                             <img
//                                                 src={`${process.env.REACT_APP_IMAGE_URL}${obj.productImageVariants[0].image_id.image_url}`}
//                                                 alt="detail-image"
//                                             />
//                                             <div className="item">
//                                                 <h5>{obj.name_english}</h5>
//                                                 <p className="price">KS {obj.productVariants[0].variant_id.price}</p>
//                                                 <span className="fa fa-star true"></span>
//                                                 <span className="fa fa-star true"></span>
//                                                 <span className="fa fa-star true"></span>
//                                                 <span className="fa fa-star "></span>
//                                                 <span className="fa fa-star "></span>
//                                             </div>

//                                         </a>
//                                         <style jsx>{`
//                     .productlist{
//                         width:90%
//                         padding:20px;
//                     }
//                     .true{
//                         color:orange;
//                     }
//                     .productlistItem{
//                         border:1px solid #cbcbcb;
//                         border-radius:5px;
//                         margin:10px;
//                         padding:10px;
//                     }
//                     .productlistItem a img{
//                         width: 100%;
//                         height:250px;
//                         display:block;
//                     }
//                     .item{
//                         text-align: start;
//                         padding:10px;
//                     }
//                     .item>*{
//                         margin:10px 0px;
//                     }
//                     .price{

//                         color :#aa222a;
//                         font-weight:600;
//                     }
//                     @media screen and (min-width: 800px) {
//                         .productlist {
//                             display: flex;
//                             flex-wrap: wrap;
//                             justify-content: space-around;
//                             text-align:center;
//                         }
//                         .productlistItem{
//                             flex: 0 1 calc(24% - 1em);
//                         }
//                     }
//                 `}</style>
//                                     </div>
//                                 </div>
//                             )
//                         }
//                     })
//                 }
//             </Slider>
//         );
//     }

// }
