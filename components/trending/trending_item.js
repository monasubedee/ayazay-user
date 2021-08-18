import React from "react";
import useMedia from "../hooks/useMedia";

export default function TrendingItem({ image, isMobile = true }) {
  const productStyle = useMedia(
    // Media queries
    ['(max-width: 480px)','(max-width: 800px)'],
    // Column counts (relates to above media queries by array index)
    [
      
      {
        height: isMobile ? "131px" : "269px",
        width: "99%",
        paddingBottom:"16px"
        
      },
      {
        paddingBottom: "16px",
        width: "100%",
        cursor  : 'pointer'
      }
    ],
    // Default column count
    {
      width: "100%",
      height: "300px",
      cursor : 'pointer'
    }
  );

  return (
    <div>
      <img style={productStyle} src={image} alt="category" />
    </div>
  );
}
