import Slider from "react-slick";
import { NextArrow, PrevArrow } from '../arrows/arrows';
import Link from 'next/link';


const ProductCategories = ({ productcategories }) => {

  // var settings = {
  //   speed: 500,
  //   slidesToShow: 5,
  //   slidesToScroll: 5,
  //   initialSlide: 0,
  //   infinite: true,
  //   nextArrow: <NextArrow />,
  //   prevArrow: <PrevArrow />,
  //   autoPlay: true,
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 3,
  //         infinite: true,
  //         arrows: false,
  //       }
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 2,
  //         initialSlide: 2,
  //         arrows: false,
  //       }
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 2,
  //         arrows: false,
  //       }
  //     }
  //   ]
  // };

  return (
    <div>
      <div className="slide_menu">
        <div className="slide_container">
          <div className="category_list" style={{ margin: '0 auto', outline: 'none', maxWidth: '1140px', padding: '10px 0px ' }}>

            {
              productcategories.map((productCategory) => {
                return (
                  <div className="item_container" key={productCategory.id}>
                    <Link href={`/category/${productCategory.id}`} >
                      <div className="item">
                        <img
                          src={`${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_URL}${productCategory.img_url}`} alt=""
                          onError={(e) => { e.target.onerror = null; e.target.src = "/images/OfficialStore.png" }} />
                        <p>{productCategory.name_english}</p>
                      </div>
                    </Link>
                  </div>
                )

              })
            }

          </div>
        </div>
      </div>



      <style jsx>
        {

          `
          .slide_container{
            max-width: 1140px;
            margin:0 auto;
        }
        .item{
          cursor:pointer;
        }
        .item img{
          height:37px;
        }

        .item i{
            font-size:20px!important;
        }
        .item p{
            font-size:1.2vw;
        }
        *:focus {
          outline: 0;
          outline: none;
        }
        .slide_menu{
            padding:20px;
            position: relative;
        }
        .item{
          width:100px;
          text-align:center;
      }
      .item p{
          margin-top:10px;
          font-size:0.7em;
      }
      .category_list{
        display:flex;
        overflow-x: scroll;
        overflow-y: hidden;
        height: 80px;
      }
      ::-webkit-scrollbar {
        display: none;
      }
      .item_container{
        margin: 0 50px;
        max-height: 50px;
        cursor: pointer;
        display:inline-block;
        vertical-align:top;
        width:100%;
      }
      .slide_menu{
        padding:20px;
        background: #f58723;
        color: #fff;
        position: relative;
    }
      @media(max-width:876px){
         .item_container{
             margin: 0 20px;
         }
        .category_list{
          align-items: center;
          height:auto;
          padding:10px 0;
        }
           .item{
             width:100%;
            text-align:center;
            display:flex;
            flex-direction:row;
            justify-content:center;
        }
        .slide_menu{
          padding:10px;
        }
        .item p{
            margin-left :8px;
            margin-top:0px;
        }
        .slick-track{
          algin-items:center!important;
        }
      }

        `
        }
      </style>


    </div>
  )
}


export default ProductCategories;