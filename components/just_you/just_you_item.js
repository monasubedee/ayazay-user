import React from "react";

export default function JustYouItem({ image }) {
  return (
    <div>
      <img className="product" src={image} alt="category" />

      <style jsx>
        {`
          .product {
            width: 100%;
            height: 350px;
          }
          @media (max-width: 480px) {
            .product {
              height: 269px;
            }
          }
        `}
      </style>
    </div>
  );
}
