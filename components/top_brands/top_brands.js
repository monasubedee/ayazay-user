import React from 'react';
import Slider from 'react-slick';
import TopBrand from './top_brand';
import CustomLink from '../CustomLink/CustomLink';
import PropTypes from 'prop-types';
import { NextArrow, PrevArrow } from '../arrows/arrow';

const Brands = ({ campObj }) => {
  const settings = {
    dots: true,
    infinite: false,
    arrows: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },

      {
        breakpoint: 700,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
          arrows: false,
        },
      },
    ],
  };
  return (
    <div className='top_brands'>
      <div className='brands_container'>
        <p className='store_text'>{campObj.title}</p>
        <Slider {...settings}>
          {campObj.campaign_contents.map((content, index) => {
            return (
              <CustomLink type={content.campaignable_type} id={content.campaignable_id} key={index}>
                <div className='top_brand'>
                  <TopBrand
                    image={`${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}${content.image}`}
                  />
                </div>
              </CustomLink>
            );
          })}
        </Slider>
      </div>
      <style jsx>
        {`
          .top_brands {
            max-width: 1140px;
            margin: auto;
            margin-top: 35px;
            margin-bottom: 30px;
          }
          .brands_container {
            overflow: hidden;
          }

          .top_brand {
            margin-bottom: 50px;
            display: flex;
            margin-top: 24px;
            cursor: pointer;
          }

          .store_text {
            font-size: 24px;
            font-weight: 800;
            color: #1e232e;
            text-transform: uppercase;
            margin-bottom: 20px;
          }
          @media (max-width: 1200px) {
            .store_text {
              padding-left: 20px;
            }
          }
          @media (max-width: 876px) {
            .store_text {
              padding-left: 4%;
              margin-bottom: 13px;
            }
          }
          @media (max-width: 480px) {
            .store_text {
              margin-bottom: -4px;
            }
          }
          @media (max-width: 360px) {
            .top_brands {
              margin-top: -14px;
            }
          }
        `}
      </style>
    </div>
  );
};

Brands.propTypes = {
  campObj: PropTypes.object.isRequired,
};

export default Brands;
