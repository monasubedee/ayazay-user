import React from "react";
import TrendingItem from "./trending_item";
import CustomLink from "../CustomLink/CustomLink";
import PropTypes from "prop-types";

const TrendingList = ({ campObj }) => {
  return (
    <div className="container">
      <div className="trending">
        <div className="trending_container">
          <div className="trending_wrapper">
            <p className="trending_text">{campObj.title}</p>
            <div className="product_group_four">
              <div className="trending_row_one">
                <CustomLink
                  type={campObj.campaign_contents[0].campaignable_type}
                  id={campObj.campaign_contents[0].campaignable_id}
                  key={campObj.campaign_contents[0].campaignable_id}
                >
                  <a>
                    <TrendingItem
                      isMobile={true}
                      className="trending1"
                      image={`${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}${campObj.campaign_contents[0].image}`}
                    />
                  </a>
                </CustomLink>
                <CustomLink
                  type={campObj.campaign_contents[1].campaignable_type}
                  id={campObj.campaign_contents[1].campaignable_id}
                  key={campObj.campaign_contents[1].campaignable_id}
                >
                  <a>
                    <TrendingItem
                      isMobile={false}
                      className="trending2"
                      image={`${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}${campObj.campaign_contents[1].image}`}
                    />
                  </a>
                </CustomLink>
              </div>
              <div className="trending_row_two">
                <CustomLink
                  type={campObj.campaign_contents[2].campaignable_type}
                  id={campObj.campaign_contents[2].campaignable_id}
                  key={campObj.campaign_contents[2].campaignable_id}
                >
                  <a>
                    <TrendingItem
                      isMobile={false}
                      className="trending3"
                      image={`${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}${campObj.campaign_contents[2].image}`}
                    />
                  </a>
                </CustomLink>
                <CustomLink
                  type={campObj.campaign_contents[3].campaignable_type}
                  id={campObj.campaign_contents[3].campaignable_id}
                  key={campObj.campaign_contents[3].campaignable_id}
                >
                  <a>
                    <TrendingItem
                      isMobile={true}
                      className="trending4"
                      image={`${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}${campObj.campaign_contents[3].image}`}
                    />
                  </a>
                </CustomLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>
        {`
           /* trending */

      .container{
        background-color: #394358;
      }

      .trending {
        margin: auto;
        max-width: 1140px;

      }

      .trending_container{
        height: auto;
        margin-bottom: 50px;
      }
      .trending_wrapper{
        padding-top: 50px;
        padding-bottom: 75px;
        margin-bottom: 50px;

      }
      .trending_text{
        text-transform: uppercase;
        font-size: 24px;
        font-weight: 800;
        color: #ffffff;
      }
      .product_group_four{
        display: flex;
        flex-direction:column;
        margin-top: 24px;
        margin-bottom: 10px;

      }

      .trending_row_one{
        display:grid;
        grid-template-columns:2fr 1fr;
        grid-template-rows:1fr;
        grid-column-gap:20px;
        margin-bottom:20px;

      }
      .trending_row_two{
        display:grid;
        grid-template-columns:1fr 2fr;
        grid-template-rows:1fr;
        grid-column-gap:20px;

      }

      .trending1,
      .trending2,
      .trending3,
      .trending4{
        width:100%;
        height:300px;
        cursor:pointer;
      }

    }
    @media(max-width:1100px){
      .trending_wrapper{
        margin-top:10px;
      }
    }
    @media(max-width:1200px){
      .trending_wrapper{
        padding-left:4%;
        padding-right:4%;

      }
      .product_group_four{
        justify-content:center;
      }
      .trending_wrapper{
        padding-top:36px;
        padding-bottom:29px;
      }

    }
    @media(max-width:800px){
      .product_group_four{
        padding-right:0%;

      }
      .trending_row_one{
        display:flex;
        flex-direction:column;
        margin-bottom:0px;
      }
      .trending_row_two{
        display:flex;
        flex-direction:column;
      }
      .trending_row_one img,
      .trending_row_two img{
        padding-bottom:20px;
      }

    }
    @media(max-width:480px){
      .trending1,.trending4{
        height:131px;
      }
      .trending2,.trending3{
        height:269px;
      }
    }
                 `}
      </style>
    </div>
  );
};

TrendingList.propTypes = {
  campObj: PropTypes.object.isRequired,
};

export default TrendingList;
