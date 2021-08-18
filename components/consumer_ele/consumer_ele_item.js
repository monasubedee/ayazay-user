import React from 'react';
import useMedia from "../hooks/useMedia";

export default function ConsumerItem({ image, isMobile = true }) {
  const productStyle = useMedia(
    // Media queries
    ['(max-width: 480px)', '(max-width: 768px)',],
    // Column counts (relates to above media queries by array index)
    [     
      {
        height: isMobile ? "131px" : "300px",
        paddinBottom:"16px",
        width: "100%"
      },
      {
        width: "99%"
      },

    ],
    // Default column count
    {
      width: "100%",
      height: "300px",
      
    }
  );

  return (
    <div className='consumer'>
        <img style={productStyle} src={image} alt='category' />
    </div>
  )

}