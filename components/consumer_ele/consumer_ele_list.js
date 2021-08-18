import React from "react";
import ConsumerItem from "./consumer_ele_item";
import PropTypes from "prop-types"; // ES6
import CustomLink from "../CustomLink/CustomLink";

const ConsumerElectronics = ({ campObj }) => {
  return (

    <div className="product_wrapper">

      <p className="product_info" style={{marginTop:"30px"}}>{campObj.title}</p>
      <div className="product_group">
        <CustomLink
          type={campObj.campaign_contents[0].campaignable_type}
          id={campObj.campaign_contents[0].campaignable_id}
        >
          <div className="product_detail">
            <ConsumerItem
              isMobile={true}
              image={`${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}${campObj.campaign_contents[0].image}`} />
          </div>
        </CustomLink>
        <CustomLink
          type={campObj.campaign_contents[1].campaignable_type}
          id={campObj.campaign_contents[1].campaignable_id}
        >
          <div className="product_detail">
            <ConsumerItem
              isMobile={false}
              image={`${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}${campObj.campaign_contents[1].image}`} />
          </div>
        </CustomLink>
      </div>
      <div className="product_group_two">
        {campObj.campaign_contents.map((content, index) => {
          return (
            <CustomLink
              key={index}
              type={content.campaignable_type}
              id={content.campaignable_id}
            >
              <div className="product_detail">
                <img src={`${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}${content.image}`} alt="product-two" />
              </div>
            </CustomLink>
          );
        })}
      </div>

      <style jsx>
        {`
          .product_wrapper {
            max-width: 1140px;
            margin: auto;
          }
          .product_info {
            margin-top: 57px;
            font-size: 24px;
            font-weight: 800;
            color: #1e232e;
            text-transform: uppercase;
          }
          .product_group {
            display: grid;
            grid-template-columns:2fr 1fr;
            grid-template-rows:1fr;
            margin-top: 24px;
            grid-gap:16px;
          }
          .product_group_two {
            display: flex;
            justify-content: space-between;
            margin-top: 16px;
            margin-bottom: 50px;
            overflow-x: scroll;
            scrollbar-width: none;
          }
          .product_group_two::-webkit-scrollbar {
            display: none;
            
          }
          .product_group_two img {
            margin-right: 20px;
            width:270px;
            object-fit:cover;
          }
          .product_detail{
            cursor:pointer;
          }

          @media(max-width:1200px){
            .product_wrapper{
              padding-left:4%;
              padding-right:4%;
            }
          }
          @media(max-width:900px){
            .product_group {
              display:flex;
              flex-direction: column;
            }

          }
          @media(max-width:360px){
            .product_group_two img{
              margin-right:0px;
              padding-right:20px;
            }
          }
          .product_info{
            margin-top:26px;
          }

        `}
      </style>
    </div>



  );
};

ConsumerElectronics.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  campObj: PropTypes.object.isRequired,
};
export default ConsumerElectronics;
