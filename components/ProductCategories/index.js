import React, { useContext } from 'react';
import Link from 'next/link';
import { LangContext } from '../../constants/langcontext';

const ProductCategories = ({ productcategories, background, color }) => {
  const { lang, language } = useContext(LangContext);
  // console.log(productcategories)
  // const ref = useRef(null);

  // const scrollLeft = () => {
  //   ref.current.scrollLeft += 200;
  // };
  // const scrollRight = () => {
  //   ref.current.scrollLeft -= 200;
  // };

  return (
    <div>
      <div className='slide_menu' style={{ background: `${background}`, color: `${color}` }}>
        <div className='slide_container'>
          {/* <div className="slick-prev" onClick={scrollRight}>
          </div> */}
          <div className='category_list'>
            {productcategories !== undefined
              ? productcategories.map((productCategory) => {
                  return (
                    <div className='item_container' key={productCategory.id}>
                      <Link href={`/productlist?category=${productCategory.id}`}>
                        <a>
                          <div className='item'>
                            <img
                              className='image'
                              src={`${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}${productCategory.img_url}`}
                              alt=''
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/images/OfficialStore.png';
                              }}
                            />
                            <p>
                              {language === 'en'
                                ? productCategory.name_english.length < 25
                                  ? `${productCategory.name_english
                                      .split('')
                                      .slice(0, 25)
                                      .join('')}  `
                                  : productCategory.name_english
                                : productCategory.name_myanmar.length > 25
                                ? `${productCategory.name_myanmar.split('').slice(0, 25).join('')}`
                                : productCategory.name_myanmar}
                            </p>
                          </div>
                        </a>
                      </Link>
                    </div>
                  );
                })
              : null}
          </div>
          {/* <div className="slick-next" onClick={scrollLeft}>
          </div> */}
        </div>
      </div>

      <style jsx>
        {`
          .slick-next {
            top: 28px;
            right: 0px;
            color: #394358;
          }
          .slick-next:before {
            background-color: #ffffff;
            box-shadow: 0px 1px 2px 3px rgba(57, 67, 88, 0.4);
          }
          .slick-prev {
            top: 28px;
            left: -10px;
            display: block;
            color: #394358;
          }
          .slick-prev:before {
            background-color: #ffffff;
            box-shadow: 0px 1px 2px 3px rgba(57, 67, 88, 0.4);
          }
          .slide_container {
            max-width: 1140px;
            margin: 0 auto;
            position: relative;
          }
          .item {
            cursor: pointer;
          }
          .item img {
            height: 37px;
          }

          .item i {
            font-size: 20px !important;
          }
          .item p {
            font-size: 1.2vw;
          }
          *:focus {
            outline: 0;
            outline: none;
          }
          .slide_menu {
            padding: 13px;
            position: relative;
          }
          .item .image:hover {
            color: #aa222a;
          }
          .item {
            width: 100px;
            text-align: center;
          }
          .item p {
            margin-top: 10px;
            font-size: 0.7em;
          }
          .item_container:first-child {
            margin-left: 30px;
          }
          .category_list {
            display: flex;
            overflow-x: scroll;
            height: 90px;
            scroll-behavior: smooth;
            padding-top: 7px;
            scrollbar-width: none;
          }
          ::-webkit-scrollbar {
            display: none;
          }
          .item_container {
            margin: 0 50px;
            max-height: 50px;
            cursor: pointer;
            display: inline-block;
            vertical-align: top;
            width: 100%;
            transition: all 1s ease;
            -webkit-transition: all 1s ease;
            -moz-transition: all 1s ease;
          }
          @media (max-width: 1000px) {
            .slick-next,
            .slick-prev {
              display: none;
            }
          }
          @media (max-width: 876px) {
            .slick-next,
            .slick-prev {
              display: none;
            }
            .item_container {
              margin: 0 20px;
            }
            .category_list {
              align-items: center;
              height: auto;
              padding: 10px 0;
            }
            .item {
              width: 100%;
              align-items: center;
              text-align: center;
              display: flex;
              flex-direction: row;
              justify-content: center;
            }
            .slide_menu {
              padding: 10px;
            }
            .item p {
              margin-left: 8px;
              margin-top: 0px;
            }
            .slick-track {
              algin-items: center !important;
            }
          }

          @media (max-width: 768px) {
            .item_container:first-child {
              margin-left: 4px;
            }
            .item_container {
              margin: 0 12px;
            }
            .item img {
              width: 30px;
              height: 27px;
            }
            .item p {
              width: 78px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ProductCategories;
