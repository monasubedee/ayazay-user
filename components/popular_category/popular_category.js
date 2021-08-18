import React from 'react';


export default function PopularCategory({ image, text }) {

  return (
    <div>
      <img className="product" src={image} alt='category' />
      <span className="category_text">{text}</span>

      <style jsx>
        {
          `
          .product{
            width:100%;
            height:270px;
            padding-right:20px;
          }
          .category_text{
             margin-top: 12px;
            display:flex;
            justify-content:center;
            color:#394358;
            font-weight:500;
            margin-bottom:55px;
          }
          @media(max-width:1200px){
             .category_text{
                margin-bottom:50px;
                    }
          }
          @media(max-width:768px){
            .product{
              padding-right:4%;
              padding-left:4%;
              width:100%;

            }
          }
          @media(max-width:480px){
            .category_text{
              margin-bottom:36px;
            }




          }
         `
        }
      </style>

    </div>
  )

}