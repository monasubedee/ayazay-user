import React from "react";
import JustYouItem from "./just_you_item";
import CustomLink from "../CustomLink/CustomLink";
import PropTypes from "prop-types";

const JustYouList = ({ campObj }) => {
  console.log("layout 6 is", campObj);
  return (
    <div className="container2">
      <div className="just_you">
        <div className="just_container">
          <p className="store_text">{campObj.title}</p>
          <div className="product_group_nine">
            {campObj.campaign_contents.map((content, index) => {
              if (index < 8) {
                return (
                  <CustomLink
                    type={content.campaignable_type}
                    id={content.campaignable_id}
                    key={index}
                  >
                    <div className="just_containter_item">
                      <JustYouItem image={`${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}${content.image}`} />
                    </div>
                  </CustomLink>
                );
              }
            })}
          </div>
        </div>
      </div>

      <style jsx>
        {`
          /* just for you */
          .container2 {
            background-color: #f5f5f5;
          }

          .just_you {
            max-width: 1140px;
            margin: auto;
          }
          .store_text {
            padding-bottom: 25px;
            font-size: 24px;
            font-weight: 800;
            color: #1e232e;
            text-transform: uppercase;
          }

          .just_container {
            padding-top: 54px;
            padding-bottom: 56px;
          }

          .just-container-item{
            cursor: pointer;
          }

          .product_group_nine {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            grid-template-rows: 1fr 1fr;
            grid-gap: 20px;
          }

          .load_more {
            padding-bottom: 75px;
            font-size: 16px;
            font-weight: 600;
            letter-spacing: 0.75px;
            color: #ffffff;
            text-align: center;
          }
          .load_more_btn {
            width: 391px;
            height: 60px;
            border: none;
            border-radius: 8px;
            text-transform: uppercase;
            background-color: #aa222a;
            font-size: 16px;
            font-weight: 600;
            letter-spacing: 0.75px;
            color: #ffffff;
          }
          @media (max-width: 1200px) {
            .product_group_nine {
              grid-template-columns: 1fr 1fr 1fr;

              grid-row-gap: 20px;
              width: 80%;
              margin: 0 auto;
            }
            .store_text {
              padding-left: 3%;
            }
          }
          @media (max-width: 1024px) {
            .just_you {
              margin-top: 20px;
            }
          }
          @media (max-width: 878px) {
            .product_group_nine {
              grid-template-columns: 1fr 1fr;
              width: 84%;
            }
            .load_more_btn {
              width: 50%;
              margin: auto;
            }
            .load_more {
              padding-bottom: 40px;
            }
            .store_text {
              padding-left: 4%;
            }
          }
          @media (max-width: 480px) {
            .product_group_nine {
              grid-gap: 10px;
              width: 94%;
            }
            .load_more_btn {
              width: 75%;
              height: 55px;
              font-size: 14px;
            }

            .just_container {
              padding-top: 50px;
              padding-bottom: 50px;
            }
          }
          @media (max-width: 360px) {
            .just_container {
              padding-top: 30px;
              padding-bottom: 30px;
            }
          }
        `}
      </style>
    </div>
  );
};

JustYouList.propTypes = {
  campObj: PropTypes.object.isRequired,
};

export default JustYouList;
