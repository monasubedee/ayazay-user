import React from "react";
import Slider from "react-slick";
import StoreItem from "./store_item";
import PropTypes from "prop-types";
import CustomLink from "../CustomLink/CustomLink";
import { PrevArrow, NextArrow } from '../../components/arrows/arrow';


const StoreList = ({ campObj }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
          arrows: false,

        },
      },

      {
        breakpoint: 800,
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
    <div className="store_lists">
      <div className="store_container">
        <p className="store_text">{campObj.title}</p>

        <Slider {...settings}>
          {campObj.campaign_contents.map((content, index) => {
            return (
              <CustomLink
                type={content.campaignable_type}
                id={content.campaignable_id}
                key={index}
              >
                <div className="product_detail">
                  <StoreItem image={`${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}${content.image}`} />
                </div>
              </CustomLink>
            );
          })}
        </Slider>
      </div>

      <style jsx>
        {`
          .container {
            background: skyblue;
          }
          .store_lists {
            max-width: 1140px;
            margin: auto;
          }
          .store_container {
            margin-bottom: 36px;
            
          }
          .store_text {
            font-size: 24px;
            font-weight: 800;
            color: #1e232e;
            text-transform: uppercase;
            margin-bottom: 20px;
            margin-top:30px;

          }

          .product_detail{
            cursor:pointer;
          }


          @media (max-width: 1200px) {
            .store_text {
              padding-left: 20px;
            }


          }
          @media (max-width: 1024px) {

          }
          @media (max-width: 876px) {
            .store_text {
              padding-left: 4%;
            }
          }



            .store_container {
              margin-bottom: 50px;
            }
          }
        `}
      </style>
    </div>
  );
};

StoreList.propTypes = {
  campObj: PropTypes.object.isRequired,
};

export default StoreList;
