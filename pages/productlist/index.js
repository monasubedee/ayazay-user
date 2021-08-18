import Layout from '../../components/Layout';
import ProductCategories from '../../components/ProductCategories';
import ProductListSlide from '../../components/proudctListSlide';
import { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import ProductsByCategory from '../../components/productsByCategory/productsByCategory';
import {
  getProductCategories,
  getProductcategory,
  getProductSubCategory,
  getLoadMore,
  getSearchProduct,
} from '../../store/product/action';

const ProductSubCategory = () => {
  const { searchProducts } = useSelector((state) => state.product);
  

  const searchProduct = (search_value) => {
    dispatch(getSearchProduct(search_value));
  };

  const [slide, setSlide] = useState(false);
  const handleSlick = () => {
    setSlide(true);
  };
  const [product, setProduct] = useState(null);
  const [value, setValue] = useState('');

  const handleDeleteSlide = () => {
    setSlide(false);
  };
  const { query } = useRouter();
  const { productcategories, productcategory, productsubcategory, loadmorecount } = useSelector(
    (state) => state.product
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductCategories());
  }, []);

  useEffect(() => {
    if (Object.keys(query).length === 0 && Object.keys(productcategories).length !== 0) {
      Router.push(`/productlist?category=${productcategories[0].id}`);
    }
  }, [query, Router, productcategories]);

  useEffect(() => {
    if (Object.keys(productcategories).length !== 0) {
      if (query.category === undefined) {
        dispatch(getProductcategory(productcategories[0].id));
        console.log('1121212');
      } else {
        dispatch(getProductcategory(query.category));
        console.log('213');
      }
    }
  }, [query.category, productcategories]);

  useEffect(() => {
    if (query.category !== undefined) {
      dispatch(getProductSubCategory(query.category));
    }
  }, [query]);

  useEffect(() => {
    if (query.subcategory !== undefined && productcategory !== null) {
      console.log(productcategory);
      let filtercategory = productcategory.filter((item) => {
        console.log(item.subcategory_id.id, query.subcategory, 'item');
        if (item.subcategory_id.id === parseInt(query.subcategory)) {
          return item;
        }
      });
      setProduct(filtercategory);
    } else {
      setProduct(productcategory);
    }
  }, [query, productcategory]);

  const handleloadmore = () => {
    if (Object.keys(productcategories).length !== 0) {
      if (query.category === undefined) {
        dispatch(getLoadMore(productcategories[0].id, productcategory.length));
      } else {
        dispatch(getLoadMore(query.category, productcategory.length));
      }
    }
  };

  return (
    <Layout searchProduct={searchProduct}>
      <div className='container'>
        <ProductCategories
          background={'#f0f0f0'}
          color={'#394358'}
          productcategories={productcategories}
        />
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
              <ProductListSlide
                productsubcategory={productsubcategory}
                handleDeleteSlide={handleDeleteSlide}
              />
            </div>
          ) : null}
          <div className='slideBar'>
            <ProductListSlide productsubcategory={productsubcategory} />
          </div>

          {/* <ProductsByBrand handleSlick={handleSlick}/> */}
          <ProductsByCategory
            handleSlick={handleSlick}
            productcategory={product}
            handleloadmore={handleloadmore}
            loadmorecount={loadmorecount}
            origin={productcategory}
          />
        </div>
      </div>

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

            .slide_container{
                max-width: 1140px;
                margin:0 auto;
            }

            .item i{
                color :#fffff!important;
                font-size:20px!important;
            }
            .item p{
                color :#fffff!important;
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
                color:white;
                margin-top:10px;
            }
            .left-sidebar{
                background:#fff;
                flex:35%;
                margin-right: 45px;
            }
            .empty{
                width: 158px;
                height: 57px;
                background: #f0f0f0;
            }
            .text{
                text-align:center;
            }
            .sub_container{
                display: flex;
                max-width: 1140px;
                margin: 0 auto;
            }
            .right_sidebar{
                flex:76%;
            }
            .bottom{

                padding-top: 35px;
                padding-bottom:50px;
            }
            .nav .fa{
                font-size: 36px;
            }

            .nav i, .nav p {
                opacity: 50%;
            }
            .sub_container{
                padding-top: 61px;
                padding-bottom:30px;
            }
            @media(max-width:876px){
                .slideBar{
                    display:none;
                }
                 .sub_container{
                padding-top: 10px;
                width:99%;
                }

            }
            `}</style>
    </Layout>
  );
};

export default ProductSubCategory;
