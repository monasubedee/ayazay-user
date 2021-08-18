import Link from 'next/link';
import { LangContext, handleLanguageChange } from '../../constants/langcontext';
import { useContext, useEffect } from 'react';

const ProductsByCategory = ({
  handleSlick,
  productcategory,
  handleloadmore,
  loadmorecount,
  origin,
}) => {
  // let brandName = productcategory !== null ? productcategory.map((product) => {
  //   return (
  //     product.product_id.productBrands.map((brand) => {
  //       return (
  //         brand.brand_id.name
  //       )
  //     })
  //   )
  // }) : null

  const { lang, language } = useContext(LangContext);

  let itemNumber = productcategory !== null ? Object.keys(productcategory).length : 0;
  let itemorigin = origin !== null ? Object.keys(origin).length : 0;

  const setProduct = (id) => {
    localStorage.setItem('product_id', JSON.stringify(id));
  };

  return (
    <div className='right_sidebar'>
      <div className='right_sidebar_header'>
        {productcategory === null ? (
          <div className='loading_center'>
            <div className='loading'>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : itemNumber === 0 ? (
          <div style={{ width: '100%' }}>
            <div className='column_2'>
              <div className='filterContainer'>
                <div className='filterBy' onClick={handleSlick} name=''>
                  <span>
                    FILTER BY <i className='fas fa-chevron-down'></i>
                  </span>
                </div>
              </div>
            </div>
            <div className='no_product'>
              <span
                style={{ margin: 'auto', fontSize: '16px', fontWeight: '600', color: '#394358' }}
              >
                {lang.noProduct}
              </span>
            </div>
          </div>
        ) : (
          <>
            <div className='column_1'>
              {/* <p> <strong className='consumer'>
              <i className="fa fa-angle-right" aria-hidden="true"></i>
              </strong>
            </p> */}
              <p className='items'>{itemNumber} items found .</p>
            </div>

            <div className='column_2'>
              <div className='filterContainer'>
                <div className='filterBy' name='' id='' onClick={handleSlick}>
                  <span>
                    FILTER BY <i className='fas fa-chevron-down'></i>
                  </span>
                </div>
                {/*<p>SORT BY</p>
              <select name="" id="">
              <option value="popularity">POPULARITY</option>
            </select>*/}
              </div>
              {/*<div className="selection_list">
            <p>Clear Filter</p>
            <p>Samsung <span><i className="fa fa-times" aria-hidden="true"></i></span></p>
            <p>Smart Phones <span><i className="fa fa-times" aria-hidden="true"></i></span></p>
            </div>
          */}
            </div>
          </>
        )}
      </div>

      <div className='item_flex'>
        {productcategory !== null
          ? productcategory.map((product) => {
              let products_img =
                product.product_id.productImageVariants.length !== 0
                  ? product.product_id.productImageVariants[0].image_id.image_url
                  : '';
              let products_info = product.product_id.productVariants;

              var id = products_info.length !== 0 ? products_info[0].variant_id : '';

              let price = products_info.length !== 0 ? products_info[0].variant_id.price : '';

              return (
                <Link href={`/productdetail/${product.product_id.id}`}>
                  <div
                    className='item_detail'
                    style={{ border: '1px solid #cbcbcb' }}
                    onClick={(e) => setProduct(id)}
                  >
                    <a>
                      <img
                        src={`${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}${products_img}`}
                        alt='product'
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/OfficialStore.png';
                        }}
                      />
                      <div className='item'>
                        <span className='product_name'>
                          {language === 'en'
                            ? `${
                                product.product_id.name_english.length > 40
                                  ? `${product.product_id.name_english
                                      .split('')
                                      .slice(0, 40)
                                      .join('')}....`
                                  : product.product_id.name_english.split('').slice(0, 20).join('')
                              }`
                            : `${
                                product.product_id.name_myanmar.length > 40
                                  ? `${product.product_id.name_myanmar
                                      .split('')
                                      .slice(0, 40)
                                      .join('')}....`
                                  : product.product_id.name_myanmar.split('').slice(0, 20).join('')
                              }`}
                          {/* {product.product_id.name_english} */}
                        </span>
                        <span className='product_price' style={{ color: '#aa222a' }}>
                          {price} Ks
                        </span>
                        {/* <div className="stars">
                <span style={{ color: 'goldenrod' }} className="fa fa-star true"></span>
                <span style={{ color: 'goldenrod' }} className="fa fa-star true"></span>
                <span style={{ color: 'goldenrod' }} className="fa fa-star true"></span>
                <span className="fa fa-star special "></span>
                <span className="fa fa-star special"></span>
              </div>*/}
                      </div>
                    </a>
                  </div>
                </Link>
              );
            })
          : null}
      </div>
      {itemorigin === loadmorecount || itemorigin === 0 ? (
        <div className='load'></div>
      ) : (
        <div className='load'>
          <button className='btn2' onClick={handleloadmore}>
            LOAD MORE
          </button>
        </div>
      )}

      <style jsx>
        {`
          .no_product {
            display: flex;
            justify-content: center;
            text-algin: center;
          }
          .loading_center {
            width: 100%;
            display: flex;
            justify-content: center;
            algin-items: center;
            height: 500px;
          }
          .loading {
            display: inline-block;
            position: relative;
            width: 64px;
            height: 64px;
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
              top: 28px;
              left: 28px;
              width: 0;
              height: 0;
              opacity: 1;
            }
            100% {
              top: -1px;
              left: -1px;
              width: 58px;
              height: 58px;
              opacity: 0;
            }
          }
          .right_sidebar {
            flex: 76%;
          }
          .right_sidebar_header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
          }
          .column_2 {
            display: flex;
          }
          .item {
            display: flex;
            flex-direction: column;
          }
          .column_2 p {
            padding: 10px;
            font-si.itemze: 14px;
          }
          .filterContainer {
            display: flex;
          }
          .column_2 select {
            padding: 6px;
            color: #aa222a;
            margin-right: 16px;
          }

          .column_1 p i {
            margin-left: 30px;
          }
          .filterBy {
            display: none;
          }
          .filterBy {
            border: 1px solid #aa222a;
            padding: 5px;
            margin-right: 10px;
            color: #aa222a;
            font-size: 13px;
          }
          .filterBy span i {
            font-size: 12px;
            color: #aa222a;
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

          .item_flex {
            min-width: 100%;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            grid-gap: 16px;
          }

          .load {
            text-align: center;
            padding: 32px;
          }

          .selection_list {
            display: none;
          }

          .item_detail {
            flex: 0 1 calc(50% - 1em);
            border: 1px solid solid #cbcbcb;
            border-radius: 5px;
            padding: 3px;
          }
          .item_detail img {
            width: 100%;
            height: 150px;
            display: block;
            margin-bottom: 10px;
          }

          .product_price {
            padding-bottom: 10px;
            padding-top: 12px;
            padding-left: 10px;
            font-weight: 600;
            font-size: 14px;
          }
          .product_name {
            font-weight: 600;
            font-size: 14px;
            text-align: start;
            overflow: hidden;
            text-transform: capitalize;
            text-overflow: ellipsis;
            height: 39px;
            padding-left: 10px;
          }
          .stars {
            display: flex;
            justify-content: center;
            align-items: center;
            padding-bottom: 15px;
          }
          .special {
            color: #d8d8d8;
          }

          @media (max-width: 1080px) {
            .item_flex {
              grid-template-columns: 1fr 1fr 1fr;
              padding-left: 16px;
              padding-right: 16px;
            }
          }
          @media (max-width: 580px) {
            .item_flex {
              grid-template-columns: 1fr 1fr;
            }
            .btn2 {
              width: 90%;
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

          @media (max-width: 876px) {
            .column_2 p {
              display: none;
            }
            .column_2 {
              flex-direction: column;
            }
            .filterBy {
              display: block;
            }
            .Filter_section {
              display: block;
            }
            .right_sidebar_header {
              flex-direction: column-reverse;
              margin-left: 1%;
            }

            .column_2 {
              border-bottom: 1px solid gray;
              padding: 10px 2px;
              margin-bottom: 20px;
            }
            .item {
              text-align: center;
              display: flex;
              flex-direction: row;
              justify-content: center;
            }
            .item p {
              margin-left: 5px;
              margin-top: 0px;
            }
            .selection_list {
              margin-top: 20px;
              display: flex;
              flex-direction: row;
              padding: 10px 0px;
            }

            .selection_list p {
              border-right: 2px solid #000;
              padding: 0 6px;
              display: flex;
              flex-direction: row;
              justify-content: space-around;
              align-items: center;
            }

            .selection_list p span {
              margin-left: 10px;
            }
            .selection_list p:first-child {
              padding-left: 0px;
            }

            .selection_list p:last-child {
              border: none;
              padding-right: 0px;
            }
          }
          @media (max-width: 867px) {
            .item {
              flex-direction: column;
            }
          }
          @media (max-width: 470px) {
            .right_sidebar_header {
              margin-top: 30px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ProductsByCategory;
