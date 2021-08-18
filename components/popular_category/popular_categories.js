import React from "react";
import Slider from "react-slick";
import PopularCategory from "./popular_category";
import PropTypes from "prop-types";
import CustomLink from "../CustomLink/CustomLink";
import { NextArrow, PrevArrow } from '../arrows/arrow';

const PopularCategories = ({ campObj }) => {

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,

    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },

      {
        breakpoint: 750,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },

    ],
  };
  return (
    <div className="popular_categories">
      <p className="categories">{campObj.title}</p>
      <Slider {...settings}>
        {campObj.campaign_contents.map((content, index) => {
          return (
            <CustomLink
              type={content.campaignable_type}
              id={content.campaignable_id}
              key={index}
            >
              <div className="product_detail">
                <PopularCategory
                  image={`${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}${content.image}`}
                  text={content.campaignable_type}
                />
              </div>
            </CustomLink>
          );
        })}
      </Slider>

      <style jsx>
        {`
          .popular_categories {
            max-width: 1140px;
            margin: auto;
            margin-top:35px;
            
          }

          .categories {
            font-size: 20px;
            font-weight: 600;
            color: #1e232e;
            padding-bottom: 16px;
          }
          .product_detail {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: 16px;
            font-weight: 500;
            color: #394358;
            cursor:pointer;
          }

          .category_text {
            margin-top: 12px;
            display: flex;
            justify-content: center;
            color: #394358;
            font-weight: 500;
            margin-bottom: 75px;
          }

         
          @media (max-width: 1080px) {
            .categories{
              padding-left:4%;
            }

          }
          @media (max-width: 850px) {

          }
          @media (max-width: 480px) {


          }
        `}
      </style>
    </div>
  );
};

PopularCategories.propTypes = {
  campObj: PropTypes.object.isRequired,
};

export default PopularCategories;
