import React from "react";

export default function StoreList({ image }) {
  return (
    <div>
      <img className="product" src={image} alt="category" />

      <style jsx>
        {`
          .product {
            width: 100%;
            height:328px;
            padding-right: 20px;
            padding-top: 4px;
            padding-bottom:35px;

          }
          @media (max-width: 1200px) {
            .product {

              padding-right: 20px;
              padding-bottom: 40px;

              padding-left: 20px;
            }
          }
          @media (max-width: 430px) {
            .product {
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
}
