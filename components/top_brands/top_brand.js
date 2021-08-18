import React from 'react';


export default function TopBrand({ image }) {

  return (
    <div className="brands">
      <img className="product" src={image} alt='category' />


      <style jsx>
        {
          `
          .product{
            width:100%;
            height:72px;
            padding-right:20px;

          }
          @media(max-width:1200px){
            .brands{
              padding-left:20px;
            }
          }


         `
        }
      </style>

    </div>
  )

}